import React from 'react';
import Input from '../../../../components/inputs/InputComponent';

const ContatoCard = ({
  telefone,
  handleTelefoneChange,
  nomeContatoEmergencia,
  setNomeContatoEmergencia,
  telefoneContatoEmergencia,
  handleTelefoneEmergenciaChange,
  handleKeyPress,
  editing
}) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <Input
          label="Telefone:"
          name="telefone"
          type="tel"
          width="w-full"
          value={telefone}
          onChange={handleTelefoneChange}
          onKeyUp={handleKeyPress}
          placeholder="(00) 00000-0000"
          fontSize="1rem"
          disabled={!editing}
        />
        <Input
          label="Nome Contato:"
          name="nome_contato_emergencia"
          type="text"
          width="w-full"
          value={nomeContatoEmergencia}
          onChange={(e) => setNomeContatoEmergencia(e.target.value)}
          placeholder="Contato de emergência"
          fontSize="1rem"
          disabled={!editing}
        />
        <Input
          label="Telefone do Contato de Emergência:"
          name="telefone_contato_emergencia"
          type="tel"
          width="w-full"
          value={telefoneContatoEmergencia}
          onChange={handleTelefoneEmergenciaChange}
          onKeyUp={handleKeyPress}
          placeholder="(00) 00000-0000"
          fontSize="1rem"
          disabled={!editing}
        />
      </div>
    </div>
  );
};

export default ContatoCard;
