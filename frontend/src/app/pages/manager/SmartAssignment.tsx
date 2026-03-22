/**
 * @module     Admin Frontend
 * @author     Bethmi Jayamila <bethmij@gmail.com>
 * @description This file is part of the Admin/Manager Frontend of FleetGuard AI.
 *              All dashboard and manager pages are developed by Bethmi Jayamila.
 * @date       2026-03-11
 */

import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Sparkles, MapPin, Activity, Star, ArrowRight, Loader2 } from 'lucide-react';
import managerService from '@/services/managerService';
import { SkeletonLoader } from '@/app/components/common/SkeletonLoader';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const MAP_CENTER = { lat: 7.8731, lng: 80.7718 }; // Centre of Sri Lanka

// Lightweight, billing-free fallback for common Sri Lankan cities
const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  colombo: { lat: 6.9271, lng: 79.8612 },
  'colombo fort': { lat: 6.9355, lng: 79.8430 },
  kandy: { lat: 7.2906, lng: 80.6337 },
  galle: { lat: 6.0535, lng: 80.2210 },
  negombo: { lat: 7.2083, lng: 79.8358 },
  matara: { lat: 5.9549, lng: 80.5540 },
};

export function SmartAssignment() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [customerTier, setCustomerTier] = useState<'VIP' | 'Standard' | 'Budget'>('Standard');
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupLat, setPickupLat] = useState<number | null>(null);
  const [pickupLng, setPickupLng] = useState<number | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const geocodeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_KEY || '',
  });

  const geocodeAddress = useCallback(
    async (address: string) => {
      if (!address || address.length < 3) return;

      const trimmed = address.trim();
      const lower = trimmed.toLowerCase();

      // Fallback: parse "lat, lng"
      const coordMatch = trimmed.match(
        /^(-?\d+\.?\d*)\s*[,]\s*(-?\d+\.?\d*)$|^(-?\d+\.?\d*)\s+(-?\d+\.?\d*)$/
      );
      if (coordMatch) {
        const lat = parseFloat(coordMatch[1] ?? coordMatch[3]);
        const lng = parseFloat(coordMatch[2] ?? coordMatch[4]);
        if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
          setPickupLat(lat);
          setPickupLng(lng);
          return;
        }
      }

      const cityHit = CITY_COORDS[lower];
      if (cityHit) {
        setPickupLat(cityHit.lat);
        setPickupLng(cityHit.lng);
        return;
      }

      if (!GOOGLE_MAPS_KEY) return;
      try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address + ', Sri Lanka')}&key=${GOOGLE_MAPS_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.results?.[0]) {
          const loc = data.results[0].geometry.location;
          setPickupLat(loc.lat);
          setPickupLng(loc.lng);
        } else {
          setPickupLat(null);
          setPickupLng(null);
        }
      } catch (err) {
        console.error('Geocoding failed:', err);
        setPickupLat(null);
        setPickupLng(null);
      }
    },
    []
  );

  const handleAddressChange = (val: string) => {
    setPickupAddress(val);
    setPickupLat(null);
    setPickupLng(null);
    if (geocodeTimeoutRef.current) clearTimeout(geocodeTimeoutRef.current);
    geocodeTimeoutRef.current = setTimeout(() => geocodeAddress(val), 500);
  };

  const handleGetRecommendations = async () => {
    if (!pickupLat || !pickupLng) {
      setError('Please enter a valid pickup location');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await managerService.getSmartAssignmentRecommendations(
        customerTier,
        pickupLat,
        pickupLng
      );
      setRecommendations(data.recommendations || []);
      setSearched(true);
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to get recommendations');
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMapClick = (e: any) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setPickupLat(lat);
      setPickupLng(lng);
      setPickupAddress(`Map Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      setError(null);
    }
  };

  const handleAssignVehicle = (vehicleId: number) => {
    navigate(`/manager/fleet/${vehicleId}`);
  };

  const center = pickupLat && pickupLng ? { lat: pickupLat, lng: pickupLng } : MAP_CENTER;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-6 h-[calc(100vh-120px)] flex flex-col">
      <div className="text-center mb-4 flex-shrink-0">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-600 dark:text-blue-300 mb-2">
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span className="text-sm font-medium">{t('smartAssignment.aiPowered')}</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-1">
          {t('smartAssignment.title')}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          {t('smartAssignment.description')}
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        {/* Left Side: Actions and Lists (Scrollable) */}
        <div className="flex flex-col space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          {/* Booking Form */}
          <div className="relative rounded-2xl overflow-hidden glass-card flex-shrink-0">
            <div className="relative p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                {t('smartAssignment.getRecommendations')}
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customerTier" className="text-slate-700 dark:text-slate-300">
                    {t('smartAssignment.customerTier')}
                  </Label>
                  <Select
                    value={customerTier}
                    onValueChange={(v: 'VIP' | 'Standard' | 'Budget') => setCustomerTier(v)}
                  >
                    <SelectTrigger className="mt-2 bg-slate-200/30 dark:bg-white/5 border-slate-300/50 dark:border-white/10 text-slate-900 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VIP">VIP</SelectItem>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Budget">Budget</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="pickupLocation" className="text-slate-700 dark:text-slate-300">
                    {t('smartAssignment.pickupLocation')}
                  </Label>
                  <div className="relative mt-2">
                    <Input
                      id="pickupLocation"
                      placeholder={t('smartAssignment.locationPlaceholder')}
                      value={pickupAddress}
                      onChange={(e) => handleAddressChange(e.target.value)}
                      className="bg-slate-200/30 dark:bg-white/5 border-slate-300/50 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-500 pr-10"
                    />
                    {pickupLat && pickupLng && (
                      <MapPin className="absolute right-3 top-2.5 h-5 w-5 text-green-500 animate-bounce" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Tip: Direct entry OR click anywhere on the Map to place pin.
                  </p>
                </div>
                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                )}
                <Button
                  onClick={handleGetRecommendations}
                  disabled={loading || !pickupLat}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transform hover:scale-[1.01] transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {t('smartAssignment.gettingRecommendations')}
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      {t('smartAssignment.getRecommendations')}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Recommendations List Container */}
          <div className="flex-1 space-y-4">
            {loading ? (
              <div className="glass-card rounded-2xl p-6">
                <SkeletonLoader rows={3} height={100} />
              </div>
            ) : searched ? (
              recommendations.length > 0 ? (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white px-2">
                    {t('smartAssignment.aiRecommendations')}
                  </h2>
                  {recommendations.map((rec) => (
                    <RecommendationCard
                      key={rec.vehicle_id}
                      recommendation={rec}
                      onAssign={() => handleAssignVehicle(rec.vehicle_id)}
                      onHover={() => setSelectedVehicle(rec)}
                    />
                  ))}
                </div>
              ) : (
                <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
                  <p className="text-slate-600 dark:text-slate-400">
                    {t('smartAssignment.noVehicles')}
                  </p>
                </div>
              )
            ) : (
              <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center h-full min-h-[200px]">
                <Sparkles className="h-16 w-16 text-blue-600 dark:text-blue-400 mb-4 animate-glow" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {t('smartAssignment.readyToFind')}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {t('smartAssignment.enterDetails')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Google Map explicitly */}
        <div className="h-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 glass-card">
          {!GOOGLE_MAPS_KEY ? (
            <div className="flex items-center justify-center h-full text-slate-400 p-6 text-center">
              <div>
                <MapPin className="h-12 w-12 mx-auto mb-2 text-slate-500" />
                <p className="font-semibold text-white">Interactive Map Standby</p>
                <p className="text-sm">Provide VITE_GOOGLE_MAPS_API_KEY to enable rendering.</p>
              </div>
            </div>
          ) : isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={center}
              zoom={pickupLat ? 12 : 8}
              onClick={handleMapClick}
              options={{
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
              }}
            >
              {pickupLat && pickupLng && (
                <Marker
                  position={{ lat: pickupLat, lng: pickupLng }}
                  icon={{
                    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
                    fillColor: '#EF4444',
                    fillOpacity: 1,
                    strokeColor: 'white',
                    strokeWeight: 2,
                    scale: 1,
                    anchor: new window.google.maps.Point(12, 22),
                  }}
                  title="Pickup Location"
                />
              )}

              {recommendations.map((rec) => {
                const lat = rec.last_latitude;
                const lng = rec.last_longitude;
                if (!lat || !lng) return null;

                const isSelected = selectedVehicle?.vehicle_id === rec.vehicle_id;

                return (
                  <Marker
                    key={rec.vehicle_id}
                    position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
                    onClick={() => setSelectedVehicle(rec)}
                    icon={{
                      path: window.google?.maps?.SymbolPath?.CIRCLE ?? 0,
                      scale: isSelected ? 14 : 10,
                      fillColor: rec.rank === 1 ? '#3B82F6' : '#10B981',
                      fillOpacity: 0.9,
                      strokeColor: 'white',
                      strokeWeight: 2,
                    }}
                  />
                );
              })}

              {selectedVehicle && (
                <InfoWindow
                  position={{
                    lat: parseFloat(selectedVehicle.last_latitude),
                    lng: parseFloat(selectedVehicle.last_longitude),
                  }}
                  onCloseClick={() => setSelectedVehicle(null)}
                >
                  <div style={{ padding: '6px 4px', minWidth: '180px', color: '#1e293b', fontFamily: 'inherit' }}>
                    <h4 style={{ fontWeight: 700, fontSize: '13px', margin: '0 0 2px' }}>
                      #{selectedVehicle.rank} - {selectedVehicle.vehicle_number}
                    </h4>
                    <p style={{ fontSize: '11px', margin: '0 0 6px', color: '#475569' }}>
                      {selectedVehicle.make} {selectedVehicle.model}
                    </p>
                    <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '4px 0' }} />
                    <p style={{ fontSize: '11px', margin: '3px 0', fontWeight: 600 }}>
                      Total Score: <span style={{ color: '#2563eb' }}>{selectedVehicle.total_score}</span>
                    </p>
                    <p style={{ fontSize: '11px', margin: '2px 0', color: '#334155' }}>
                      Distance: {selectedVehicle.distance_km} km
                    </p>
                    <p style={{ fontSize: '11px', margin: '2px 0', color: '#334155' }}>
                      Health: {selectedVehicle.health_score}/100
                    </p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500">
              <Loader2 className="h-6 w-6 animate-spin mr-2" /> Initializing Live Map...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RecommendationCard({
  recommendation,
  onAssign,
  onHover,
}: {
  recommendation: any;
  onAssign: () => void;
  onHover: () => void;
}) {
  const { t } = useTranslation();
  const getBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-blue-500/20 border-blue-500/30 text-blue-600 dark:text-blue-300';
    if (rank === 2) return 'bg-emerald-500/20 border-emerald-500/30 text-emerald-600 dark:text-emerald-300';
    return 'bg-slate-300/30 dark:bg-slate-500/20 border-slate-400/50 dark:border-slate-500/30 text-slate-700 dark:text-slate-300';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-blue-500';
    if (score >= 60) return 'bg-emerald-500';
    return 'bg-amber-500';
  };

  return (
    <div
      onMouseEnter={onHover}
      className="relative rounded-xl overflow-hidden glass-card transition-all duration-300 hover:scale-[1.01] hover:shadow-lg border border-slate-300/50 dark:border-white/10 group"
    >
      <div className="relative p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span
              className={`inline-block px-3 py-1 rounded-lg text-xs font-medium border ${getBadgeColor(
                recommendation.rank
              )} mb-2`}
            >
              #{recommendation.rank}{' '}
              {recommendation.rank === 1
                ? t('smartAssignment.bestMatch')
                : recommendation.rank === 2
                ? t('smartAssignment.goodMatch')
                : t('smartAssignment.alternative')}
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
              {recommendation.vehicle_number}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {recommendation.make} {recommendation.model} ({recommendation.year})
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
              {recommendation.total_score}
            </p>
            <p className="text-xs text-slate-500">{t('smartAssignment.score')}</p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500 flex items-center gap-1"><Activity className="h-3 w-3" /> {t('smartAssignment.health')}</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">{recommendation.health_score}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full ${getScoreColor(recommendation.health_score)}`} style={{ width: `${recommendation.health_score}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500 flex items-center gap-1"><MapPin className="h-3 w-3" /> {t('smartAssignment.distance')}</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">{recommendation.distance_km} km</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: `${Math.min(100, (recommendation.score_breakdown?.distance_points / 30) * 100)}%` }} />
            </div>
          </div>
        </div>

        {recommendation.reasoning?.length > 0 && (
          <div className="bg-slate-500/5 rounded-lg p-2 mb-4">
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              {recommendation.reasoning.map((r: string, i: number) => (
                <li key={i} className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span className="truncate">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAssign();
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 group/btn"
        >
          {t('smartAssignment.assignVehicle')}
          <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
