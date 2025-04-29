import styles from "./alterarSenha.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderDash from "../../../components/headerDash/HeaderDashComponent";
import Titulo from "../../../components/titulo/TituloComponent";
import BotaoSalvar from "../../../components/botaoSalvar/BotaoSalvarComponent";
import InputComponent from "../../../components/inputs/InputComponent";
import { errorMessage, responseMessage } from "../../../utils/alert";
import { alterarSenha } from "../../../provider/api";

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
      await alterarSenha(idDoUsuario, senha, novaSenha);
      responseMessage("Senha alterada com sucesso!");
      navigate("/dashboard/meus-agendamentos");
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
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Insira sua senha atual"
            />
            <InputComponent
              label={"Nova Senha:"}
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              placeholder="Insira sua nova senha"
            />
            <InputComponent
              label={"Confirmar Senha:"}
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Confirme sua nova senha"
            />
          </div>
          <BotaoSalvar
            texto="Salvar"
            backgroundColor="var(--LightPurplePsi)"
            onClick={handleSavePassword}
          ></BotaoSalvar>
        </div>
      </div>
    </div>
  );
};

export default AlterarSenha;
