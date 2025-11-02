import styles from "./headerDash.module.css";
import { BsGear } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

function HeaderDash({telaAtual,  showSettingsIcon, showBackButton = false }) {

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
        {showSettingsIcon && (
          <BsGear
            title="Configurações"
            className={styles.icon}
            onClick={handleSettings}
          />
        )}
        <IoIosLogOut
          title="Sair da conta"
          className={styles.icon}
          onClick={handleLogout}
        />
      </div>
    </header>
  );
}

export default HeaderDash;
