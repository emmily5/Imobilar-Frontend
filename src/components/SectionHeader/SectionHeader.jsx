import styles from './SectionHeader.module.scss';

export default function SectionHeader({ label, title, dark = false }) {
  return (
    <div
      className={`${styles.header} animate-fade-in ${dark ? styles.dark : ''}`}
    >
      <span className={styles.label}>{label}</span>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
