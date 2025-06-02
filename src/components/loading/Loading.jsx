import styles from './loading.module.css'; // Adicione o caminho correto para o arquivo CSS

const Loading = () => (
  <div className={styles.loading_overlay}>
    <div className={styles.spinner}></div>
  </div>
);

export default Loading;