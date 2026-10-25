type JsonLdProps = {
  json?: string | null;
};

/** Renders admin Schema JSON-LD when valid. */
export function JsonLd({ json }: JsonLdProps) {
  const raw = (json || "").trim();
  if (!raw) return null;

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }

  if (data == null || (typeof data !== "object" && !Array.isArray(data))) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
