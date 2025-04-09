import Titulo from "../../components/titulo/TituloComponent"
import styles from '../login/login.module.css'
// import imagem from '../../assets/images/ICONE-06.png'
import React, { useState } from 'react'
import Botao from "../../components/botoes/BotaoComponent"
import { errorMessage, responseMessage } from "../../utils/alert.js";
import { autenticateUser } from "../../utils/auth.js";

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');


    function logarUsuario() {
        if (!autenticateUser(email, senha)) {
            return;
          }
        console.log("Email:", email);
        console.log("Senha:", senha);

        fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: email,
                password: senha,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao autenticar usuário"); // Lança um erro para o catch
                }
                return response.json();
            })
            .then((data) => {
                // Captura os dados retornados
                const { token, username, roles } = data;

                if (token) {
                    // Armazena o token no localStorage
                    localStorage.setItem("authToken", token);

                    responseMessage(`Bem vindo, ${username}!`, "small");
                    setTimeout(() => {
                        window.location.href = "/dashboard"; // Depois alterar para a tela que for usar
                    }, 2300);
                } else {
                    errorMessage("Token de acesso não recebido, tente novamente", "small");
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }
            })
            .catch((error) => {
                console.error("Erro ao autenticar usuário:", error);
                // Exibe a mensagem de erro no catch
                errorMessage("Usuário não autorizado ou credenciais inválidas", "small");
            });
    }
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
                        <input
                            type="text"
                            name="email"
                            id="input_email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.div_input}>
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            name="senha"
                            id="input_senha"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    <span className={styles.frase}>É necessário no mínimo 8 letras, 1 letra Maiúscula e 1 número</span>
                    <span className={styles.esqSenha}>Esqueceu a senha?</span>
                    <Botao
                        texto="Entrar"
                        width="30vw"
                        onClick={logarUsuario}
                    />
                </div>

                <div className={styles.criarConta}>
                    <p>Não tem uma conta? <span>Entre em contato conosco</span></p>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent