import styles from "./alterarSenha.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import HeaderDash from "../../../components/headerDash/HeaderDashComponent";
import Titulo from "../../../components/titulo/TituloComponent";
import BotaoSalvar from "../../../components/botaoSalvar/BotaoSalvarComponent";
import InputComponent from "../../../components/inputs/InputComponent";
import { errorMessage, responseMessage } from "../../../utils/alert"; // Funções de mensagem
import { alterarSenha } from "../../../provider/api"; // Função para alterar a senha

const AlterarSenha = () => {
  const navigate = useNavigate();

  const [senha, setSenha] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleSavePassword = async () => {
    if (!senha || !novaSenha || !confirmarSenha) {
      errorMessage("Todos os campos devem estar preenchidos!");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      errorMessage("A nova senha e a confirmação não coincidem!");
      return;
    }

    try {
      const idDoUsuario = localStorage.getItem("idUsuario");
      await alterarSenha(idDoUsuario, senha, novaSenha); // Chama a função para alterar a senha
      responseMessage("Senha alterada com sucesso!");
      navigate("/dashboard/meus-agendamentos"); // Redireciona para a tela de "Meus Agendamentos"
    } catch (error) {
      errorMessage("Erro ao alterar a senha.");
      console.error(error);
    }
  };

  return (
    <div className={styles.div_alterar_senha}>
      <HeaderDash showSettingsIcon={false} showBackButton={true} />
      <div className={styles.container}>
        <div className={styles.box_inputs}>
          <div className={styles.title}>
            <Titulo titulo="Atualizar Senha"></Titulo>
          </div>

          <div className={styles.inputs}>
            <InputComponent
              label={"Senha Atual:"}
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)} // Atualiza o estado
              placeholder="Insira sua senha atual"
            />
            <InputComponent
              label={"Nova Senha:"}
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)} // Atualiza o estado
              placeholder="Insira sua nova senha"
            />
            <InputComponent
              label={"Confirmar Senha:"}
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)} // Atualiza o estado
              placeholder="Confirme sua nova senha"
            />
          </div>
          <BotaoSalvar
            texto="Salvar"
            backgroundColor="var(--LightPurplePsi)"
            onClick={handleSavePassword} // Chama a função handleSavePassword
          ></BotaoSalvar>
        </div>
      </div>
    </div>
  );
};

export default AlterarSenha;
