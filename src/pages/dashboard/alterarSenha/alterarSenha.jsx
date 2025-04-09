import styles from './alterarSenha.module.css';
import React from 'react';
import HeaderDash from '../../../components/headerDash/HeaderDashComponent';
import Titulo from '../../../components/titulo/TituloComponent';
import BotaoSalvar from '../../../components/botaoSalvar/BotaoSalvarComponent';
import { FaLock } from "react-icons/fa";
import InputComponent from '../../../components/inputs/InputComponent';

const AlterarSenha = () => {
    return (
        <div>
            <HeaderDash showSettingsIcon={true} />
            <div className={styles.container}>
                <div className={styles.box_inputs}>
                    <div className={styles.title}>
                        <Titulo titulo="Atualizar Senha"></Titulo>
                    </div>

                    <div className={styles.input}>
                        <InputComponent label={"Senha Atual:"} type="password" onChange="" placeholder="Insira sua senha atual"/>
                        <InputComponent label={"Nova Senha:"} type="password" onChange="" placeholder="Insira sua nova senha"/>
                        <InputComponent label={"Confirmar Senha:"} type="password" placeholder="Confirme sua nova senha"/>
                    </div>
                    <BotaoSalvar texto='Salvar' backgroundColor='var(--LightPurplePsi)'></BotaoSalvar>

                </div>

            </div>
        </div>
    );
};

export default AlterarSenha;