import React, { useEffect, useRef, useState } from 'react';
import './TrendingCarousel.css';

export default function TrendingCarousel({
  limit = 12,
  title = 'En tendencia',
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    async function fetchTrending() {
      const tryUrls = [
        'https://openlibrary.org/trending/weekly.json',
        'https://openlibrary.org/trending/daily.json',
        'https://openlibrary.org/trending.json',
      ];

      for (const url of tryUrls) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const data = await res.json();
          if (Array.isArray(data.works)) return data.works;
          if (Array.isArray(data.entries)) return data.entries;
          if (Array.isArray(data.docs)) return data.docs;
          if (Array.isArray(data.items)) return data.items;
        } catch (e) {}
      }

      const fallback = `https://openlibrary.org/search.json?has_fulltext=true&limit=${limit}`;
      const res = await fetch(fallback);
      if (!res.ok) throw new Error('Network response was not ok (fallback)');
      const data = await res.json();
      return data.docs || [];
    }

    async function load() {
      try {
        const arr = await fetchTrending();
        if (cancelled) return;

        const normalized = arr.slice(0, limit).map((it, i) => {
          const title =
            it.title || it.work_title || it.name || `Libro ${i + 1}`;
          const key =
            it.key || it.cover_edition_key || it.id || `${title}-${i}`;
          const authors =
            it.authors ||
            (it.author_name ? it.author_name.map((n) => ({ name: n })) : []) ||
            (it.author
              ? Array.isArray(it.author)
                ? it.author
                : [it.author]
              : []);
          const cover_id = it.cover_id || it.cover_i || null;
          const cover_edition_key =
            it.cover_edition_key ||
            (it.edition_key && it.edition_key[0]) ||
            null;

          return { key, title, authors, cover_id, cover_edition_key };
        });

        setItems(normalized);
      } catch (err) {
        setError(err.message || 'Error al cargar');
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [limit]);

  const coverUrl = (work) => {
    if (work.cover_id)
      return `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg`;
    if (work.cover_edition_key)
      return `https://covers.openlibrary.org/b/olid/${work.cover_edition_key}-L.jpg`;
    return '/placeholder-cover.png';
  };

  const scroll = (dir = 1) => {
    const el = containerRef.current;
    if (!el) return;
    const offset = el.clientWidth * 0.8;
    el.scrollBy({ left: offset * dir, behavior: 'smooth' });
  };

  return (
    <section className="trending-carousel">
      <div className="page-container">
        <div className="carousel-header">
          <h3 className="carousel-title">{title}</h3>
          <div className="carousel-controls">
            <button
              className="nav small"
              onClick={() => scroll(-1)}
              aria-label="Anterior"
            >
              ‹
            </button>
            <button
              className="nav small"
              onClick={() => scroll(1)}
              aria-label="Siguiente"
            >
              ›
            </button>
          </div>
        </div>

        {loading && <div className="carousel-status">Cargando…</div>}
        {error && <div className="carousel-status error">Error: {error}</div>}

        <div className="carousel-wrapper">
          <div className="carousel" ref={containerRef} role="list">
            {items.map((w, i) => (
              <article
                key={w.key || `${w.title}-${i}`}
                className="book-card"
                role="listitem"
              >
                <div className="cover-wrap">
                  <img
                    src={coverUrl(w)}
                    alt={w.title || 'Portada'}
                    loading="lazy"
                    className="book-cover"
                    onError={(e) =>
                      (e.currentTarget.src = '/placeholder-cover.png')
                    }
                  />
                  */}
                </div>
                <div className="book-meta">
                  <div className="book-title" title={w.title}>
                    {w.title}
                  </div>
                  {w.authors && w.authors[0] && (
                    <div className="book-author">{w.authors[0].name}</div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
