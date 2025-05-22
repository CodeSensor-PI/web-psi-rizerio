import axios from "axios";

/**
 * @param {string} id
 * @param {string} senhaAtual
 * @param {string} novaSenha
 * @returns {Promise}
 */
export const alterarSenha = async (id, senhaAtual, novaSenha) => {
  try {
    const response = await axios.put(`/pacientes/${id}/alterar-senha`, {
      senha: senhaAtual,
      novaSenha,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao alterar a senha:", error);
    throw error;
  }
};

export const buscarEnderecoPorCep = async (cep) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (response.data.erro) {
      throw new Error("CEP não encontrado.");
    }
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o endereço:", error.message);
    throw error;
  }
};

export const buscarPlanos = async () => {
  try {
    const response = await axios.get(`/planos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os planos:", error.message);
    throw error;
  }
};

/**
 * @param {string} idPaciente
 * @returns {Promise}
 */
export const visualizarAgendamentos = async (idPaciente) => {
  try {
    const response = await axios.get(`/sessoes/pacientes/${idPaciente}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os agendamentos:", error.message);
    throw error;
  }
};

export const atualizarAgendamento = async (idAgendamento, dadosAtualizados) => {
  try {
    const response = await axios.put(
      `/sessoes/cancelar/${idAgendamento}`,
      dadosAtualizados
    );
    return response;
  } catch (error) {
    console.error("Erro ao atualizar o agendamento:", error.message);
    throw error;
  }
};  

export const buscarAgendamentoPorId = async (idAgendamento) => {
  try {
    const response = await axios.get(`/sessoes/${idAgendamento}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o agendamento por ID:", error.message);
    throw error;
  }
};


export const buscarHorariosDisponiveis = async (data, horaInicio, horaFim) => {
  try {
    const response = await axios.get(`http://localhost:8080/sessoes/disponibilidade`, {
      params: { data, horaInicio, horaFim },
    });
    console.log("Resposta do backend:", response.data); // Verifica o que o backend está retornando
    return response.data; // Retorna os horários disponíveis
  } catch (error) {
    console.error("Erro ao buscar os horários disponíveis:", error.message);
    throw error;
  }
};
