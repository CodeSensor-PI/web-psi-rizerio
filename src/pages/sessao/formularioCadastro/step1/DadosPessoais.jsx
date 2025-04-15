import HeaderDash from '../../../../components/headerDash/HeaderDashComponent'
import StepComponent from '../../../../components/steps/StepComponent'
import MainComponent from '../../../../components/main/MainComponent'
import styles from '../step1/dadosPessoais.module.css'
import Input from '../../../../components/inputs/InputComponent'
import BotaoSalvar from '../../../../components/botaoSalvar/BotaoSalvarComponent'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const DadosPessoais = () => {
    return (
        <>
            <HeaderDash showSettingsIcon={false} />
            <section className={styles.dados_pessoais}>
                <StepComponent stepAtual={1} />
                <MainComponent stepAtual={1} showBackItem={false}>
                    <div className={styles.inputs_content_dados}>
                        <Input className="flex-col"
                            height="h-[50%]"
                            label="Quando você nasceu"
                            type="date"
                            onChange={(e) => setData(e.target.value)}
                            placeholder="DD/MM/AAAA"
                        />
                        <Input className="flex-col"
                            label="Qual o seu telefone"
                            type="number"
                            onChange={(e) => setTelefone(e.target.value)}
                            placeholder="(00)00000-0000"
                        />
                        <Input className="flex-col"
                            label="Qual o seu CPF"
                            type="number"
                            onChange={(e) => setCpf(e.target.value)}
                            placeholder="000.000.000-00"
                        />
                    </div>
                    <div className={styles.div_botao}>
                        <Link to="/forms/localidade">
                            <BotaoSalvar
                                texto="Salvar e Continuar"
                                onClick={() => console.log("Botão clicado")}
                            />
                        </Link>
                    </div>
                </MainComponent>
            </section>
        </>
    )
}

export default DadosPessoais