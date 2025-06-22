import apiClient from './apiClient'

export interface GeoData {
  ip: string
  countryCode2?: string
  countryName?: string
  continent?: string
  timezone?: string
  currency?: string
}

/**
 * Busca a geolocalização do usuário na rota /api/geo.
 * Retorna pelo menos o nome ou código do país.
 */
export async function fetchUserGeo(): Promise<GeoData> {
  const resp = await apiClient.get<GeoData>('/api/geo')
  return resp.data
}
