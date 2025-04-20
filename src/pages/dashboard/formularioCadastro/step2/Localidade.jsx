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


const Localidade = () => {

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
        }
    }

    function salvarInformacoes() {

        if (!cep || !logradouro || !bairro || !cidade || !estado || !numero) {
            errorMessage("Preencha todos os campos para prosseguir.")
            return
        }
        navigate('/forms/contato')
    }

    return (
        <>
            <HeaderDash showSettingsIcon={false} />
            <section className={styles.localidade}>
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
                        />
                        <Input
                            name="logradouro"
                            value={logradouro}
                            width="w-[35%]"
                            label="Logradouro"
                            type="text"
                            onChange={(e) => setLogradouro(e.target.value)}
                            placeholder="Rua, Avenida, Estrada"
                        />
                        <Input
                            name="bairro"
                            value={bairro}
                            width="w-[20%]"
                            label="Bairro"
                            type="text"
                            onChange={(e) => setBairro(e.target.value)}
                            placeholder="Insira seu bairro"
                        />
                        <Input
                            name="cidade"
                            value={cidade}
                            width="w-[23%]"
                            label="Cidade"
                            type="text"
                            onChange={(e) => setCidade(e.target.value)}
                            placeholder="Insira sua cidade"
                        />
                        <Input
                            name="estado"
                            value={estado}
                            width="w-[20%]"
                            label="Estado"
                            type="text"
                            onChange={(e) => setEstado(e.target.value)}
                            placeholder="Insira seu estado"
                        />
                        <Input
                            name="numero"
                            width="w-[25%]"
                            label="Número"
                            type="number"
                            onChange={(e) => setNumero(e.target.value)}
                            placeholder="Insira o número"
                        />
                        <Input
                            name="complemento"
                            width="w-[30%]"
                            label="Complemento"
                            type="text"
                            onChange={(e) => setComplemento(e.target.value)}
                            placeholder="Insira o complemento"
                        />
                    </div>
                    {erro && <p className='text-red-500'>{erro}</p>}
                    <br />
                    <div className={styles.div_botao}>
                        <BotaoSalvar
                            texto="Salvar e Continuar"
                            onClick={salvarInformacoes}
                        />
                    </div>
                </MainComponent>

            </section>
        </>
    );
};

export default Localidade;