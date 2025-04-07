import styles from './headerDash.module.css';
import { BsGear } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";

function HeaderDash({showSettingsIcon}) {
    return (
        <>
            <header className={styles.header_dash}>
                <div className={styles.icons}>
                    {showSettingsIcon && (
                        <BsGear title="Configurações" className={styles.icon} />
                    )}
                    <IoIosLogOut title="Sair da conta" className={styles.icon} />
                </div>
            </header>
        </>
    )
}

export default HeaderDash;