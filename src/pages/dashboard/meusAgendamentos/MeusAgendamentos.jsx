import React, { useState, useEffect } from 'react';
import { visualizarAgendamentos, atualizarAgendamento } from '../../../provider/api';
import HeaderDash from '../../../components/headerDash/HeaderDashComponent';
import styles from './meusAgendamentos.module.css';
import { errorMessage, responseMessage } from "../../../utils/alert";

const MeusAgendamentos = () => {
    const [agendamentos, setAgendamentos] = useState([]);
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
    const idUsuario = "101"; 

    const buscarAgendamentos = async () => {
        try {
            const dados = await visualizarAgendamentos(idUsuario);
            setAgendamentos(dados);
        } catch (erro) {
            errorMessage(`Erro ao buscar os agendamentos: ${erro.message}`);
        }
    };

    const cancelarAgendamento = (idAgendamento) => {
        setAgendamentoSelecionado(idAgendamento);
        setMostrarPopup(true);
    };

    const confirmarCancelamento = async (event) => {
        event.preventDefault();
        try {
            const response = await atualizarAgendamento(agendamentoSelecionado, { statusSessao: 'CANCELADA' });
            if (response.status === 200) {
                const agendamentosAtualizados = agendamentos.map((agendamento) =>
                    agendamento.id === agendamentoSelecionado
                        ? { ...agendamento, statusSessao: 'CANCELADA' }
                        : agendamento
                );
                setAgendamentos(agendamentosAtualizados);
                setMostrarPopup(false);
                responseMessage('Agendamento cancelado com sucesso!');
            } else {
                errorMessage('Erro ao atualizar o agendamento no backend.');
            }
        } catch (erro) {
            errorMessage(`Erro ao cancelar o agendamento: ${erro.message}`);
        }
    };

    const fecharPopup = () => {
        setMostrarPopup(false);
    };

    useEffect(() => {
        buscarAgendamentos();
    }, []);

    return (
        <>
            <HeaderDash />
            <div className={styles.containerPrincipal}>
                <div className={styles.header}>
                    <h1>Meus agendamentos</h1>
                    <button className={styles.agendarButton}>+ Quero Agendar</button>
                </div>
                <div className={styles.agendamentosContainer}>
                    {agendamentos.length > 0 ? (
                        agendamentos.map((agendamento, index) => (
                            <div key={`${agendamento.id}-${index}`} className={styles.agendamentoItem}>
                                <div className={styles.info}>
                                    <p><b>Dia:</b> {agendamento.data}</p>
                                    <p><b>Horário:</b> {agendamento.hora}</p>
                                    <p><b>Local:</b> {agendamento.local}</p>
                                </div>
                                <div className={styles.status}>
                                    {agendamento.statusSessao === 'CANCELADA' && (
                                        <span className={styles.cancelado}>Cancelado</span>
                                    )}
                                    {agendamento.statusSessao === 'CONFIRMADA' && (
                                        <span className={styles.confirmado}>Concluído</span>
                                    )}
                                    {agendamento.statusSessao === 'PENDENTE' && (
                                        <>
                                            <span className={styles.pendente}>Agendado</span>
                                            <button
                                                type='button'
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
                            <button className={styles.confirmButton} onClick={confirmarCancelamento}>
                                SIM
                            </button>
                            <button className={styles.cancelButton} onClick={fecharPopup}>
                                NÃO
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MeusAgendamentos;