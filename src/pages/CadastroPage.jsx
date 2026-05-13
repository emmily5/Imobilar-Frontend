import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SidePanel from '../components/SidePanel/SidePanel';
import { UserSolid, BriefcaseSolid } from '../components/Icons/Icons';
import { authApi } from '../utils/api';
import styles from './LoginPage.module.scss';

export default function CadastroPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    perfil: 'cliente',
    termos: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, name, type, value, checked } = e.target;
    const key = type === 'radio' ? name : id;
    setForm((prev) => ({
      ...prev,
      [key]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.senha !== form.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    setIsSubmitting(true);
    try {
      const { ok } = await authApi.cadastro({
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        perfil: form.perfil,
      });

      if (ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login');
      } else {
        alert('Erro ao cadastrar. Tente novamente.');
      }
    } catch {
      alert('Erro de conexão. Verifique sua internet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.layout}>
      <SidePanel
        eyebrow="Bem-vindo"
        title={
          <>
            Comece sua<br />jornada imobiliária
          </>
        }
        subtitle="Crie sua conta e acesse a plataforma completa para comprar, vender e alugar imóveis."
        benefits={[
          'Busca inteligente com filtros avançados',
          'Propostas e negociações 100% online',
          'Contratos digitais com validade jurídica',
          'Suporte dedicado em todas as etapas',
        ]}
      />

      <div className={styles.formSection}>
        <div className={`${styles.formCard} ${styles.wide}`}>
          <p className={styles.formEyebrow}>Nova conta</p>
          <h1 className={styles.formTitle}>Criar Conta</h1>
          <p className={styles.formSubtitle}>Preencha seus dados para começar.</p>
          <div className={styles.formDivider} />

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="nome">
                Nome Completo
              </label>
              <input
                type="text"
                id="nome"
                className={styles.formInput}
                placeholder="Seu nome completo"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="email">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                className={styles.formInput}
                placeholder="seu@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="senha">
                  Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  className={styles.formInput}
                  placeholder="••••••••"
                  value={form.senha}
                  onChange={handleChange}
                  minLength={8}
                  required
                />
                <p className={styles.passwordHint}>Mínimo 8 caracteres</p>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="confirmarSenha">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmarSenha"
                  className={styles.formInput}
                  placeholder="••••••••"
                  value={form.confirmarSenha}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <span className={styles.profileLabelTop}>Você é</span>
            <div className={styles.profileToggle}>
              <div className={styles.profileOption}>
                <input
                  type="radio"
                  name="perfil"
                  id="cliente"
                  value="cliente"
                  checked={form.perfil === 'cliente'}
                  onChange={handleChange}
                />
                <label htmlFor="cliente">
                  <div className={styles.profileIcon}>
                    <UserSolid />
                  </div>
                  <span className={styles.profileName}>Cliente</span>
                  <span className={styles.profileDesc}>Buscando imóvel</span>
                </label>
              </div>
              <div className={styles.profileOption}>
                <input
                  type="radio"
                  name="perfil"
                  id="corretor"
                  value="corretor"
                  checked={form.perfil === 'corretor'}
                  onChange={handleChange}
                />
                <label htmlFor="corretor">
                  <div className={styles.profileIcon}>
                    <BriefcaseSolid />
                  </div>
                  <span className={styles.profileName}>Corretor</span>
                  <span className={styles.profileDesc}>Imobiliária</span>
                </label>
              </div>
            </div>

            <label className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                id="termos"
                checked={form.termos}
                onChange={handleChange}
                required
              />
              <span>
                Aceito os <a href="#">Termos de Uso</a> e a{' '}
                <a href="#">Política de Privacidade</a>
              </span>
            </label>

            <button
              type="submit"
              className={styles.btnSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Criando...' : 'Criar minha conta'}
            </button>
          </form>

          <p className={styles.signupLink}>
            Já tem uma conta? <Link to="/login">Entre aqui</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
