import styles from './accordion.module.css'
import { useState } from 'react'

function Accordion(props) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={styles.accordion_item}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={styles.accordion_botao}
            >
                {props.pergunta}
                <span className={styles.accordion_icon}>{isOpen ? "➖" : "➕"}</span>
            </button>
            {isOpen && <div className={styles.content}>{props.resposta}</div>}
        </div>
    )
}

export default Accordion