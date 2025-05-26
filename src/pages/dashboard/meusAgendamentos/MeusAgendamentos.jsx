import React, { useState, useEffect } from "react";
import {
  visualizarAgendamentos,
  atualizarAgendamento,
  buscarHorariosDisponiveis,
  postAgendamento,
} from "../../../provider/api";
import HeaderDash from "../../../components/headerDash/HeaderDashComponent";
import styles from "./meusAgendamentos.module.css";
import { errorMessage, responseMessage } from "../../../utils/alert";

const MeusAgendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [PopupAgendar, setPopupAgendar] = useState(false);

  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
  const idUsuario = localStorage.getItem("idUsuario");

  const [horaEscolhida, setHoraEscolhida] = useState("");
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [diaSemana, setDiaSemana] = useState(0);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [diasDoMes, setDiasDoMes] = useState([]);

  const buscarAgendamentos = async () => {
    try {
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
    }
  };

  // Função para formatar a data no formato yyyy-MM-dd
  const formatarData = (data) => {
    const [dia, mes, ano] = data.split("/");
    return `${ano}-${mes}-${dia}`; // Converte para o formato yyyy-MM-dd
  };

  const buscarHorariosLocal = async (data) => {
    try {
      const dataFormatada = formatarData(data); // Formata a data antes de enviar
      const horaInicio = "08:00"; // Mock de hora inicial
      const horaFim = "17:00"; // Mock de hora final

      console.log("Enviando para a API:", {
        data: dataFormatada,
        horaInicio,
        horaFim,
      });

      const horarios = await buscarHorariosDisponiveis(
        dataFormatada,
        horaInicio,
        horaFim
      ); // Função importada
      console.log("Horários disponíveis recebidos:", horarios);

      setHorariosDisponiveis(horarios);
      console.log("Estado atualizado de horários:", horariosDisponiveis);
    } catch (erro) {
      errorMessage(`Erro ao buscar os horários disponíveis: ${erro.message}`);
    }
  };

  const cancelarAgendamento = (idAgendamento) => {
    setAgendamentoSelecionado(idAgendamento);
    setMostrarPopup(true);
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

  const confirmarCancelamento = async () => {
    try {
      const response = await atualizarAgendamento(agendamentoSelecionado, {
        statusSessao: "CANCELADA",
      });
      if (response.status === 200) {
        const agendamentosAtualizados = agendamentos.map((agendamento) =>
          agendamento.id === agendamentoSelecionado
            ? { ...agendamento, statusSessao: "CANCELADA" }
            : agendamento
        );
        setAgendamentos(agendamentosAtualizados);
        setMostrarPopup(false);
        responseMessage("Agendamento cancelado com sucesso!");
      } else {
        errorMessage("Erro ao atualizar o agendamento no backend.");
      }
    } catch (erro) {
      errorMessage(`Erro ao cancelar o agendamento: ${erro.message}`);
    }
  };

  const confirmarAgendamento = async () => {
    try {

      const novoAgendamento = {
        fkPaciente: {
          id: Number(idUsuario),
        },
        data: formatarData(dataSelecionada), // yyyy-MM-dd
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
      errorMessage(`Erro ao realizar o agendamento: ${erro.message}`);
    }
  };

  useEffect(() => {
    buscarAgendamentos();
  }, []);

  useEffect(() => {
    console.log("Estado atualizado de horários:", horariosDisponiveis);
  }, [horariosDisponiveis]);

  const handleDiaSemanaChange = (e) => {
    const selectedDiaSemana = parseInt(e.target.value, 10);
    setDiaSemana(selectedDiaSemana);

    const diasDoMesAtualizados = getDiasDoMesPorDiaSemana(selectedDiaSemana);
    setDiasDoMes(diasDoMesAtualizados);
    setDataSelecionada(diasDoMesAtualizados[0]); // Seleciona o primeiro por padrão
    setHorariosDisponiveis([]); // Limpa os horários disponíveis
  };

  const handleDataChange = async (e) => {
    const selectedData = e.target.value;
    setDataSelecionada(selectedData);

    // Dispara a busca de horários disponíveis
    await buscarHorariosLocal(selectedData);
  };

  return (
    <>
      <HeaderDash showSettingsIcon={true} />
      <div className={styles.containerPrincipal}>
        <div className={styles.header}>
          <h1>Meus agendamentos</h1>
          <button
            className={styles.agendarButton}
            type="button"
            onClick={mostrarPopupAgendar}
          >
            + Quero Agendar
          </button>
        </div>
        <div className={styles.agendamentosContainer}>
          {agendamentos.length > 0 ? (
            agendamentos.map((agendamento, index) => (
              <div
                key={`${agendamento.id}-${index}`}
                className={styles.agendamentoItem}
              >
                <div className={styles.info}>
                  <p>
                    <b>Dia:</b> {agendamento.data}
                  </p>
                  <p>
                    <b>Horário:</b> {agendamento.hora}
                  </p>
                  <p>
                    <b>Local:</b> {agendamento.local}
                  </p>
                </div>
                <div className={styles.status}>
                  {agendamento.statusSessao === "CANCELADA" && (
                    <span className={styles.cancelado}>Cancelado</span>
                  )}
                  {agendamento.statusSessao === "CONFIRMADA" && (
                    <span className={styles.confirmado}>Concluído</span>
                  )}
                  {agendamento.statusSessao === "PENDENTE" && (
                    <>
                      <span className={styles.pendente}>Agendado</span>
                      <button
                        type="button"
                        className={styles.cancelarButton}
                        onClick={() => cancelarAgendamento(agendamento.id)}
                      >
                        Cancelar Agendamento
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum agendamento encontrado.</p>
          )}
        </div>
      </div>
      {mostrarPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>Confirmar Cancelamento</h2>
            <p>Tem certeza de que deseja cancelar este agendamento?</p>
            <div className={styles.popupActions}>
              <button
                className={styles.confirmButton}
                onClick={confirmarCancelamento}
              >
                SIM
              </button>
              <button className={styles.cancelButton} onClick={fecharPopup}>
                NÃO
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
                onChange={handleDataChange} // Chama a função para buscar horários
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
                  horariosDisponiveis.map((horario, index) => {
                    console.log("Renderizando horário:", horario);
                    return (
                      <option key={index} value={horario}>
                        {horario}
                      </option>
                    );
                  })
                ) : (
                  <option value="" disabled>
                    Nenhum horário disponível
                  </option>
                )}
              </select>
            </div>
            <div className={styles.popupActions}>
              <button
                className={styles.confirmButton}
                onClick={confirmarAgendamento}
              >
                Agendar Consulta
              </button>
              <button
                className={styles.cancelButton}
                onClick={fecharPopupAgendar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
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

export default MeusAgendamentos;
