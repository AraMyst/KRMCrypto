import apiClient from './apiClient';

export interface GeoData {
  ip: string;
  countryCode2?: string;
  countryName?: string;
  continent?: string;
  timezone?: string;
  currency?: string;
}

/**
 * Fetches the user's geolocation from your backend (/api/geo).
 * Returns at least the country code/name.
 */
export async function fetchUserGeo(): Promise<GeoData> {
  const resp = await apiClient.get<GeoData>('/api/geo');
  return resp.data;
}
