export const LONG_CACHE_TIME = 7200;
export const MEDIUM_CACHE_TIME = 720;
export const SHORT_CACHE_TIME = 72;

export const writeToCache = (url, data, ttl = LONG_CACHE_TIME) => {
  const now = new Date();
  localStorage.setItem(`cache/${url}`, JSON.stringify({ data, expiry: now.getTime() + ttlToSeconds(ttl) }));
};

export const readFromCache = (url) => {
  const now = new Date();
  const cached = JSON.parse(localStorage.getItem(`cache/${url}`)) || null;

  if (cached === null) {
    return null;
  }

  if (now.getTime() > cached.expiry) {
    localStorage.removeItem(`cache/${url}`);
    return null;
  }

  return cached.data;
};

export const deleteFromCache = (url) => {
  localStorage.removeItem(`cache/${url}`);
};

export const clearAPICache = () => {
  const keys = Object.keys(localStorage);

  const cacheKeys = keys.filter((key) => key.startsWith('cache/'));
  cacheKeys.forEach((key) => {
    localStorage.removeItem(key);
  });
};

const ttlToSeconds = (time) => time * 1000;
