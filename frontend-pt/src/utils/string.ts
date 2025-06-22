/**
 * Transforma texto em slug URL-friendly.
 * Ex.: "Olá, Mundo!" → "ola-mundo"
 */
export function slugify(text: string): string {
  return text
    .normalize('NFKD')                 // separa diacríticos
    .replace(/[\u0300-\u036f]/g, '')   // remove acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')       // não alfanuméricos viram hífen
    .replace(/^-+|-+$/g, '')           // retira hífens na ponta
}

/**
 * Trunca texto ao tamanho máximo, adicionando "…" se exceder.
 *
 * @param text      – texto original
 * @param maxLength – número máximo de caracteres
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

/**
 * Capitaliza a primeira letra de cada palavra.
 * Ex.: "bitcoin news" → "Bitcoin News"
 */
export function capitalize(text: string): string {
  return text.replace(/\b\w/g, char => char.toUpperCase())
}
