import React, { useState } from 'react';
import { FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import styles from './ProfileMenu.module.css';

const ProfileMenu = ({ imagem, onEditarFoto, onConfiguracoes, onSair, showEditarFoto = true, showConfiguracoes = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleEditarFoto = () => {
    setIsOpen(false);
    onEditarFoto();
  };

  const handleConfiguracoes = () => {
    setIsOpen(false);
    onConfiguracoes();
  };

  const handleSair = () => {
    setIsOpen(false);
    onSair();
  };

  return (
    <div className={styles.profileMenuContainer}>
      <button 
        className={styles.profileButton} 
        onClick={toggleMenu}
        aria-label="Menu do perfil"
      >
        {imagem ? (
          <img 
            src={imagem} 
            alt="Foto de perfil" 
            className={styles.profileImage}
          />
        ) : (
          <FaUserCircle className={styles.defaultIcon} />
        )}
      </button>

      {isOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsOpen(false)} />
          <div className={styles.dropdown}>
            {showEditarFoto && (
              <button 
                className={styles.menuItem} 
                onClick={handleEditarFoto}
              >
                <FaUserCircle className={styles.menuIcon} />
                <span>Editar Foto</span>
              </button>
            )}
            
            {showConfiguracoes && (
              <button 
                className={styles.menuItem} 
                onClick={handleConfiguracoes}
              >
                <FaCog className={styles.menuIcon} />
                <span>Configurações</span>
              </button>
            )}
            
            {(showEditarFoto || showConfiguracoes) && <div className={styles.divider} />}
            
            <button 
              className={`${styles.menuItem} ${styles.logout}`} 
              onClick={handleSair}
            >
              <FaSignOutAlt className={styles.menuIcon} />
              <span>Sair</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileMenu;
