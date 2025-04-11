import styles from '../inputs/input.module.css';

function InputComponent(props) {
    return (
        <div className={styles.input_container}>
            <label className='font-bold'>{props.label}</label>
            <input
                className={props.width}
                type={props.type}
                onChange={props.onChange}
                placeholder={props.placeholder}
            />
        </div>
    );
};

export default InputComponent;