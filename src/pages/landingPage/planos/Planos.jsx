import { useEffect, useState } from "react";
import styles from "./planos.module.css";
import Titulo from "../../../components/titulo/TituloComponent";
import CardPlanos from "../../../components/cardPlanos/cardPlanosComponent";
import { buscarPlanos } from "../../../provider/api";

const Planos = () => {
  const [planos, setPlanos] = useState([]);

  useEffect(() => {
    const fetchPlanos = async () => {
      try {
        const data = await buscarPlanos();

        const planosComDescricoesFixas = data.map((plano, index) => {
          if (index === 0) {
            return {
              ...plano,
              descricao:
                'Plano avulso para você que quer fazer a primeira sessão ou uma sessão de terapia individual um "test-drive"!',
            };
          } else if (index === 1) {
            return {
              ...plano,
              descricao:
                "Plano mensal para você que quer ter uma rotina de terapia, onde nos encontramos em todos os meses para melhor atender você!",
            };
          }
          return plano;
        });

        setPlanos(planosComDescricoesFixas);
      } catch (error) {
        console.error("Erro ao carregar os planos:", error);
      }
    };

    fetchPlanos();
  }, []);

  return (
    <section className={styles.section_planos} id="planos">
      <div className={styles.titulo_planos}>
        <Titulo titulo="PLANOS" subtitulo="Planos de consulta" />
        <span className="text-center">
          Oferecemos diferentes planos de consultas para atender às suas
          necessidades. Cada plano é pensado para proporcionar o melhor cuidado
          e acompanhamento, com preços acessíveis e condições que cabem no seu
          bolso. Consulte abaixo os valores e escolha o plano que melhor se
          adapta a você.
        </span>
      </div>

      <div className={styles.container_planos}>
        {planos.map((plano) => (
          <CardPlanos
            key={plano.id}
            titulo={plano.categoria}
            descricao={plano.descricao}
            preco={`R$ ${plano.preco}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Planos;
