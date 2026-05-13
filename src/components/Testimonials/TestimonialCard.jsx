import { Star } from '../Icons/Icons';
import styles from './Testimonials.module.scss';

export default function TestimonialCard({ testimonial }) {
  const { text, author } = testimonial;

  return (
    <div className={`${styles.card} animate-slide-up`}>
      <span className={styles.quote}>&ldquo;</span>
      <p className={styles.text}>{text}</p>

      <div className={styles.author}>
        <div className={styles.avatar}>
          <img src={author.avatar} alt={author.name} />
        </div>
        <div>
          <p className={styles.name}>{author.name}</p>
          <div className={styles.rating}>
            <div className={styles.stars}>
              {Array.from({ length: author.stars }).map((_, i) => (
                <Star key={i} />
              ))}
            </div>
            <span>{author.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
