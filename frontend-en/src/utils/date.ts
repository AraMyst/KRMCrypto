/**
 * Formats a Date or ISO-string into a localized date string.
 * Uses the browser’s Intl API.
 *
 * @param input  – date value (Date object or ISO string)
 * @param locale – BCP 47 language tag, e.g. "en-US"
 * @param options – Intl.DateTimeFormat options (dateStyle/timeStyle, etc.)
 * @returns formatted date, e.g. "Jun 9, 2025" or "09/06/2025"
 */
export function formatDate(
  input: string | Date,
  locale = 'en-US',
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }
): string {
  const date = typeof input === 'string' ? new Date(input) : input;
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Returns a human-friendly “time ago” string.
 * E.g. “just now”, “5 minutes ago”, “3 days ago”, or falls back to formatDate().
 *
 * @param input  – Date object or ISO string
 * @param locale – language tag for Intl.RelativeTimeFormat (defaults to 'en')
 */
export function timeAgo(
  input: string | Date,
  locale = 'en'
): string {
  const date = typeof input === 'string' ? new Date(input) : input;
  const now = Date.now();
  const diffMs = now - date.getTime();
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  const divisions: [number, Intl.RelativeTimeFormatUnit][] = [
    [60 * 1000, 'seconds'],
    [60 * 60 * 1000, 'minutes'],
    [24 * 60 * 60 * 1000, 'hours'],
    [7 * 24 * 60 * 60 * 1000, 'days'],
    [30 * 24 * 60 * 60 * 1000, 'weeks'],
    [365 * 24 * 60 * 60 * 1000, 'months'],
    [Number.POSITIVE_INFINITY, 'years'],
  ];

  for (const [msPerUnit, unit] of divisions) {
    if (Math.abs(diffMs) < msPerUnit) {
      const value = Math.round(diffMs / (msPerUnit / (unit === 'seconds' ? 1 : 1)));
      return rtf.format(-value, unit);
    }
  }

  // fallback
  return formatDate(date, locale, { dateStyle: 'medium' });
}
