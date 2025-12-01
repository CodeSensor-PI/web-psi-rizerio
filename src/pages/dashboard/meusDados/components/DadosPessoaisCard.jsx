import React from 'react';
import Input from '../../../../components/inputs/InputComponent';
import { FaSave } from 'react-icons/fa';
import styles from './Cards.module.css';

const DadosPessoaisCard = ({ 
  nome, 
  setNome, 
  email, 
  setEmail, 
  dataNasc, 
  setDataNasc, 
  cpf, 
  setCpf,
  editing,
  handleEdit
}) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <Input
          label="Nome"
          name="nome"
          type="text"
          value={nome}
          width="w-full"
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome completo"
          fontSize="1rem"
          disabled={!editing}
        />
        <Input
          label="Email:"
          name="email"
          type="email"
          value={email}
          width="w-full"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@email.com"
          fontSize="1rem"
          disabled={!editing}
        />
        <Input
          label="Data de Nascimento:"
          name="data_nascimento"
          type="date"
          width="w-full"
          value={dataNasc}
          onChange={(e) => setDataNasc(e.target.value)}
          fontSize="1rem"
          disabled={true}
        />
        <Input
          label="CPF:"
          name="cpf"
          type="text"
          width="w-full"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="000.000.000-00"
          fontSize="1rem"
          disabled={true}
        />
      </div>
      {editing && (
        <div className={styles.buttonContainer}>
          <button onClick={handleEdit} className={styles.botaoSalvar}>
            <FaSave /> Salvar
          </button>
        </div>
      )}
    </div>
  );
};

export default DadosPessoaisCard;
