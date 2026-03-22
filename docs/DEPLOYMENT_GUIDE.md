# Deployment Guide — FleetGuard AI

**Document version:** 1.0
**Date:** March 2026

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
- [Environment Variables Reference](#environment-variables-reference)
- [Database Management](#database-management)
- [AI Service Deployment](#ai-service-deployment)
- [Security Checklist](#security-checklist)
- [Monitoring](#monitoring)

---

## Architecture Overview

FleetGuard AI consists of three independently deployable services:

| Service | Tech | Default Port | Role |
| --- | --- | --- | --- |
| Frontend | React SPA (Vite) | 5173 (dev) / 80 (prod) | Browser-delivered UI |
| Backend API | Node.js + Express | 3001 | REST API + business logic |
| AI Service | Python + Flask | 5001 | YOLOv8 damage detection |
| Database | PostgreSQL 15+ | 5432 | Persistent data storage |

In production, the frontend is built to static files and served by a web server (e.g. Nginx). The backend and AI service run as background processes (e.g. via PM2 or Docker containers).

---

## Local Development

See [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) for full local setup instructions.

Quick start:

```bash
cd backend && npm run dev         # port 3001
cd fleetguard-ai-service && python app.py   # port 5001
npm run dev                        # port 5173
```

---

## Production Deployment

### Option A — Manual VPS Deployment

This guide targets a Ubuntu 22.04 LTS VPS.

#### 1. Install system dependencies

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs npm postgresql postgresql-contrib python3 python3-pip python3-venv nginx git curl
```

Install Node.js 18 via NodeSource if the default version is older:

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

#### 2. Set up PostgreSQL

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo -u postgres psql -c "CREATE USER fleetguard WITH PASSWORD 'strong-password-here';"
sudo -u postgres psql -c "CREATE DATABASE fleetguard_db OWNER fleetguard;"
```

#### 3. Clone the repository

```bash
git clone <repository-url> /var/www/fleetguard
cd /var/www/fleetguard
```

#### 4. Install and build the frontend

```bash
npm install
npm run build
# Output: dist/ directory
```

#### 5. Install backend dependencies

```bash
cd backend
npm install --production
```

Create `backend/.env` with production values (see [Environment Variables Reference](#environment-variables-reference)).

#### 6. Initialise the database

```bash
cd backend
npm run db:init
npm run db:migrate
npm run db:seed
```

#### 7. Set up the AI service

```bash
cd /var/www/fleetguard/fleetguard-ai-service
python3 -m venv venv
source venv/bin/activate
pip install flask flask-cors ultralytics
```

#### 8. Set up PM2 for process management

```bash
sudo npm install -g pm2

# Backend
pm2 start backend/src/server.js --name fleetguard-api --cwd /var/www/fleetguard

# AI service
pm2 start "source venv/bin/activate && python app.py" --name fleetguard-ai \
  --cwd /var/www/fleetguard/fleetguard-ai-service --interpreter bash

pm2 save
pm2 startup
```

#### 9. Configure Nginx

Create `/etc/nginx/sites-available/fleetguard`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend (static files)
    root /var/www/fleetguard/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API proxy
    location /api/ {
        proxy_pass http://localhost:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 20M;
    }

    # Uploaded files
    location /uploads/ {
        alias /var/www/fleetguard/backend/uploads/;
        expires 7d;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/fleetguard /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 10. Enable HTTPS with Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot automatically configures HTTPS and sets up auto-renewal.

---

### Option B — Docker Deployment

A `docker-compose.yml` can be used to containerise all services:

```yaml
version: '3.9'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: fleetguard_db
      POSTGRES_USER: fleetguard
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./database/schema.sql:/docker-entrypoint-initdb.d/01_schema.sql

  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: fleetguard_db
      DB_USER: fleetguard
      DB_PASSWORD: ${DB_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      - postgres
    volumes:
      - ./backend/uploads:/app/uploads

  ai-service:
    build: ./fleetguard-ai-service
    ports:
      - "5001:5001"

  frontend:
    build:
      context: .
      args:
        VITE_API_URL: ${VITE_API_URL}
        VITE_GOOGLE_MAPS_API_KEY: ${VITE_GOOGLE_MAPS_API_KEY}
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  pgdata:
```

Run with:

```bash
docker compose up -d
```

---

### Option C — Hosted Database (Neon / Supabase)

For serverless deployment (e.g. Vercel + Render), use a hosted PostgreSQL service:

1. Create a database on Neon (<https://neon.tech>) or Supabase (<https://supabase.com>).
2. Copy the connection string.
3. Set `DATABASE_URL` in the backend environment instead of individual `DB_*` vars.

```text
DATABASE_URL=postgresql://user:password@host/fleetguard_db?sslmode=require
```

---

## Environment Variables Reference

### Frontend Build Variables

Set these before running `npm run build`. They are embedded in the compiled bundle.

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_URL` | Yes | Full backend URL (e.g. `https://api.yourdomain.com/api`) |
| `VITE_GOOGLE_MAPS_API_KEY` | Map View | Google Maps JavaScript API key |
| `VITE_GOOGLE_CLIENT_ID` | OAuth | Google OAuth 2.0 client ID |

### Backend Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `DB_HOST` | Yes | PostgreSQL hostname |
| `DB_PORT` | Yes | PostgreSQL port (`5432`) |
| `DB_NAME` | Yes | Database name (`fleetguard_db`) |
| `DB_USER` | Yes | Database user |
| `DB_PASSWORD` | Yes | Database password (use a strong random string) |
| `DATABASE_URL` | Alt to above | Full connection string (for hosted DB) |
| `JWT_SECRET` | Yes | Random 64-byte hex string for JWT signing |
| `JWT_EXPIRES_IN` | No | Token lifetime (default `8h`) |
| `GOOGLE_CLIENT_ID` | OAuth | Google OAuth 2.0 client ID |
| `GOOGLE_CLIENT_SECRET` | OAuth | Google OAuth 2.0 client secret |
| `EMAIL_USER` | Email | Gmail account for password reset |
| `EMAIL_PASS` | Email | Gmail App Password (not account password) |
| `FRONTEND_URL` | Email | Full frontend URL for reset email links |
| `PORT` | No | Backend listen port (default `3001`) |
| `NODE_ENV` | No | Set to `production` in production |

### AI Service Variables

| Variable | Required | Description |
| --- | --- | --- |
| `AI_PORT` | No | Flask listen port (default `5001`) |

---

## Database Management

### Backup

```bash
pg_dump -U fleetguard -d fleetguard_db -F c -f backup_$(date +%Y%m%d).dump
```

### Restore

```bash
pg_restore -U fleetguard -d fleetguard_db -F c backup_20260320.dump
```

### Run migrations

```bash
cd backend
npm run db:migrate
```

### Manual migration

```bash
psql -U fleetguard -d fleetguard_db -f database/migrations/004_sprint6_user_preferences.sql
```

### GPS log cleanup (PDPA compliance)

Run this as a scheduled cron job (daily):

```bash
psql -U fleetguard -d fleetguard_db -c \
  "DELETE FROM gps_logs WHERE captured_at < NOW() - INTERVAL '90 days';"
```

Crontab entry (runs at 02:00 daily):

```text
0 2 * * * psql -U fleetguard -d fleetguard_db -c "DELETE FROM gps_logs WHERE captured_at < NOW() - INTERVAL '90 days';" >> /var/log/fleetguard-gps-cleanup.log 2>&1
```

---

## AI Service Deployment

### Requirements

- Python 3.8+
- At least 2 GB RAM for model inference
- Model weights at `runs/classify/fleetguard_damage_model4/weights/best.pt`

### Install dependencies

```bash
cd fleetguard-ai-service
python3 -m venv venv
source venv/bin/activate
pip install flask flask-cors ultralytics
```

### Run in production

```bash
# Using gunicorn for production WSGI
pip install gunicorn
gunicorn -w 2 -b 0.0.0.0:5001 app:app
```

Or via PM2:

```bash
pm2 start "gunicorn -w 2 -b 0.0.0.0:5001 app:app" \
  --name fleetguard-ai \
  --cwd /var/www/fleetguard/fleetguard-ai-service \
  --interpreter bash
```

### Verify AI service health

```bash
curl http://localhost:5001/api/health
```

Expected response:

```json
{
  "status": "ok",
  "mode": "inference",
  "model": "fleetguard_damage_model4"
}
```

If `"mode": "stub"` appears, the model weights file is missing.

---

## Security Checklist

Before going live:

- [ ] `JWT_SECRET` is a minimum 64-character random string — not a dictionary word
- [ ] `DB_PASSWORD` is strong and unique — not `postgres`
- [ ] `NODE_ENV=production` is set in the backend environment
- [ ] HTTPS is enabled (Certbot / load balancer TLS termination)
- [ ] CORS is configured to only allow the production frontend domain
- [ ] `uploads/` directory is not writable by the web server user
- [ ] PostgreSQL is not accessible from the public internet (bind to `localhost` or VPC)
- [ ] AI service is not publicly accessible — only reachable from the backend on `localhost:5001`
- [ ] Google Cloud API key restrictions are set (HTTP referrer for Maps key, IP for server keys)
- [ ] Email App Password is stored as an environment variable, not committed to the repository
- [ ] GPS log cleanup cron is running and verified
- [ ] Rate limiting is applied to `/api/auth/*` endpoints

---

## Monitoring

### Health endpoints

| Endpoint | Purpose |
| --- | --- |
| `GET /api/health` | Backend liveness check |
| `GET http://localhost:5001/api/health` | AI service liveness check |

### PM2 monitoring

```bash
pm2 status                  # Process list and uptime
pm2 logs fleetguard-api     # Live backend logs
pm2 logs fleetguard-ai      # Live AI service logs
pm2 monit                   # Real-time dashboard
```

### Log locations (if not using PM2)

| Service | Log path |
| --- | --- |
| Nginx access | `/var/log/nginx/access.log` |
| Nginx error | `/var/log/nginx/error.log` |
| PostgreSQL | `/var/log/postgresql/postgresql-15-main.log` |
| GPS cleanup | `/var/log/fleetguard-gps-cleanup.log` |
