import { useRef, useState } from 'react';
import { Upload } from '../../components/Icons/Icons';
import styles from '../AnunciarPage.module.scss';

const MAX_FILES = 10;

export default function StepMedia({ files, onFilesChange }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = (incoming) => {
    const newFiles = Array.from(incoming)
      .filter((f) => f.type.startsWith('image/'))
      .slice(0, MAX_FILES - files.length)
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
      }));

    if (newFiles.length) onFilesChange([...files, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const handleRemove = (id) => {
    const removed = files.find((f) => f.id === id);
    if (removed) URL.revokeObjectURL(removed.preview);
    onFilesChange(files.filter((f) => f.id !== id));
  };

  return (
    <div>
      <div className={styles.stepHeader}>
        <p className={styles.stepNum}>Etapa 03 / 04</p>
        <h2 className={styles.stepTitle}>Fotos do imóvel</h2>
      </div>

      <div className={styles.field}>
        <div
          className={`${styles.uploadArea} ${dragOver ? styles.dragover : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => addFiles(e.target.files)}
          />
          <Upload className={styles.uploadIcon} />
          <p className={styles.uploadTitle}>Arraste ou clique para enviar</p>
          <p className={styles.uploadSub}>
            JPG, PNG ou WebP · Máximo 10 fotos
          </p>
        </div>
        <p className={styles.fieldHint} style={{ marginTop: '0.75rem' }}>
          A primeira imagem será usada como capa do anúncio.
        </p>

        {files.length > 0 && (
          <div className={styles.imagePreview}>
            {files.map((file, index) => (
              <div
                key={file.id}
                className={`${styles.previewItem} ${
                  index === 0 ? styles.cover : ''
                }`}
              >
                <img src={file.preview} alt="" />
                <button
                  type="button"
                  className={styles.previewRemove}
                  onClick={() => handleRemove(file.id)}
                  aria-label="Remover imagem"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
