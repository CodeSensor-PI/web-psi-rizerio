import axios from "axios";
import baseApi from "./baseApi";

/**
 * @param {string | number} idPaciente
 * @returns {Promise}
 */
export const buscarPacientePorId = async (idPaciente) => {
  try {
    const response = await baseApi.get(`/pacientes/${idPaciente}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar paciente por ID:", error.message);
    throw error;
  }
};

/**
 * @param {string} id
 * @param {string} senhaAtual
 * @param {string} novaSenha
 * @returns {Promise}
 */
export const alterarSenha = async (id, senhaAtual, novaSenha) => {
  try {
    const response = await baseApi.put(`/pacientes/${id}/alterar-senha`, {
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
    const response = await baseApi.get(`/planos`);
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
    const response = await baseApi.get(`/sessoes/pacientes/${idPaciente}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os agendamentos:", error.message);
    throw error;
  }
};

export const atualizarAgendamento = async (idAgendamento, dadosAtualizados) => {
  try {
    const response = await baseApi.put(
      `/sessoes/${idAgendamento}`,
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
    const response = await baseApi.get(`/sessoes/${idAgendamento}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o agendamento por ID:", error.message);
    throw error;
  }
};

/**
 * @param {object} endereco
 * @returns {promise}
 */
export const cadastrarEndereco = async (endereco) => {
  try {
    const response = await baseApi.post(`/enderecos`, endereco);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar endereço: ", error.message);
    throw error;
  }
};

/**
 * @param {string} cep
 * @param {string} numero
 * @returns {promise}
 */
export const buscarEnderecoPorCepNumero = async (cep, numero) => {
  try {
    const response = await baseApi.get(
      `/enderecos/encontrarEndereco?cep=${cep}&numero=${numero}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao criar endereço: ", error.message);
    throw error;
  }
};

/**
 * @param {string} idPaciente
 * @param {object} telefone
 * @returns {promise}
 */
export const cadastrarTelefone = async (telefone) => {
  try {
    const response = await baseApi.post(`/telefones`, telefone);
    response.data;
  } catch (error) {
    console.error("Erro ao cadastrar telefone: ", telefone);
    throw error;
  }
};

/**
 * @param {string | number} idPaciente
 * @returns {Promise}
 */
export const buscarTelefonePorIdPaciente = async (idPaciente) => {
  try {
    const response = await baseApi.get(`/telefones/pacientes/${idPaciente}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar telefone por ID do paciente:".error.message);
    throw error;
  }
};

/**
 * @param {string} idUsuario
 * @param {object} dadosPessoais
 * @returns {Promise}
 */
export const atualizarUsuario = async (idUsuario, dadosPessoais) => {
  try {
    const response = await baseApi.put(
      `/pacientes/primeiroLogin/${idUsuario}`,
      dadosPessoais
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar o usuário:", error.message);
    throw error;
  }
};

/**
 * @param {string} idUsuario
 */
export const getPreferenciasPorId = async (idUsuario) => {
  try {
    const response = await baseApi.get(`/preferencias/${idUsuario}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao encontrar preferencias:", error);
    throw error;
  }
};

/**
 * @param {string} idUsuario
 * @param {object} dados
 * @returns {Promise}
 */
export const atualizarDados = async (idUsuario, dados) => {
  try {
    const response = await baseApi.put(`/pacientes/${idUsuario}`, dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar o usuário:", error.message);
    throw error;
  }
};

/**
 * @param {string} idEndereco
 * @param {object} endereco
 * @returns {Promise}
 */
export const atualizarEndereco = async (idEndereco, endereco) => {
  try {
    const response = await baseApi.put(`/enderecos/${idEndereco}`, endereco);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar o usuário:", error.message);
    throw error;
  }
};

/**
 * @param {string} idTelefone
 * @param {object} telefone
 * @returns {Promise}
 */
export const atualizarTelefone = async (idTelefone, telefone) => {
  try {
    const response = await baseApi.put(`/telefones/${idTelefone}`, telefone);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar o usuário:", error.message);
    throw error;
  }
};

export const buscarHorariosDisponiveis = async (data, hora, hora2) => {
  try {
    const response = await baseApi.get(
      `http://localhost:8080/sessoes/horarios`,
      {
        params: { data, hora, hora2 },
      }
    );
    console.log("Resposta do backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os horários disponíveis:", error.message);
    throw error;
  }
};

export const postAgendamento = async (agendamento) => {
  try {
    const response = await baseApi.post("/sessoes", agendamento, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    throw error;
  }
};

/**
 * Upload de foto do paciente para S3
 * @param {string | number} id - ID do paciente
 * @param {File} arquivo - Arquivo de imagem
 * @returns {Promise}
 */
export const uploadFotoPaciente = async (id, arquivo) => {
  try {
    const formData = new FormData();
    formData.append('imagem', arquivo);

    const response = await baseApi.post(`/pacientes/${id}/imagem`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer upload da foto:", error);
    throw error;
  }
};

/**
 * Realiza logout do usuário removendo o cookie JWT
 * @returns {Promise}
 */
export const logout = async () => {
  try {
    const response = await baseApi.post('/auth/logout');
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    throw error;
  }
};
