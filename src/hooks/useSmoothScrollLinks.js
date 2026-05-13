import { useEffect } from 'react';

export function useSmoothScrollLinks(offset = 80) {
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const targetEl = document.getElementById(href.slice(1));
      if (!targetEl) return;

      e.preventDefault();
      const top =
        targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [offset]);
}
