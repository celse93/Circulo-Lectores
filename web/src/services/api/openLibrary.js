const OL_BASE = 'https://openlibrary.org';
const COVERS_BASE = 'https://covers.openlibrary.org/b/id';

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} - ${url}`);
  return res.json();
}

async function safeFetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function fetchWorkForKey(key) {
  try {
    const work = await fetchJSON(`${OL_BASE}${key}.json`);
    const title = work.title || 'Sin título';
    const authors = (work?.authors || [])
      .map((a) => a?.author?.key)
      .filter(Boolean);
    let authorNames = [];
    if (authors.length) {
      const names = await Promise.all(
        authors.slice(0, 2).map(async (ak) => {
          try {
            const a = await fetchJSON(`${OL_BASE}${ak}.json`);
            return a?.name;
          } catch {
            return null;
          }
        })
      );
      authorNames = names.filter(Boolean);
    }
    const coverId =
      Array.isArray(work.covers) && work.covers.length ? work.covers[0] : null;
    const coverUrl = coverId ? `${COVERS_BASE}/${coverId}-L.jpg` : null;
    return { key, title, authors: authorNames, coverId, coverUrl };
  } catch (e) {
    return null;
  }
}

export async function fetchRecentWorks(limit = 12, changesLimit = 80) {
  const changes = await fetchJSON(
    `${OL_BASE}/recentchanges.json?limit=${changesLimit}`
  );
  const workKeys = new Set();
  for (const ch of changes) {
    try {
      const k = ch?.data?.key || ch?.key;
      if (!k) continue;
      if (k.startsWith('/works/')) workKeys.add(k);
      else if (k.startsWith('/books/')) {
        const edition = await safeFetchJSON(`${OL_BASE}${k}.json`);
        const works = edition?.works || edition?.work;
        if (works && works[0] && works[0].key) workKeys.add(works[0].key);
      }
      if (workKeys.size >= limit) break;
    } catch {
      continue;
    }
  }
  const keysArr = Array.from(workKeys).slice(0, limit);
  const results = await Promise.all(keysArr.map((k) => fetchWorkForKey(k)));
  return results.filter(Boolean);
}

export async function fetchTrending(limit = 12, sample = 60) {
  const data = await fetchJSON(`${OL_BASE}/search.json?limit=${sample}`);
  const docs = data?.docs || [];
  docs.sort((a, b) => (b.edition_count || 0) - (a.edition_count || 0));
  const top = docs.slice(0, limit).map((d) => {
    const coverUrl = d.cover_i ? `${COVERS_BASE}/${d.cover_i}-L.jpg` : null;
    return {
      key:
        d.key ||
        (d?.key
          ? d.key
          : d?.work_key
            ? `/works/${d.work_key[0]}`
            : '/works/unknown'),
      title: d.title || 'Sin título',
      authors: d.author_name ? d.author_name.slice(0, 2) : [],
      coverId: d.cover_i || null,
      coverUrl,
    };
  });
  return top;
}
