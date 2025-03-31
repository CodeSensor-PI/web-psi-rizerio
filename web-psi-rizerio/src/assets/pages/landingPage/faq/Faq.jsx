import Accordion from '../../../components/accordion/AccordionComponent'
import Titulo from '../../../components/titulo/TituloComponent'
import styles from '../faq/faq.module.css'

const Faq = () => {
    const dadosFaq = [
        {
            id: 1,
            pergunta: "O que é psicoterapia Online?",
            resposta: "Psicoterapia online é um atendimento psicológico realizado pela internet."
        },
        {
            id: 2,
            pergunta: "Como funcionam as sessões?",
            resposta: "As sessões são realizadas por videochamada, com duração média de 50 minutos."
        },
        {
            id: 3,
            pergunta: "O que eu preciso no dia do agendamento?",
            resposta: "Você precisa de um local tranquilo e uma conexão estável à internet."
        },
        {
            id: 4,
            pergunta: "O que eu preciso no dia do agendamento?",
            resposta: "Você precisa de um local tranquilo e uma conexão estável à internet."
        },
        {
            id: 5,
            pergunta: "O que eu preciso no dia do agendamento?",
            resposta: "Você precisa de um local tranquilo e uma conexão estável à internet."
        }
    ];

    return (
        <section id='faq' className={styles.section_faq}>
            <Titulo
                titulo="FAQ"
                subtitulo="Perguntas Frequentes"
            />

            <div className={styles.acordeon}>
                {dadosFaq.map((item) => (
                    <Accordion
                        key={item.id}
                        pergunta={item.pergunta}
                        resposta={item.resposta}
                    />
                ))}
            </div>
        </section>
    )
}

export default Faq