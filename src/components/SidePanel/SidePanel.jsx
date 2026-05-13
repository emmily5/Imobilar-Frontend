import { HomeSolid } from '../Icons/Icons';
import styles from '../../pages/LoginPage.module.scss';

export default function SidePanel({ eyebrow, title, subtitle, stats, benefits, showRing = false }) {
  return (
    <div className={styles.sidePanel}>
      {showRing && <span className={styles.sideRing} />}
      <div className={styles.sideInner}>
        <div className={styles.sideLogo}>
          IMOBI<span className={styles.dot}>·</span>LAR
        </div>

        <div className={styles.sideIcon}>
          <HomeSolid />
        </div>

        <div className={styles.sideEyebrow}>
          <span>{eyebrow}</span>
        </div>

        <h2 className={styles.sideTitle}>{title}</h2>
        <p className={styles.sideSub}>{subtitle}</p>

        {stats && (
          <div className={styles.sideStats}>
            {stats.map((stat, i) => (
              <div key={stat.label} style={{ display: 'contents' }}>
                <div className={styles.sideStat}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
                {i < stats.length - 1 && (
                  <div className={styles.sideStatDivider} />
                )}
              </div>
            ))}
          </div>
        )}

        {benefits && (
          <ul className={styles.sideBenefits}>
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
