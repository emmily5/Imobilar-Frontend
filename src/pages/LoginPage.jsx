import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SidePanel from '../components/SidePanel/SidePanel';
import { Eye, EyeOff } from '../components/Icons/Icons';
import { useToggle } from '../hooks/useToggle';
import { isValidEmail } from '../utils/validation';
import { authApi } from '../utils/api';
import styles from './LoginPage.module.scss';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, togglePassword] = useToggle(false);
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, type, value, checked } = e.target;
    setForm((prev) => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: null }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.email || !isValidEmail(form.email)) {
      nextErrors.email = 'Informe um e-mail válido.';
    }
    if (!form.password) {
      nextErrors.password = 'Informe sua senha.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const { ok } = await authApi.login(form.email, form.password);
      if (ok) {
        navigate('/');
      } else {
        setErrors({ email: 'E-mail ou senha incorretos.' });
      }
    } catch {
      setErrors({ email: 'Erro de conexão. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogle = () => {
    alert('Login com Google (mockup)');
  };

  return (
    <div className={styles.layout}>
      <SidePanel
        eyebrow="Bem-vindo de volta"
        title={
          <>
            Encontre o lar<br />que merece<br />sua história
          </>
        }
        subtitle="Acesse sua conta e continue sua jornada imobiliária com segurança e transparência."
        stats={[
          { value: '3.5k', label: 'Imóveis' },
          { value: '1.2k', label: 'Contratos' },
          { value: '9.8', label: 'Avaliação' },
        ]}
        showRing
      />

      <div className={styles.formSection}>
        <div className={styles.formCard}>
          <p className={styles.formEyebrow}>Acesse sua conta</p>
          <h1 className={styles.formTitle}>Entrar</h1>
          <p className={styles.formSubtitle}>
            Bem-vindo de volta. Acesse sua conta.
          </p>
          <div className={styles.formDivider} />

          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="email">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                className={`${styles.formInput} ${
                  errors.email ? styles.error : ''
                }`}
                placeholder="seu@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <p className={styles.errorMsg}>{errors.email}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="password">
                Senha
              </label>
              <div className={styles.inputWrap}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className={`${styles.formInput} ${
                    errors.password ? styles.error : ''
                  }`}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={togglePassword}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                <p className={styles.errorMsg}>{errors.password}</p>
              )}
            </div>

            <div className={styles.formOptions}>
              <label className={styles.checkboxWrap}>
                <input
                  type="checkbox"
                  id="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />
                <span>Lembrar de mim</span>
              </label>
              <a href="#" className={styles.forgotLink}>
                Esqueci minha senha
              </a>
            </div>

            <button
              type="submit"
              className={styles.btnSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Entrando...' : 'Entrar na minha conta'}
            </button>
          </form>

          <div className={styles.orDivider}>
            <span>ou</span>
          </div>

          <button
            type="button"
            className={styles.btnGoogle}
            onClick={handleGoogle}
          >
            <svg viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar com Google
          </button>

          <p className={styles.signupLink}>
            Não tem uma conta? <Link to="/cadastro">Cadastre-se gratuitamente</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
