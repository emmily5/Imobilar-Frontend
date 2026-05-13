import styles from './Audience.module.scss';

export default function AudienceCard({ label, title, benefits, cta }) {
  return (
    <div className={`${styles.card} animate-slide-up`}>
      <p className={styles.cardLabel}>{label}</p>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.divider} />

      <ul className={styles.benefits}>
        {benefits.map((benefit, index) => (
          <li key={index} className={styles.benefit}>
            <div className={styles.benefitIcon}>{benefit.icon}</div>
            <span className={styles.benefitText}>{benefit.text}</span>
          </li>
        ))}
      </ul>

      {cta}
    </div>
  );
}
