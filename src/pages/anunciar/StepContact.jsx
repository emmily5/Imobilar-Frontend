import styles from '../AnunciarPage.module.scss';

export default function StepContact({ form, onChange, errors }) {
  const fieldClass = (name) =>
    `${styles.fieldInput} ${errors[name] ? styles.error : ''}`;

  return (
    <div>
      <div className={styles.stepHeader}>
        <p className={styles.stepNum}>Etapa 04 / 04</p>
        <h2 className={styles.stepTitle}>Seus dados de contato</h2>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="ownerName">
          Nome Completo <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="ownerName"
          className={fieldClass('ownerName')}
          placeholder="João Silva"
          value={form.ownerName}
          onChange={onChange}
          required
        />
      </div>

      <div className={styles.fieldGrid2}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="ownerEmail">
            E-mail <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            id="ownerEmail"
            className={fieldClass('ownerEmail')}
            placeholder="joao@email.com"
            value={form.ownerEmail}
            onChange={onChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="ownerPhone">
            WhatsApp / Telefone <span className={styles.required}>*</span>
          </label>
          <input
            type="tel"
            id="ownerPhone"
            className={fieldClass('ownerPhone')}
            placeholder="(84) 99999-9999"
            value={form.ownerPhone}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <div className={styles.termsWrap}>
        <input
          type="checkbox"
          id="terms"
          checked={form.terms}
          onChange={onChange}
          required
        />
        <span>
          Li e concordo com os <a href="#">Termos de Uso</a> e a{' '}
          <a href="#">Política de Privacidade</a> da IMOBILAR.
        </span>
      </div>
    </div>
  );
}
