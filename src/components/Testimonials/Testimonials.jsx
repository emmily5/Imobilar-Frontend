import SectionHeader from '../SectionHeader/SectionHeader';
import TestimonialCard from './TestimonialCard';
import { testimonials } from '../../data/testimonials';
import styles from './Testimonials.module.scss';

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          label="Depoimentos"
          title={
            <>
              Histórias de quem<br />confia na IMOBILAR
            </>
          }
        />

        <div className={styles.grid}>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
