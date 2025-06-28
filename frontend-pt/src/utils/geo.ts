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
 * Busca a geolocalização do usuário na rota /geo.
 * Retorna pelo menos o nome ou código do país.
 */
export async function fetchUserGeo(): Promise<GeoData> {
  const resp = await apiClient.get<GeoData>('/geo')
  return resp.data
}
