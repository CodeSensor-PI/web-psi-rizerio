import axios from "axios";

export const buscarEnderecoPorCep = async (cep) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

        if (response.data.erro) {
            throw new Error('CEP não encontrado.');
        }
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar o endereço:', error.message);
        throw error;
    }

};