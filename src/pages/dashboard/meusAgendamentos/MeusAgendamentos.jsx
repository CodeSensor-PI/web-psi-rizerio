import React, { useState, useEffect } from "react";
import {
  visualizarAgendamentos,
  atualizarAgendamento,
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

  const [dataEscolhida, setDataEscolhida] = useState("");
  const [horaEscolhida, setHoraEscolhida] = useState("");
  const [diasDisponiveis, setDiasDisponiveis] = useState([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [tipoConsulta, setTipoConsulta] = useState("avulso"); 

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

  const buscarDiasDisponiveis = () => {
    const hoje = new Date();
    const dias = [];
    const qtdDias = 7; // Exibir os próximos 7 dias

    for (let i = 0; i < qtdDias; i++) {
      const proximoDia = new Date(hoje);
      proximoDia.setDate(hoje.getDate() + i);
      dias.push(
        proximoDia.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );
    }

    setDiasDisponiveis(dias);
  };

  const buscarHorariosDisponiveis = async (data) => {
    try {
      // Converte a data para o formato ISO (YYYY-MM-DD)
      const [dia, mes, ano] = data.split("/");
      const dataISO = `${ano}-${mes}-${dia}`;

      const response = await fetch(`/sessoes/horarios-disponiveis?data=${dataISO}`);
      if (response.ok) {
        const horarios = await response.json();
        setHorariosDisponiveis(horarios);
      } else {
        errorMessage("Erro ao buscar horários disponíveis.");
      }
    } catch (error) {
      console.error("Erro ao buscar horários disponíveis:", error);
      errorMessage("Erro ao carregar os horários disponíveis.");
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
    buscarDiasDisponiveis();
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
        idUsuario,
        data: dataEscolhida,
        hora: horaEscolhida,
        tipoConsulta: tipoConsulta,
        statusSessao: "PENDENTE",
      };

      const response = await atualizarAgendamento(null, novoAgendamento); 

      if (response.status === 201) {
        setAgendamentos([...agendamentos, { ...novoAgendamento, id: response.data.id }]);
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
            <h2>Agendar</h2>
            <p>Selecione a data, horário e tipo de consulta desejados.</p>
            <div className={styles.inputContainer}>
              <label htmlFor="data">Data:</label>
              <select
                id="data"
                value={dataEscolhida}
                onChange={(e) => {
                  setDataEscolhida(e.target.value);
                  buscarHorariosDisponiveis(e.target.value);
                }}
              >
                <option value="" disabled>
                  Selecione uma data
                </option>
                {diasDisponiveis.map((dia, index) => (
                  <option key={index} value={dia}>
                    {dia}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="hora">Hora:</label>
              <select
                id="hora"
                value={horaEscolhida}
                onChange={(e) => setHoraEscolhida(e.target.value)}
                disabled={!dataEscolhida}
              >
                <option value="" disabled>
                  Selecione um horário
                </option>
                {horariosDisponiveis.map((hora, index) => (
                  <option key={index} value={hora}>
                    {hora}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="tipoConsulta">Tipo de Consulta:</label>
              <select
                id="tipoConsulta"
                value={tipoConsulta}
                onChange={(e) => setTipoConsulta(e.target.value)}
              >
                <option value="avulso">Avulso</option>
                <option value="mensal">Mensal</option>
              </select>
            </div>
            <div className={styles.popupActions}>
              <button
                className={styles.confirmButton}
                onClick={confirmarAgendamento}
                disabled={!dataEscolhida || !horaEscolhida}
              >
                Confirmar
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

export default MeusAgendamentos;
