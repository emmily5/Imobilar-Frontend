import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnunciarHeader from './anunciar/AnunciarHeader';
import AnunciarFooter from './anunciar/AnunciarFooter';
import ProgressBar from './anunciar/ProgressBar';
import StepBasic from './anunciar/StepBasic';
import StepDetails from './anunciar/StepDetails';
import StepMedia from './anunciar/StepMedia';
import StepContact from './anunciar/StepContact';
import { ArrowLeft, ArrowRight, Check } from '../components/Icons/Icons';
import { imoveisApi } from '../utils/api';
import styles from './AnunciarPage.module.scss';

const TOTAL_STEPS = 4;

const initialForm = {
  title: '',
  propertyType: '',
  operation: '',
  price: '',
  description: '',
  cep: '',
  address: '',
  number: '',
  neighborhood: '',
  complement: '',
  city: '',
  state: 'RN',
  bedrooms: '',
  bathrooms: '',
  parking: '',
  area: '',
  amenities: [],
  ownerName: '',
  ownerEmail: '',
  ownerPhone: '',
  terms: false,
};

const requiredByStep = {
  1: ['title', 'propertyType', 'operation', 'price', 'description'],
  2: ['cep', 'address', 'number', 'neighborhood', 'city', 'state', 'area'],
  3: [],
  4: ['ownerName', 'ownerEmail', 'ownerPhone', 'terms'],
};

export default function AnunciarPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, name, type, value, checked } = e.target;

    if (type === 'checkbox' && name === 'amenities') {
      setForm((prev) => ({
        ...prev,
        amenities: checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((a) => a !== value),
      }));
      return;
    }

    const key = type === 'radio' ? name : id;
    setForm((prev) => ({
      ...prev,
      [key]: type === 'checkbox' ? checked : value,
    }));

    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validateStep = (step) => {
    const fields = requiredByStep[step] || [];
    const nextErrors = {};

    fields.forEach((field) => {
      const value = form[field];
      if (typeof value === 'boolean') {
        if (!value) nextErrors[field] = true;
      } else if (!value || String(value).trim() === '') {
        nextErrors[field] = true;
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(TOTAL_STEPS)) return;

    setIsSubmitting(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else {
        formData.append(key, value);
      }
    });
    files.forEach((f) => formData.append('photos', f.file));

    try {
      const { ok } = await imoveisApi.publicar(formData);
      if (ok) {
        alert('Anúncio publicado com sucesso!');
        navigate('/');
      } else {
        alert('Erro ao publicar. Tente novamente.');
      }
    } catch {
      alert('Erro de conexão. Verifique sua internet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepBasic form={form} onChange={handleChange} errors={errors} />;
      case 2:
        return (
          <StepDetails form={form} onChange={handleChange} errors={errors} />
        );
      case 3:
        return <StepMedia files={files} onFilesChange={setFiles} />;
      case 4:
        return (
          <StepContact form={form} onChange={handleChange} errors={errors} />
        );
      default:
        return null;
    }
  };

  const isLastStep = currentStep === TOTAL_STEPS;

  return (
    <div className={styles.page}>
      <AnunciarHeader />

      <div className={styles.mainWrap}>
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} noValidate>
            {renderStep()}

            <div className={styles.formNav}>
              <button
                type="button"
                className={`${styles.btnBack} ${
                  currentStep === 1 ? styles.hidden : ''
                }`}
                onClick={handleBack}
              >
                <ArrowLeft />
                Voltar
              </button>

              {isLastStep ? (
                <button
                  type="submit"
                  className={styles.btnSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Publicando...' : 'Publicar Anúncio'}
                  <Check />
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.btnNext}
                  onClick={handleNext}
                >
                  Avançar
                  <ArrowRight />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <AnunciarFooter />
    </div>
  );
}
