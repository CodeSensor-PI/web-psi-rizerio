import styles from '../inputs/input.module.css';

function InputComponent(props) {
    return (
        <div className={styles.input_container + ' ' + (props.width || 'w-[50%]')}>
            <label className='font-bold'>{props.label}</label>
            <input
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                onKeyUp={props.onKeyUp}
                placeholder={props.placeholder}
                max={props.max}
                onBlur={props.onBlur}
            />
        </div>
    );
};

export default InputComponent;