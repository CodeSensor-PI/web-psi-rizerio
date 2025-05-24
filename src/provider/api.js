import axios from "axios";

/**
 * @param {string | number} idPaciente
 * @returns {Promise}
 */
export const buscarPacientePorId = async (idPaciente) => {
  try {
    const response = await axios.get(`/pacientes/${idPaciente}`)
    return response.data
  } catch (error) {
    console.error("Erro ao buscar paciente por ID:". error.message)
    throw error;
  }
}

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
    const response = await axios.patch(
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
    const response = await axios.get(`/sessoes/${idAgendamento}`);
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
    const response = await axios.post(`/enderecos`, endereco)
    return response.data;
  } catch (error) {
    console.error("Erro ao criar endereço: ", error.message)
    throw error;
  }
};

// /**
//  * @param {string} idPaciente
//  * @param {object} endereco
//  * @returns {promise}
//  */
// export const buscarEnderecos = async (endereco) => {
//   try {
//     const response = await axios.post(`/enderecos`, endereco)
//     return response.data;
//   } catch (error) {
//     console.error("Erro ao criar endereço: ", error.message)
//     throw error;
//   }
// };

/**
 * @param {string} idPaciente
 * @param {object} telefone
 * @returns {promise}
 */
export const cadastrarTelefone = async (telefone) => {
  try {
    const response = await axios.post(`/telefones`, telefone)
    response.data
  } catch (error) {
    console.error("Erro ao cadastrar telefone: ", telefone)
    throw error
  }
}

/**
 * @param {string} idUsuario
 * @param {object} dadosPessoais
 * @returns {Promise}
 */
export const atualizarUsuario = async (idUsuario, dadosPessoais) => {
  try {
    const response = await axios.put(`/pacientes/primeiroLogin/${idUsuario}`, dadosPessoais);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar o usuário:", error.message);
    throw error;
  }
};
