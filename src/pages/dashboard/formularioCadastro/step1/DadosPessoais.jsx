import HeaderDash from '../../../../components/headerDash/HeaderDashComponent'
import StepComponent from '../../../../components/steps/StepComponent'
import MainComponent from '../../../../components/main/MainComponent'
import styles from './dadosPessoais.module.css'
import Input from '../../../../components/inputs/InputComponent'
import BotaoSalvar from '../../../../components/botaoSalvar/BotaoSalvarComponent'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { errorMessage } from "../../../../utils/alert";
import { validarCpf } from '../../../../provider/api'

const DadosPessoais = () => {

    const [data, setData] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cpf, setCpf] = useState('')
    const [cpfExistente, setCpfExistente] = useState(true)
    const navigate = useNavigate()

    const handleTelefoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        const formattedValue = value
            .replace(/^(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 15);
        setTelefone(formattedValue);
    };

    const handleCpfChange = async (e) => {
        const value = e.target.value.replace(/\D/g, '');
        const limitedValue = value.slice(0, 11);
        const formattedValue = limitedValue
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        setCpf(formattedValue);
        
        if (limitedValue.length === 11) {
            try {
                const cpfEnviado = await validarCpf(limitedValue);
                console.log('CPF existe?: ', cpfEnviado);
                if (cpfEnviado === true || cpfEnviado.exists === true) {
                    setCpfExistente(true);
                } else {
                    setCpfExistente(false);
                }
            } catch (error) {
                console.error("Erro ao validar CPF:", error);
                setCpfExistente(false);
            }
        } else {
            setCpfExistente(false);
        }
    };

    const handleKeyPress = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };

    function salvarInformacoes(e) {
        e.preventDefault();

        const telefoneNumeros = telefone.replace(/\D/g, '');
        const ddd = telefoneNumeros.slice(0, 2);
        const numero = telefoneNumeros.slice(2);
        const cpfNumeros = cpf.replace(/\D/g, '');

        if (!data || telefoneNumeros.length !== 11 || cpfNumeros.length !== 11) {
            errorMessage("Preencha todos os campos para prosseguir.")
            return
        }

        localStorage.setItem('dadosPessoais', JSON.stringify({
            dataNasc: data,
            cpf: cpfNumeros,
            ddd: ddd,
            nomeContato: localStorage.getItem('nomeUsuario'),
            telefonePaciente: numero,
            tipo: "PESSOAL",
            fkPaciente: localStorage.getItem('idUsuario')
        }));

        navigate('/dashboard/forms/localidade')
    }

    return (
        <>
            <HeaderDash showSettingsIcon={false} telaAtual={"dados-pessoais"} limitMenuOptions={true} />
            <form onSubmit={salvarInformacoes} className={styles.dados_pessoais}>
                <StepComponent stepAtual={1} />
                <MainComponent stepAtual={1} showBackItem={false}>
                    <div className={styles.inputs_content_dados}>
                        <Input className="flex-col"
                            name="data"
                            width="w-[100%]"
                            label="Quando você nasceu?"
                            type="date"
                            onChange={(e) => setData(e.target.value)}
                            placeholder="DD/MM/AAAA"
                            max='9999-12-31'
                            required={true}
                        />
                        <Input className="flex-col"
                            name="telefone"
                            label="Qual o seu telefone?"
                            type="tel"
                            width="w-[100%]"
                            value={telefone}
                            onChange={handleTelefoneChange}
                            onKeyUp={handleKeyPress}
                            placeholder="(00)00000-0000"
                            required={true}
                        />
                        <Input className="flex-col"
                            name="cpf"
                            label="Qual o seu CPF?"
                            type="text"
                            width="w-[100%]"
                            value={cpf}
                            onChange={handleCpfChange}
                            onKeyUp={handleKeyPress}
                            placeholder="000.000.000-00"
                            required={true}
                        />
                        {cpfExistente && <p className='text-red-500 text-sm mt-1'>CPF já existente!</p>}
                    </div>
                    <div className={styles.div_botao}>
                        <BotaoSalvar
                            texto="Salvar e Continuar"
                            type="submit"
                            onSubmit={salvarInformacoes}
                            disabled={cpfExistente}
                        />
                    </div>
                </MainComponent>

            </form>
        </>
    )
}

export default DadosPessoais