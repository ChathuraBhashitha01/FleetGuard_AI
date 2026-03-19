export const timeAgo = (dateString, t) => {
  const diff = Date.now() - new Date(dateString).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);

  if (mins < 1)   return t ? t('time.justNow', { defaultValue: 'just now' }) : 'just now';
  if (mins < 60)  return t ? `${mins} ${t('time.minutesAgo')}` : `${mins} min${mins > 1 ? 's' : ''} ago`;
  if (hours < 24) return t ? `${hours} ${t('time.hoursAgo')}` : `${hours} hour${hours > 1 ? 's' : ''} ago`;
  return t ? `${days} ${t('time.daysAgo')}` : `${days} day${days > 1 ? 's' : ''} ago`;
};
