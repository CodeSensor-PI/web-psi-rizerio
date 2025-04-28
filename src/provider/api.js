import axios from "axios";

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
    const response = await axios.get("http://localhost:8080/planos");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os planos:", error.message);
    throw error;
  }
};

export const visualizarAgendamentos = async (idUsuario) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/sessao?idUsuario=${idUsuario}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os agendamentos:", error.message);
    throw error;
  }
};

export const atualizarAgendamento = async (idAgendamento, dadosAtualizados) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/sessao/${idAgendamento}`,
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
    const response = await axios.get(
      `http://localhost:3000/sessao/${idAgendamento}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o agendamento por ID:", error.message);
    throw error;
  }
};
