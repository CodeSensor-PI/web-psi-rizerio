import React, { useState, useEffect } from "react";
import {
  visualizarAgendamentos,
  atualizarAgendamento,
} from "../../../provider/api";
import HeaderDash from "../../../components/headerDash/HeaderDashComponent";
import Loading from "../../../components/loading/Loading";
import styles from "./meusAgendamentos.module.css";
import { errorMessage, responseMessage } from "../../../utils/alert";

const MeusAgendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
  const idUsuario = localStorage.getItem("idUsuario");

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

  return (
    <>
      <HeaderDash showSettingsIcon={true} />
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.containerPrincipal}>
          <div className={styles.header}>
            <h1>Meus agendamentos</h1>
            <button className={styles.agendarButton} type="button">
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
                      <span className={styles.confirmado}>Confirmado</span>
                    )}
                    {agendamento.statusSessao === "CONCLUIDA" && (
                      <span className={styles.concluida}>Concluído</span>
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
      )}
    </>
  );
};

export default MeusAgendamentos;
