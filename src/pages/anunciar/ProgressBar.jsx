import { Check } from '../../components/Icons/Icons';
import styles from '../AnunciarPage.module.scss';

const STEPS = [
  { id: 1, label: 'Básico' },
  { id: 2, label: 'Detalhes' },
  { id: 3, label: 'Mídia' },
  { id: 4, label: 'Contato' },
];

export default function ProgressBar({ currentStep, totalSteps }) {
  const pct = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className={styles.progressWrap}>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${pct}%` }} />

        {STEPS.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const classes = [
            styles.progressStep,
            isActive && styles.active,
            isCompleted && styles.completed,
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div key={step.id} className={classes}>
              <div className={styles.stepCircle}>
                {isCompleted ? <Check /> : <span>{step.id}</span>}
              </div>
              <div className={styles.stepLabel}>{step.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
