import styles from "./headerDash.module.css";
import { BsGear } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import ProfileMenu from "../profileMenu/ProfileMenu";
import EditarFotoModal from "../editarFotoModal/EditarFotoModal";
import { useState, useEffect } from "react";
import { buscarPacientePorId, uploadFotoPaciente, logout } from "../../provider/api";
import { errorMessage, responseMessage, confirmAction } from "../../utils/alert";

function HeaderDash({telaAtual,  showSettingsIcon, showBackButton = false }) {
  const [imagem, setImagem] = useState(null);
  const [showEditarFotoModal, setShowEditarFotoModal] = useState(false);

  useEffect(() => {
    const fetchFotoPaciente = async () => {
      try {
        const idUsuario = localStorage.getItem("idUsuario");
        if (idUsuario) {
          const paciente = await buscarPacientePorId(idUsuario);
          console.log("Dados do paciente:", paciente);
          if (paciente?.imagemUrl) {
            setImagem(paciente.imagemUrl);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar foto do paciente:", error);
      }
    };
    fetchFotoPaciente();
  }, []);

  const handleSalvarImagemCortada = async (imagemCortada) => {
    try {
      const idUsuario = localStorage.getItem("idUsuario");
      const response = await uploadFotoPaciente(idUsuario, imagemCortada);
      console.log("Resposta do upload:", response);
      
      // Atualiza com a URL retornada pelo servidor ou busca novamente os dados
      const paciente = await buscarPacientePorId(idUsuario);
      
      if (paciente?.imagemUrl) {
        setImagem(paciente.imagemUrl);
      } else {
        // Fallback para URL local temporária
        setImagem(URL.createObjectURL(imagemCortada));
      }
      
      responseMessage("Foto atualizada com sucesso!");
      setShowEditarFotoModal(false);
    } catch (error) {
      errorMessage("Erro ao salvar foto");
      console.error(error);
    }
  };

  const handleExcluirFoto = async () => {
    setImagem(null);
    responseMessage("Foto removida com sucesso!");
    setShowEditarFotoModal(false);
  };

  const handleSair = async () => {
    const result = await confirmAction(
      "Deseja realmente sair?",
      "",
      "Sim, sair",
      "Cancelar"
    );

    if (result.isConfirmed) {
      try {
        await logout();
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/login";
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
        errorMessage("Erro ao realizar logout. Tente novamente.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/desconectado";
  };

  const handleSettings = () => {
    window.location.href = "/dashboard/meus-dados";
  };

  const handleBack = () => {
    if (telaAtual === "meus-dados") {
      window.location.href = "/dashboard/meus-agendamentos";
    } else {
      window.location.href = "/dashboard/meus-dados";
    }
  };

  return (
    <>
      <header className={styles.header_dash}>
        <div className={styles.leftIcons}>
          {showBackButton && (
            <IoArrowBack
              title="Voltar"
              className={styles.icon}
              onClick={handleBack}
            />
          )}
        </div>

        <div className={styles.rightIcons}>
          <ProfileMenu
            imagem={imagem}
            onEditarFoto={() => setShowEditarFotoModal(true)}
            onConfiguracoes={handleSettings}
            onSair={handleSair}
          />
        </div>
      </header>

      {showEditarFotoModal && (
        <EditarFotoModal
          imagem={imagem}
          onSalvar={handleSalvarImagemCortada}
          onExcluir={handleExcluirFoto}
          onClose={() => setShowEditarFotoModal(false)}
        />
      )}
    </>
  );
}

export default HeaderDash;
