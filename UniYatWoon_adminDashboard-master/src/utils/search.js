export function filterByQuery(items, query, keys = []) {
  if (!query) return items;
  const q = query.toString().trim().toLowerCase();
  if (!q) return items;

  return items.filter((item) =>
    keys.some((key) => {
      try {
        const val = (item?.[key] ?? "").toString().toLowerCase();
        return val.includes(q);
      } catch (e) {
        return false;
      }
    })
  );
}

export default filterByQuery;
