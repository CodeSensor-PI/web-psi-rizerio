import { useState } from "react";
import Titulo from "../../components/titulo/TituloComponent";
import Botao from "../../components/botoes/BotaoComponent";
import { errorMessage, responseMessage } from "../../utils/alert";
import { solicitarRecuperacaoSenha } from "../../provider/api";
import styles from "./esqueceuSenha.module.css";

const EsqueceuSenha = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSolicitarCodigo = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      errorMessage("Por favor, insira um email válido.");
      return;
    }

    setLoading(true);

    try {
      await solicitarRecuperacaoSenha(email);
      responseMessage("Código enviado para o seu email!");
      
      setTimeout(() => {
        window.location.href = `/esqueceu-senha/confirmar-codigo?email=${encodeURIComponent(email)}`;
      }, 2300);
    } catch (error) {
      console.error("Erro ao solicitar recuperação de senha:", error);
      errorMessage("Erro ao enviar código. Verifique o email e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.esqueceuSenha}>
      <div className={styles.container}>
        <p
          className={styles.voltarTexto}
          onClick={() => (window.location.href = "/login")}
        >
          Voltar para Login
        </p>

        <div className={styles.title}>
          <Titulo titulo="Esqueceu a senha?" />
          <p>Digite seu email para receber o código de recuperação</p>
        </div>

        <form onSubmit={handleSolicitarCodigo} className={styles.form}>
          <div className={styles.div_input}>
            <label htmlFor="email">Endereço de Email</label>
            <input
              type="email"
              name="email"
              id="input_email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.botao}>
            <Botao
              texto={loading ? "Enviando..." : "Enviar Código"}
              width="100%"
              onClick={handleSolicitarCodigo}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EsqueceuSenha;
