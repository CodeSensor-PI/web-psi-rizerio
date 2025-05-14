import HeaderDash from '../../../../components/headerDash/HeaderDashComponent'
import StepComponent from '../../../../components/steps/StepComponent'
import MainComponent from '../../../../components/main/MainComponent'
import styles from './dadosPessoais.module.css'
import Input from '../../../../components/inputs/InputComponent'
import BotaoSalvar from '../../../../components/botaoSalvar/BotaoSalvarComponent'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { errorMessage } from "../../../../utils/alert";
import { salvarDadosFormulario } from '../../../../utils/formStorage'

const DadosPessoais = () => {

    const [data, setData] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cpf, setCpf] = useState('')
    const navigate = useNavigate()

    const handleTelefoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        const formattedValue = value
            .replace(/^(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 15);
        setTelefone(formattedValue);
    };

    const handleCpfChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        const limitedValue = value.slice(0, 11);
        const formattedValue = limitedValue
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        setCpf(formattedValue);

    };

    const handleKeyPress = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };

    function salvarInformacoes(e) {
        e.preventDefault();

        const telefoneNumeros = telefone.replace(/\D/g, '');
        const cpfNumeros = cpf.replace(/\D/g, '');

        if (!data || telefoneNumeros.length !== 11 || cpfNumeros.length !== 11) {
            errorMessage("Preencha todos os campos para prosseguir.")
            return
        }

        salvarDadosFormulario('dados-pessoais', {
            data: data,
            telefone: telefoneNumeros,
            cpf: cpfNumeros
        })

        navigate('/dashboard/forms/localidade')
    }

    return (
        <>
            <HeaderDash showSettingsIcon={false} />
            <form onSubmit={salvarInformacoes} className={styles.dados_pessoais}>
                <StepComponent stepAtual={1} />
                <MainComponent stepAtual={1} showBackItem={false}>
                    <div className={styles.inputs_content_dados}>
                        <Input className="flex-col"
                            name="data"
                            height="h-[50%]"
                            label="Quando você nasceu"
                            type="date"
                            onChange={(e) => setData(e.target.value)}
                            placeholder="DD/MM/AAAA"
                            max='9999-12-31'
                            required={true}
                        />
                        <Input className="flex-col"
                            name="telefone"
                            label="Qual o seu telefone"
                            type="tel"
                            value={telefone}
                            onChange={handleTelefoneChange}
                            onKeyUp={handleKeyPress}
                            placeholder="(00)00000-0000"
                            required={true}
                        />
                        <Input className="flex-col"
                            name="cpf"
                            label="Qual o seu CPF"
                            type="text"
                            value={cpf}
                            onChange={handleCpfChange}
                            onKeyUp={handleKeyPress}
                            placeholder="000.000.000-00"
                            required={true}
                        />
                    </div>
                    <div className={styles.div_botao}>
                        <BotaoSalvar
                            texto="Salvar e Continuar"
                            type="submit"
                        />
                    </div>
                </MainComponent>
            </form>
        </>
    )
}

export default DadosPessoais