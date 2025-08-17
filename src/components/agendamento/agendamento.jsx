import React from "react";
import styles from "./agendamento.module.css";
import { IoTrashBinOutline } from "react-icons/io5";

const Agendamento = ({ agendamento, onCancelar }) => {
    // Converte data yyyy-MM-dd para dd/MM/yyyy
    const formatarDataPtBr = (dataIso) => {
        if (!dataIso) return "";
        const [ano, mes, dia] = dataIso.split("-");
        return `${dia}/${mes}/${ano}`;
    };

    return (
        <div className={styles.agendamentoItem}>
            <div className={styles.info}>
                <div className={styles.dataHora}>
                    <p>
                        <b>Dia:</b> {formatarDataPtBr(agendamento.data)}
                    </p>
                    <p>
                        <b>Horário:</b> {agendamento.hora}
                    </p>
                </div>
                <p>
                    <b>Link:</b> {agendamento.local}
                </p>
            </div>
            <div className={styles.status}>
                {agendamento.statusSessao === "CANCELADA" && (
                    <span className={styles.cancelado}>Cancelado</span>
                )}
                {agendamento.statusSessao === "CONFIRMADA" && (
                    <span className={styles.confirmado}>Confirmada</span>
                )}
                {agendamento.statusSessao === "CONCLUIDA" && (
                    <span className={styles.confirmado}>Concluído</span>
                )}
                {agendamento.statusSessao === "PENDENTE" && (
                    <>
                        <span className={styles.pendente}>Agendado</span>
                        <button
                            type="button"
                            className={styles.cancelarButton}
                            onClick={() => onCancelar(agendamento.id)}
                            title="Cancelar Agendamento"
                        >
                            <IoTrashBinOutline size={24} />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Agendamento;
