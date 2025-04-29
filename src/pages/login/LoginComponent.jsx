import axios from "axios"; // Importando axios
import Titulo from "../../components/titulo/TituloComponent";
import styles from "../login/login.module.css";
import React, { useState } from "react";
import Botao from "../../components/botoes/BotaoComponent";
import { errorMessage, responseMessage } from "../../utils/alert.js";
import { autenticateUser } from "../../utils/auth.js";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function logarUsuario() {
    if (!autenticateUser(email, senha)) {
      return;
    }

    try {
      const loginResponse = await axios.post("/pacientes/login", {
        email: email,
        senha: senha,
      });

      const { token, nome, id } = loginResponse.data;

      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("idUsuario", id);

        responseMessage(`Bem vindo, ${nome}!`, "small");

        const pacienteResponse = await axios.get(`/pacientes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { cpf } = pacienteResponse.data;

        setTimeout(() => {
          if (!cpf) {
            window.location.href = "/dashboard/forms";
          } else {
            window.location.href = "/dashboard/meus-agendamentos";
          }
        }, 2300);
      } else {
        errorMessage("Token de acesso não recebido, tente novamente", "small");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error("Erro ao autenticar usuário ou buscar dados:", error);
      errorMessage("Usuário não autorizado ou credenciais inválidas", "small");
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <p
          className={styles.voltarTexto}
          onClick={() => (window.location.href = "/")}
        >
          {" "}
          Voltar
        </p>

        <div className={styles.title}>
          <Titulo titulo="Bem vindo de Volta"></Titulo>
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
          <span className={styles.frase}>
            É necessário no mínimo 8 letras, 1 letra Maiúscula e 1 número
          </span>
          <span className={styles.esqSenha}>Esqueceu a senha?</span>
          <Botao texto="Entrar" width="30vw" onClick={logarUsuario} />
        </div>

        <div className={styles.criarConta}>
          <p>
            Não tem uma conta? <span>Entre em contato conosco</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
