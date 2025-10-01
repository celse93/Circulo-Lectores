import React, { useEffect, useRef, useState } from 'react';
import './BooksCarousel.css';

export default function BooksCarousel({
  subject = 'fiction',
  limit = 12,
  title = 'Últimos añadidos',
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const url = `https://openlibrary.org/subjects/${encodeURIComponent(subject)}.json?limit=${limit}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setItems(data.works || []);
      })
      .catch((err) => setError(err.message || 'Fetch error'))
      .finally(() => setLoading(false));
  }, [subject, limit]);

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
    <section className="books-carousel">
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
            {items.map((w) => (
              <article key={w.key} className="book-card" role="listitem">
                <div className="cover-wrap">
                  <img
                    src={coverUrl(w)}
                    alt={w.title}
                    loading="lazy"
                    className="book-cover"
                    onError={(e) =>
                      (e.currentTarget.src = '/placeholder-cover.png')
                    }
                  />
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
