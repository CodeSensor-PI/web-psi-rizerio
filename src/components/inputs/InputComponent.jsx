import styles from '../inputs/input.module.css';

function InputComponent(props) {
    return (
        <div className={styles.input_container + ' ' + (props.width || 'w-[50%]')}>
            <label className='font-bold'
                style={{ fontSize: props.fontSize || '1.2rem' }}
            >{props.label}</label>
            <input
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                onKeyUp={props.onKeyUp}
                placeholder={props.placeholder}
                max={props.max}
                onBlur={props.onBlur}
                required={props.required}
                disabled={!!props.disabled}
                style={{
                    height: props.height || '2.5rem',
                    fontSize: props.fontSizeInput || '1rem',
                }}
            />
        </div>
    );
};

export default InputComponent;