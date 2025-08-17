import React, { useState, useEffect } from "react";
import {
  visualizarAgendamentos,
  buscarAgendamentoPorId,
  atualizarAgendamento,
  buscarHorariosDisponiveis,
  postAgendamento,
} from "../../../provider/api";
import HeaderDash from "../../../components/headerDash/HeaderDashComponent";
import Loading from "../../../components/loading/Loading";
import styles from "./meusAgendamentos.module.css";
import { errorMessage, responseMessage } from "../../../utils/alert";
import Agendamento from "../../../components/agendamento/agendamento";

const MeusAgendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [PopupAgendar, setPopupAgendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
  const idUsuario = localStorage.getItem("idUsuario");

  const [horaEscolhida, setHoraEscolhida] = useState("");
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [diaSemana, setDiaSemana] = useState(0);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [diasDoMes, setDiasDoMes] = useState([]);

  const opcoesHorarios = [
    "08:00:00",
    "09:00:00",
    "10:00:00",
    "11:00:00",
    "12:00:00",
    "13:00:00",
    "14:00:00",
    "15:00:00",
    "16:00:00",
  ];

  const buscarAgendamentos = async () => {
    try {
      setLoading(true);
      const dados = await visualizarAgendamentos(idUsuario);
      if (Array.isArray(dados)) {
        setAgendamentos(dados);
      } else {
        setAgendamentos([]);
        console.error("A resposta da API não é um array:", dados);
      }
    } catch (erro) {
      errorMessage(
        "Não foi possível carregar seus agendamentos. Por favor, tente novamente ou faça login novamente."
      );
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    buscarAgendamentos();
  }, []);

  const cancelarAgendamento = (idAgendamento) => {
    setAgendamentoSelecionado(idAgendamento);
    setMostrarPopup(true);
  };

  const confirmarCancelamento = async () => {
    try {
      const agendamentoCompleto = await buscarAgendamentoPorId(
        agendamentoSelecionado
      );

      const agendamentoAtualizado = {
        ...agendamentoCompleto,
        statusSessao: "CANCELADA",
      };

      const response = await atualizarAgendamento(
        agendamentoSelecionado,
        agendamentoAtualizado
      );

      if (response.status === 200) {
        setAgendamentos((prev) =>
          prev.map((agendamento) =>
            agendamento.id === agendamentoSelecionado
              ? { ...agendamento, statusSessao: "CANCELADA" }
              : agendamento
          )
        );
        setMostrarPopup(false);
        responseMessage("Agendamento cancelado com sucesso!");
      } else {
        errorMessage("Erro ao atualizar o agendamento no backend.");
      }
    } catch (erro) {
      errorMessage(`Erro ao cancelar o agendamento: ${erro.message}`);
    }
  };

  const fecharPopup = () => {
    setMostrarPopup(false);
  };

  const mostrarPopupAgendar = () => {
    setPopupAgendar(true);
  };

  const fecharPopupAgendar = () => {
    setPopupAgendar(false);
  };

  const formatarData = (data) => {
    const [dia, mes, ano] = data.split("/");
    return `${ano}-${mes}-${dia}`;
  };

  const buscarHorariosLocal = async (data) => {
    try {
      const dataFormatada = formatarData(data);
      const horaInicio = "08:00";
      const horaFim = "17:00";

      const sessoes = await buscarHorariosDisponiveis(
        dataFormatada,
        horaInicio,
        horaFim
      );

      const horasOcupadas = sessoes.map((sessao) => sessao.hora);

      const horariosLivres = opcoesHorarios.filter(
        (hora) => !horasOcupadas.includes(hora)
      );

      setHorariosDisponiveis(horariosLivres);

      if (horariosLivres.length > 0) {
        setHoraEscolhida(horariosLivres[0]);
      } else {
        setHoraEscolhida("");
      }
    } catch (erro) {
      errorMessage(`Erro ao buscar os horários disponíveis: ${erro.message}`);
    }
  };

  const confirmarAgendamento = async () => {
    try {
      const dataHoraSelecionada = new Date(
        `${formatarData(dataSelecionada)}T${horaEscolhida}`
      );
      const agora = new Date();

      if (dataHoraSelecionada <= agora) {
        errorMessage(
          "Não é possível agendar para uma data ou horário já passados."
        );
        return;
      }

      const novoAgendamento = {
        fkPaciente: {
          id: Number(idUsuario),
        },
        data: formatarData(dataSelecionada),
        hora: horaEscolhida,
        tipo: "AVULSO",
        statusSessao: "PENDENTE",
        anotacao: "Solicitado por paciente",
      };

      const response = await postAgendamento(novoAgendamento);

      if (response && (response.status === 201 || response.id)) {
        setAgendamentos([
          ...agendamentos,
          { ...novoAgendamento, id: response.data?.id || response.id },
        ]);
        setPopupAgendar(false);
        responseMessage("Agendamento realizado com sucesso!");
      } else {
        errorMessage("Erro ao realizar o agendamento.");
      }
    } catch (erro) {
      if (erro.response && erro.response.status === 409) {
        errorMessage(
          `Já existe uma sessão agendada para o dia ${formatarData(
            dataSelecionada
          )} às ${horaEscolhida.substring(0, 5)}.`
        );
      } else {
        errorMessage(`Erro ao realizar o agendamento: ${erro.message}`);
      }
    }
  };

  const handleDiaSemanaChange = (e) => {
    const selectedDiaSemana = parseInt(e.target.value, 10);
    setDiaSemana(selectedDiaSemana);

    const diasDoMesAtualizados = getDiasDoMesPorDiaSemana(selectedDiaSemana);
    setDiasDoMes(diasDoMesAtualizados);
    setDataSelecionada(diasDoMesAtualizados[0]);
    setHorariosDisponiveis([]);
  };

  const handleDataChange = async (e) => {
    const selectedData = e.target.value;
    setDataSelecionada(selectedData);

    await buscarHorariosLocal(selectedData);
  };

  const getDiasDoMesPorDiaSemana = (selectedDiaSemana) => {
    return Array.from({ length: 4 }, (_, i) => {
      const data = new Date();
      data.setDate(
        data.getDate() + i * 7 + ((selectedDiaSemana - data.getDay() + 7) % 7)
      );
      return data.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    });
  };

  return (
    <>
      <HeaderDash showSettingsIcon={true} />
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.containerPrincipal}>
          <div className={styles.header}>
            <h1>Meus agendamentos</h1>
            <button
              className={styles.agendarButton}
              type="button"
              onClick={mostrarPopupAgendar}
            >
              + Novo Agendamento
            </button>
          </div>
          <div className={styles.agendamentosContainer}>
            {agendamentos.length > 0 ? (
              agendamentos.map((agendamento, index) => (
                <Agendamento
                  key={`${agendamento.id}-${index}`}
                  agendamento={agendamento}
                  onCancelar={cancelarAgendamento}
                />
              ))
            ) : (
              <p>Nenhum agendamento encontrado.</p>
            )}
          </div>
        </div>
      )}
      {mostrarPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>Confirmar Cancelamento</h2>
            <p>Tem certeza de que deseja cancelar este agendamento?</p>
            <div className={styles.popupActions}>
              <button
                className={styles.cancelButton}
                type="button"
                onClick={fecharPopup}
              >
                NÃO
              </button>
              <button
                className={styles.confirmButton}
                type="button"
                onClick={confirmarCancelamento}
              >
                SIM
              </button>
            </div>
          </div>
        </div>
      )}
      {PopupAgendar && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>Agendar Consulta</h2>
            <div className={styles.inputContainer}>
              <label htmlFor="diaSemana">Selecione o Dia da Semana:</label>
              <select
                id="diaSemana"
                value={diaSemana}
                onChange={handleDiaSemanaChange}
                className={styles.selectField}
              >
                <option value="" disabled>
                  Selecione um dia da semana
                </option>
                <option value={1}>Segunda-feira</option>
                <option value={2}>Terça-feira</option>
                <option value={3}>Quarta-feira</option>
                <option value={4}>Quinta-feira</option>
                <option value={5}>Sexta-feira</option>
              </select>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="data">Selecione o Dia do Mês:</label>
              <select
                id="data"
                value={dataSelecionada}
                onChange={handleDataChange}
                className={styles.selectField}
              >
                <option value="" disabled>
                  Selecione uma data
                </option>
                {diasDoMes.map((data, index) => (
                  <option key={index} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="horariosDisponiveis">Selecione o Horário:</label>
              <select
                id="horariosDisponiveis"
                value={horaEscolhida}
                onChange={(e) => setHoraEscolhida(e.target.value)}
                className={styles.selectField}
              >
                <option value="" disabled>
                  Selecione um horário
                </option>
                {Array.isArray(horariosDisponiveis) &&
                  horariosDisponiveis.length > 0 ? (
                  horariosDisponiveis.map((horario, index) => (
                    <option key={index} value={horario}>
                      {horario.substring(0, 5)}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Nenhum horário disponível
                  </option>
                )}
              </select>
            </div>
            <div className={styles.popupActions}>
              <button
                className={styles.cancelButton}
                onClick={fecharPopupAgendar}
              >
                Cancelar
              </button>
              <button
                className={styles.confirmButton}
                onClick={confirmarAgendamento}
              >
                Agendar Consulta
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};



export default MeusAgendamentos;
