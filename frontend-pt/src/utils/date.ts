/**
 * Formata uma data (Date ou ISO string) para texto local em pt-BR.
 *
 * @param input   – objeto Date ou string ISO
 * @param locale  – tag de idioma, padronizada em 'pt-BR'
 * @param options – opções de Intl.DateTimeFormat (dateStyle, timeStyle, etc.)
 * @returns       – exemplo: "09 de jun. de 2025"
 */
export function formatDate(
  input: string | Date,
  locale = 'pt-BR',
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }
): string {
  const date = typeof input === 'string' ? new Date(input) : input
  return new Intl.DateTimeFormat(locale, options).format(date)
}

/**
 * Retorna string “tempo relativo” em pt-BR:
 * ex.: “agora há pouco”, “há 5 minutos”, “há 3 dias”.
 *
 * @param input  – Date ou ISO string
 * @param locale – tag de idioma, padronizada em 'pt-BR'
 */
export function timeAgo(
  input: string | Date,
  locale = 'pt-BR'
): string {
  const date = typeof input === 'string' ? new Date(input) : input
  const now = Date.now()
  const diffMs = now - date.getTime()
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  const divisions: [number, Intl.RelativeTimeFormatUnit][] = [
    [60 * 1000, 'seconds'],
    [60 * 60 * 1000, 'minutes'],
    [24 * 60 * 60 * 1000, 'hours'],
    [7 * 24 * 60 * 60 * 1000, 'days'],
    [30 * 24 * 60 * 60 * 1000, 'weeks'],
    [365 * 24 * 60 * 60 * 1000, 'months'],
    [Number.POSITIVE_INFINITY, 'years'],
  ]

  for (const [msPerUnit, unit] of divisions) {
    if (Math.abs(diffMs) < msPerUnit) {
      const value = Math.round(diffMs / (msPerUnit / (unit === 'seconds' ? 1 : 1)))
      return rtf.format(-value, unit)
    }
  }

  // fallback
  return formatDate(date, locale, { dateStyle: 'medium' })
}
