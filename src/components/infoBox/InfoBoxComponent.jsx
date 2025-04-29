import style from './infoBox.module.css'

function InfoBox(props) {

    return (
        <article className={style.card}>
            <div className="w-[50%] h-[30%] flex justify-center items-center">
                <props.icone size={50} color="var(--PurplePsi)" />
            </div>
            <div className="flex justify-center text-sm font-semibold">
                <span>{props.descricao}</span>
            </div>
        </article>
    )

}

export default InfoBox