import React from 'react';
import Input from '../../../../components/inputs/InputComponent';

const EnderecoCard = ({
  cep,
  setCep,
  logradouro,
  setLogradouro,
  bairro,
  setBairro,
  cidade,
  setCidade,
  estado,
  setEstado,
  numero,
  setNumero,
  complemento,
  setComplemento,
  handleCepChange,
  handleBuscarEndereco,
  handleEstadoChange,
  editing
}) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <Input
          name="cep"
          value={cep}
          width="w-full"
          label="CEP"
          type="text"
          onChange={(e) => setCep(handleCepChange(e.target.value))}
          onBlur={handleBuscarEndereco}
          placeholder="00000-000"
          fontSize="1rem"
          disabled={!editing}
        />
        <Input
          name="logradouro"
          value={logradouro}
          width="w-full"
          label="Logradouro:"
          type="text"
          onChange={(e) => setLogradouro(e.target.value)}
          placeholder="Rua, Avenida, Estrada"
          fontSize="1rem"
          disabled={!editing}
        />
        <Input
          name="bairro"
          value={bairro}
          width="w-full"
          label="Bairro:"
          type="text"
          onChange={(e) => setBairro(e.target.value)}
          placeholder="Insira seu bairro"
          fontSize="1rem"
          disabled={!editing}
        />
        <Input
          name="cidade"
          value={cidade}
          width="w-full"
          label="Cidade:"
          type="text"
          onChange={(e) => setCidade(e.target.value)}
          placeholder="Insira sua cidade"
          fontSize="1rem"
          disabled={!editing}
        />
        <Input
          name="estado"
          value={estado}
          width="w-full"
          label="Estado:"
          type="text"
          onChange={handleEstadoChange}
          placeholder="Insira seu estado"
          fontSize="1rem"
          disabled={!editing}
        />
        <Input
          name="numero"
          width="w-full"
          label="Número:"
          value={numero}
          type="text"
          onChange={(e) => setNumero(e.target.value)}
          placeholder="Insira o número"
          max="5"
          fontSize="1rem"
          disabled={!editing}
        />
        <div className="md:col-span-2">
          <Input
            name="complemento"
            width="w-full"
            label="Complemento:"
            value={complemento}
            type="text"
            onChange={(e) => setComplemento(e.target.value)}
            placeholder="Insira o complemento"
            fontSize="1rem"
            disabled={!editing}
          />
        </div>
      </div>
    </div>
  );
};

export default EnderecoCard;
