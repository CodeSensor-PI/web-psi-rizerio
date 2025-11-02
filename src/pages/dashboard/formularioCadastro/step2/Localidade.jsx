import styles from './localidade.module.css';
import HeaderDash from '../../../../components/headerDash/HeaderDashComponent';
import MainComponent from '../../../../components/main/MainComponent';
import Input from '../../../../components/inputs/InputComponent';
import StepComponent from '../../../../components/steps/StepComponent';
import BotaoSalvar from '../../../../components/botaoSalvar/BotaoSalvarComponent'
import { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { errorMessage } from "../../../../utils/alert";
import { buscarEnderecoPorCep } from '../../../../provider/api';
import Loading from '../../../../components/loading/Loading';


function useIsMobile(breakpoint = 1100) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);

    return isMobile;
}

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
    const isMobile = useIsMobile();

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
            <HeaderDash showSettingsIcon={false} telaAtual={'localidade'} />
            {loading ? (
                <Loading />
            ) :
                <form onSubmit={salvarInformacoes} className={styles.localidade}>
                    <StepComponent stepAtual={2} />
                    <MainComponent stepAtual={2} showBackItem={true} tituloPagina="Onde você mora?">
                        <div className={styles.inputs_content_localidade}>
                            <div className={styles.input_group}>
                                <Input
                                    name="cep"
                                    value={cep}
                                    width={isMobile ? "w-[90%]" : "w-[35%]"}
                                    fontSize={isMobile ? "1rem" : "1.2rem"}
                                    height="h-[100%]"
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
                                    width={isMobile ? "w-[90%]" : "w-[60%]"}
                                    fontSize={isMobile ? "1rem" : "1.2rem"}
                                    height="h-[100%]"
                                    label="Logradouro"
                                    type="text"
                                    onChange={(e) => setLogradouro(e.target.value)}
                                    placeholder="Ex. Rua, Avenida, Estrada"
                                    required={true}
                                />
                                
                                <Input
                                    name="cidade"
                                    value={cidade}
                                    width={isMobile ? "w-[90%]" : "w-[40%]"}
                                    fontSize={isMobile ? "1rem" : "1.2rem"}
                                    label="Cidade"
                                    type="text"
                                    onChange={(e) => setCidade(e.target.value)}
                                    placeholder="Ex. São Paulo"
                                    required={true}
                                />
                                
                                <Input
                                    name="bairro"
                                    value={bairro}
                                    width={isMobile ? "w-[90%]" : "w-[30%]"}
                                    fontSize={isMobile ? "1rem" : "1.2rem"}
                                    label="Bairro"
                                    type="text"
                                    onChange={(e) => setBairro(e.target.value)}
                                    placeholder="Ex. Paulista"
                                    required={true}
                                />
                                <Input
                                    name="estado"
                                    value={estado}
                                    width={isMobile ? "w-[90%]" : "w-[20%]"}
                                    fontSize={isMobile ? "1rem" : "1.2rem"}
                                    label="Estado"
                                    type="text"
                                    onChange={(e) => setEstado(e.target.value)}
                                    placeholder="Ex. SP"
                                    required={true}
                                />
                                <Input
                                    name="numero"
                                    width={isMobile ? "w-[90%]" : "w-[20%]"}
                                    fontSize={isMobile ? "1rem" : "1.2rem"}
                                    label="Número"
                                    type="text"
                                    onChange={(e) => setNumero(e.target.value)}
                                    placeholder="Ex. 123"
                                    max="5"
                                    required={true}
                                />
                                <Input
                                    name="complemento"
                                    width={isMobile ? "w-[90%]" : "w-[70%]"}
                                    fontSize={isMobile ? "1rem" : "1.2rem"}
                                    label="Complemento"
                                    type="text"
                                    onChange={(e) => setComplemento(e.target.value)}
                                    placeholder="Ex. Apto 123"
                                    required={false}
                                />
                            </div>
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