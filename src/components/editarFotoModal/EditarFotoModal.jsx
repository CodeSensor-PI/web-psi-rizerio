import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import ModalCropImagem from '../modalCropImagem/ModalCropImagem';
import styles from './EditarFotoModal.module.css';

const EditarFotoModal = ({ 
  imagem, 
  onClose, 
  onSalvar,
  onExcluir 
}) => {
  const [showCropModal, setShowCropModal] = useState(false);
  const [imagemParaCrop, setImagemParaCrop] = useState(null);

  const handleSelecionarFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione um arquivo de imagem válido.');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setImagemParaCrop(reader.result);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSalvarImagemCortada = async (imagemCortada) => {
    setShowCropModal(false);
    setImagemParaCrop(null);
    await onSalvar(imagemCortada);
    onClose();
  };

  const handleCancelarCrop = () => {
    setShowCropModal(false);
    setImagemParaCrop(null);
  };

  const handleExcluir = async () => {
    if (window.confirm('Tem certeza que deseja excluir sua foto de perfil?')) {
      await onExcluir();
      onClose();
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Gerenciar Foto de Perfil</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.previewContainer}>
            <img
              src={imagem || 'https://placehold.co/300x300'}
              alt="Foto de perfil"
              className={styles.preview}
            />
          </div>

          <div className={styles.actions}>
            <label className={styles.button}>
              Alterar Foto
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleSelecionarFoto}
              />
            </label>

            {imagem && (
              <button 
                className={`${styles.button} ${styles.deleteButton}`}
                onClick={handleExcluir}
              >
                Excluir Foto
              </button>
            )}
          </div>

          <div className={styles.info}>
            <p>• Tamanho máximo: 5MB</p>
            <p>• Formatos aceitos: JPG, PNG, GIF</p>
            <p>• Recomendado: imagem quadrada</p>
          </div>
        </div>
      </div>

      {showCropModal && imagemParaCrop && (
        <ModalCropImagem
          imagemOriginal={imagemParaCrop}
          onSalvar={handleSalvarImagemCortada}
          onCancelar={handleCancelarCrop}
        />
      )}
    </>
  );
};

export default EditarFotoModal;
