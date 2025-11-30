import React from 'react';
import Input from '../../../../components/inputs/InputComponent';

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
        <div className="flex flex-col gap-2">
          <label className="font-bold text-base">Dia consultas:</label>
          <select
            className="border-3 rounded-[20px] border-[#C5A8FA] h-12 px-4 text-base"
            name="dia_consultas"
            value={diaConsultas}
            disabled={true}
            onChange={(e) => setDiaConsultas(e.target.value)}
          >
            <option value="segunda">Segunda-Feira</option>
            <option value="terca">Terça-Feira</option>
            <option value="quarta">Quarta-Feira</option>
            <option value="quinta">Quinta-Feira</option>
            <option value="sexta">Sexta-Feira</option>
          </select>
        </div>
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
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="font-bold text-base">Motivo de consulta</label>
          <textarea
            name="motivo_consulta"
            value={motivoConsulta}
            className="border-3 rounded-[20px] border-[#C5A8FA] min-h-32 resize-y w-full p-4 text-base"
            onChange={(e) => setMotivoConsulta(e.target.value)}
            disabled={true}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ConsultaCard;
