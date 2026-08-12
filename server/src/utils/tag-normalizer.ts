export function normalizeTags(tags?: string[]): string[] {
  if (!tags || !Array.isArray(tags)) return [];

  const cleaned = tags
    .map((tag) => tag.trim().replace(/^#+/, "").toLowerCase())
    .filter((tag) => tag.length > 0);

  return Array.from(new Set(cleaned));
}
