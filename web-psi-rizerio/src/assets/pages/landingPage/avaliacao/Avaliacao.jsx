import styles from '../avaliacao/avaliacao.module.css'
import Titulo from '../../../components/titulo/TituloComponent'
import { Swiper, SwiperSlide } from 'swiper/react'
import Perfil from '../../../images/foto-perfil.svg'
import CardAvaliacao from '../../../components/cardAvaliacao/CardAvaliacaoComponent'

const Avaliacao = () => {

    const avaliacoes = [
        {
            id: 1,
            foto: Perfil,
            avaliacao: 'Fui muito bem acolhido desde o início. O atendimento foi empático e me ajudou a entender melhor minhas emoções e desafios. Com o apoio do psicólogo, aprendi a lidar melhor com as situações do dia a dia. Recomendo a todos que buscam ajuda para o autoconhecimento e equilíbrio emocional.',
            nome: "Jake Peralta",
            profissao: "Detetive"
        },
        {
            id: 2,
            foto: Perfil,
            avaliacao: 'Fui muito bem acolhido desde o início. O atendimento foi empático e me ajudou a entender melhor minhas emoções e desafios. Com o apoio do psicólogo, aprendi a lidar melhor com as situações do dia a dia. Recomendo a todos que buscam ajuda para o autoconhecimento e equilíbrio emocional.',
            nome: "Ted Mosby",
            profissao: "Arquiteto"
        },
        {
            id: 3,
            foto: Perfil,
            avaliacao: 'Fui muito bem acolhido desde o início. O atendimento foi empático e me ajudou a entender melhor minhas emoções e desafios. Com o apoio do psicólogo, aprendi a lidar melhor com as situações do dia a dia. Recomendo a todos que buscam ajuda para o autoconhecimento e equilíbrio emocional.',
            nome: "Ross Geller",
            profissao: "Paleontólogo"
        },
        {
            id: 4,
            foto: Perfil,
            avaliacao: 'Fui muito bem acolhido desde o início. O atendimento foi empático e me ajudou a entender melhor minhas emoções e desafios. Com o apoio do psicólogo, aprendi a lidar melhor com as situações do dia a dia. Recomendo a todos que buscam ajuda para o autoconhecimento e equilíbrio emocional.',
            nome: "Randall Pearson",
            profissao: "Prefeito"
        },
        {
            id: 5,
            foto: Perfil,
            avaliacao: 'Fui muito bem acolhido desde o início. O atendimento foi empático e me ajudou a entender melhor minhas emoções e desafios. Com o apoio do psicólogo, aprendi a lidar melhor com as situações do dia a dia. Recomendo a todos que buscam ajuda para o autoconhecimento e equilíbrio emocional.',
            nome: "Phil Dunphy",
            profissao: "Corretor imobiliário"
        }
    ]

    return (
        <section className={styles.section_avaliacao} id='avaliacoes'>
            <Titulo
                titulo="AVALIAÇÕES"
                subtitulo="Experiências dos pacientes"
            />

            <Swiper
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation
                className={styles.swiper_avaliacoes}
            >
                {avaliacoes.map((avaliacao) => (
                    <SwiperSlide key={avaliacao.id} className={styles.swiper_content}>
                        <CardAvaliacao
                            foto={avaliacao.foto}
                            avaliacao={avaliacao.avaliacao}
                            nome={avaliacao.nome}
                            profissao={avaliacao.profissao}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default Avaliacao