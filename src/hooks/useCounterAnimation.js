import { useEffect, useRef, useState } from 'react';

export function useCounterAnimation(target, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isDecimal = target % 1 !== 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasAnimated.current) return;
          hasAnimated.current = true;

          const start = performance.now();
          const animate = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setValue(target * ease);
            if (progress < 1) requestAnimationFrame(animate);
            else setValue(target);
          };
          requestAnimationFrame(animate);
          observer.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  const isDecimal = target % 1 !== 0;
  const formatted = isDecimal
    ? value.toFixed(1)
    : Math.floor(value).toLocaleString('pt-BR');

  return { ref, value: formatted };
}
