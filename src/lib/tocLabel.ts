/** Build a short TOC label from HTML: prefer first heading, else first words of text. */
export function tocLabelFromHtml(html: string, fallback: string, maxWords = 8): string {
  const raw = (html || "").trim();
  if (!raw) return fallback;

  const headingMatch = raw.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i);
  const source = headingMatch?.[1] ?? raw;

  const text = source
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return fallback;

  const words = text.split(" ").filter(Boolean);
  if (words.length <= maxWords) return text;
  return `${words.slice(0, maxWords).join(" ")}…`;
}
