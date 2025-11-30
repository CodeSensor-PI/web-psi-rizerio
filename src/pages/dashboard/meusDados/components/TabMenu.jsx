import React from 'react';
import styles from './TabMenu.module.css';

const TabMenu = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dados-pessoais', label: 'Dados Pessoais' },
    { id: 'endereco', label: 'Endereço' },
    { id: 'contato', label: 'Contato' },
    { id: 'consulta', label: 'Consulta' },
  ];

  return (
    <div className={styles.tabMenu}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tabButton} ${
            activeTab === tab.id ? styles.active : ''
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabMenu;
