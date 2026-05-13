import StatItem from './StatItem';
import { stats } from '../../data/stats';
import styles from './Stats.module.scss';

export default function Stats() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {stats.map((stat) => (
            <StatItem key={stat.id} target={stat.target} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
