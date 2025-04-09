import styles from '../inputs/input.module.css';

function InputComponent(props) {
    return (
        <div className={styles.input_container}>
            <label className='font-bold'>{props.label}</label>
            <input
                type={props.type}
                onChange={props.onChange}
                placeholder={props.placeholder}
                width={props.width}
            />
        </div>
    );
};

export default InputComponent;