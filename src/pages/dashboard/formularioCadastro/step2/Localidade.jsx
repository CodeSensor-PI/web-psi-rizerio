import styles from './localidade.module.css';
import HeaderDash from '../../../../components/headerDash/HeaderDashComponent';
import MainComponent from '../../../../components/main/MainComponent';
import Input from '../../../../components/inputs/InputComponent';
import StepComponent from '../../../../components/steps/StepComponent';
import BotaoSalvar from '../../../../components/botaoSalvar/BotaoSalvarComponent'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { errorMessage } from "../../../../utils/alert";
import { buscarEnderecoPorCep } from '../../../../provider/api';
import Loading from '../../../../components/loading/Loading';

const Localidade = () => {

    const [loading, setLoading] = useState(false);
    const [cep, setCep] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')
    const [erro, setErro] = useState('')
    const navigate = useNavigate()

    const handleCepChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        const formattedValue = value
            .replace(/^(\d{5})(\d)/, '$1-$2')
            .slice(0, 9);
        setCep(formattedValue);
    }

    function limparCampos() {
        setCep('')
        setLogradouro('')
        setBairro('')
        setCidade('')
        setEstado('')
        setNumero('')
        setComplemento('')
        setErro('')
    }

    const handleBuscarEndereco = async () => {
        try {
            setLoading(true);
            setErro('');
            const cepSemFormatacao = cep.replace(/\D/g, '');

            if (cepSemFormatacao.length !== 8) {
                throw new Error('Formato de CEP inválido.');
            }

            const endereco = await buscarEnderecoPorCep(cepSemFormatacao);
            setLogradouro(endereco.logradouro || '');
            setBairro(endereco.bairro || '');
            setCidade(endereco.localidade || '');
            setEstado(endereco.uf || '');
        } catch (error) {
            limparCampos()
            setErro(error.message || 'CEP não encontrado.');
            return
        } finally {
            setTimeout(() => setLoading(false), 500)
        }
    }

    function salvarInformacoes(e) {
        e.preventDefault();

        if (!cep || !logradouro || !bairro || !cidade || !estado || !numero) {
            errorMessage("Preencha todos os campos para prosseguir.")
            return
        }

        localStorage.setItem('endereco', JSON.stringify({
            cep: cep.replace(/\D/g, ''),
            logradouro,
            bairro,
            numero,
            cidade,
            uf: estado,
        }));

        navigate('/dashboard/forms/contato')
    }

    return (
        <>
            <HeaderDash showSettingsIcon={false} />
            {loading ? (
                <Loading />
            ) :
                <form onSubmit={salvarInformacoes} className={styles.localidade}>
                    <StepComponent stepAtual={2} />
                    <MainComponent stepAtual={2} showBackItem={true}>
                        <div className={styles.inputs_content_localidade}>
                            <Input
                                name="cep"
                                value={cep}
                                width="w-[15%]"
                                label="CEP"
                                type="text"
                                onChange={handleCepChange}
                                onBlur={handleBuscarEndereco}
                                placeholder="00000-000"
                                required={true}
                            />
                            <Input
                                name="logradouro"
                                value={logradouro}
                                width="w-[35%]"
                                label="Logradouro"
                                type="text"
                                onChange={(e) => setLogradouro(e.target.value)}
                                placeholder="Rua, Avenida, Estrada"
                                required={true}

                            />
                            <Input
                                name="bairro"
                                value={bairro}
                                width="w-[20%]"
                                label="Bairro"
                                type="text"
                                onChange={(e) => setBairro(e.target.value)}
                                placeholder="Insira seu bairro"
                                required={true}
                            />
                            <Input
                                name="cidade"
                                value={cidade}
                                width="w-[23%]"
                                label="Cidade"
                                type="text"
                                onChange={(e) => setCidade(e.target.value)}
                                placeholder="Insira sua cidade"
                                required={true}
                            />
                            <Input
                                name="estado"
                                value={estado}
                                width="w-[20%]"
                                label="Estado"
                                type="text"
                                onChange={(e) => setEstado(e.target.value)}
                                placeholder="Insira seu estado"
                                required={true}
                            />
                            <Input
                                name="numero"
                                width="w-[25%]"
                                label="Número"
                                type="text"
                                onChange={(e) => setNumero(e.target.value)}
                                placeholder="Insira o número"
                                max="5"
                                required={true}
                            />
                            <Input
                                name="complemento"
                                width="w-[30%]"
                                label="Complemento"
                                type="text"
                                onChange={(e) => setComplemento(e.target.value)}
                                placeholder="Insira o complemento"
                                required={false}
                            />
                        </div>
                        {erro && <p className='text-red-500'>{erro}</p>}
                        <br />
                        <div className={styles.div_botao}>
                            <BotaoSalvar
                                texto="Salvar e Continuar"
                                type="submit"
                                onSubmit={salvarInformacoes}
                            />
                        </div>
                    </MainComponent>

                </form>
            }
        </>
    )
}

export default Localidade;