import style from './infoBox.module.css'  

function InfoBox ({icone, descricao}) {

    return (
        <article className={style.card}>
            <img className='w-[50%] h-[30%]' src={icone} alt="Ícone da Box" />
            <div className='flex justify-center text-sm font-semibold'>
                <span >{descricao}</span>
            </div>
        </article>
    )

}

export default InfoBox