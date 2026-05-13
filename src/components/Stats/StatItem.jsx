import { useCounterAnimation } from '../../hooks/useCounterAnimation';
import styles from './Stats.module.scss';

export default function StatItem({ target, label }) {
  const { ref, value } = useCounterAnimation(target);

  return (
    <div className={`${styles.item} animate-count-up`}>
      <div ref={ref} className={styles.number}>
        {value}
      </div>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
