import React from 'react';
import Input from '../../../../components/inputs/InputComponent';
import Select from '../../../../components/inputs/SelectComponent';
import TextArea from '../../../../components/inputs/TextAreaComponent';

const ConsultaCard = ({
  diaConsultas,
  setDiaConsultas,
  horarioConsultas,
  setHorarioConsultas,
  motivoConsulta,
  setMotivoConsulta
}) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <Select
          label="Dia consultas:"
          name="dia_consultas"
          value={diaConsultas}
          width="w-full"
          onChange={(e) => setDiaConsultas(e.target.value)}
          fontSize="1rem"
          disabled={true}
        >
          <option value="segunda">Segunda-Feira</option>
          <option value="terca">Terça-Feira</option>
          <option value="quarta">Quarta-Feira</option>
          <option value="quinta">Quinta-Feira</option>
          <option value="sexta">Sexta-Feira</option>
        </Select>
        <Input
          label="Horário consultas:"
          name="horario_consultas"
          placeholder="00:00"
          type="text"
          value={horarioConsultas}
          width="w-full"
          onChange={(e) => setHorarioConsultas(e.target.value)}
          fontSize="1rem"
          disabled={true}
        />
        <div className="md:col-span-2">
          <TextArea
            label="Motivo de consulta"
            name="motivo_consulta"
            value={motivoConsulta}
            width="w-full"
            onChange={(e) => setMotivoConsulta(e.target.value)}
            fontSize="1rem"
            disabled={true}
            minHeight="8rem"
          />
        </div>
      </div>
    </div>
  );
};

export default ConsultaCard;
