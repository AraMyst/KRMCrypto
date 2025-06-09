import apiClient from './apiClient';

export interface GeoData {
  country: string;
  region?: string;
  city?: string;
}

/**
 * Fetches the user's geolocation from your backend (/api/geo).
 * Returns at least the country code/name.
 */
export async function fetchUserGeo(): Promise<GeoData> {
  const resp = await apiClient.get<GeoData>('/api/geo');
  return resp.data;
}
