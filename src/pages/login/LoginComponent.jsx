import Titulo from "../../components/titulo/TituloComponent"
import styles from '../login/login.module.css'
import imagem from '../../assets/images/ICONE-06.png'
import React from 'react'

const loginComponent = () => {
    return (
        <div className={styles.login}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <Titulo titulo='Bem vindo de Volta'></Titulo>
                    <p>Entre para continuar</p>
                </div>
                <div className={styles.input}>
                    <div className={styles.div_input}>
                        <label htmlFor="email">Endereço de Email</label>
                        <input type="text" name="email" placeholder="Placeholder" />
                    </div>
                    <div className={styles.div_input}>
                        <label htmlFor="senha">Senha</label>
                        <input type="text" name="senha" placeholder="Placeholder" />
                    </div>
                    <span className={styles.frase}>É necessário no mínimo 8 letras, 1 letra Maiúscula e 1 número</span>
                    <span className={styles.esqSenha}>Esqueceu a senha?</span>
                    <button className={styles.entrar}>Entrar</button>
                </div>
                
                <div className={styles.criarConta}>
                    <p>Não tem uma conta? <span>Entre em contato conosco</span></p>
                </div>
            </div>
        </div>
    )
}

export default loginComponent
