/**
 * Transforms arbitrary text into a URL-friendly slug.
 * Ex.: "Hello World!" → "hello-world"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFKD')            // separa acentos
    .replace(/[\u0300-\u036f]/g, '') // remove diacríticos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')  // espaços e pontuações viram hífen
    .replace(/^-+|-+$/g, '');     // remove hífens nas pontas
}

/**
 * Trunca um texto para um tamanho máximo de caracteres, adicionando "…" se necessário.
 *
 * @param text      – texto original
 * @param maxLength – número máximo de caracteres
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Capitaliza a primeira letra de cada palavra do texto.
 * Ex.: "bitcoin news" → "Bitcoin News"
 */
export function capitalize(text: string): string {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}
