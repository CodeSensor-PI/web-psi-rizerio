import styles from './accordion.module.css'
import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

function Accordion(props) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={styles.accordion_item}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={styles.accordion_botao}
                style={{
                    backgroundColor: props.background || '#F8F8F8',
                    color: props.color || '#000'
                }}
            >
                {props.texto}
                <span className={styles.accordion_icon}>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
            </button>
            {isOpen && <div className={styles.content}>{props.children}</div>}
        </div>
    )
}

export default Accordion