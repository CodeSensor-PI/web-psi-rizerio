import axios from "axios";
import Titulo from "../../components/titulo/TituloComponent";
import styles from "../login/login.module.css";
import React, { useState } from "react";
import Botao from "../../components/botoes/BotaoComponent";
import { errorMessage, responseMessage } from "../../utils/alert";
import { autenticateUser } from "../../utils/auth";
import baseApi from "../../provider/baseApi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);

  async function logarUsuario() {
    if (!autenticateUser(email, senha)) {
      return;
    }

    try {
      const loginResponse = await baseApi.post(
        "/pacientes/login",
        {
          email: email,
          senha: senha,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { nome, id } = loginResponse.data;
      localStorage.setItem("idUsuario", id);
      localStorage.setItem("nomeUsuario", nome);

      responseMessage(`Bem vindo, ${nome}!`, "small");

      const pacienteResponse = await baseApi.get(`/pacientes/${id}`, {
        withCredentials: true,
      });

      const { cpf } = pacienteResponse.data;

      setTimeout(() => {
        if (!cpf) {
          window.location.href = "/dashboard/forms";
        } else {
          window.location.href = "/dashboard/meus-agendamentos";
        }
      }, 2300);
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 429) {
          const retryAfter = error.response.data.ttl
            ? error.response.data.ttl
            : null;
          const waitMsg = retryAfter
            ? `Tente novamente em ${retryAfter} segundos.`
            : "Tente novamente mais tarde.";

          errorMessage(`Muitas tentativas. ${waitMsg}`, "small");
        } else {
          errorMessage(
            "Usuário não autorizado ou credenciais inválidas",
            "small"
          );
        }
      } else {
        errorMessage("Erro de conexão. Tente novamente.", "small");
      }
      console.error("Erro ao autenticar usuário ou buscar dados:", error);
    }
  }
  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <p
          className={styles.voltarTexto}
          onClick={() => (window.location.href = "/")}
        >
          Voltar
        </p>

        <div className={styles.title}>
          <Titulo titulo="Bem vindo!"></Titulo>
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
            <div className={styles.inputWrapper}>
              <input
                type={showSenha ? "text" : "password"}
                name="senha"
                id="input_senha"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowSenha(!showSenha)}
                aria-label={showSenha ? "Ocultar senha" : "Mostrar senha"}
              >
                {showSenha ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
          </div>
          <span 
            className={styles.esqSenha}
            onClick={() => window.location.href = "/esqueceu-senha"}
          >
            Esqueceu a senha?
          </span>
          
            <Botao texto="Entrar" width="70%" onClick={logarUsuario} />
          
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
