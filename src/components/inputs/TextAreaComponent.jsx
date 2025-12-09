import styles from './input.module.css';

function TextAreaComponent(props) {
    return (
        <div className={styles.input_container + ' ' + (props.width || 'w-full')}>
            <label className='font-bold'
                style={{ fontSize: props.fontSize }}
            >{props.label}</label>
            <textarea
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                required={props.required}
                disabled={!!props.disabled}
                className={styles.textarea_input}
                style={{
                    minHeight: props.minHeight || '8rem',
                }}
            />
        </div>
    );
}

export default TextAreaComponent;
