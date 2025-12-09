import styles from './input.module.css';

function SelectComponent(props) {
    return (
        <div className={styles.input_container + ' ' + (props.width || 'w-[50%]')}>
            <label className='font-bold'
                style={{ fontSize: props.fontSize }}
            >{props.label}</label>
            <select
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                required={props.required}
                disabled={!!props.disabled}
                className={styles.select_input}
                style={{
                    height: props.height || '2.5rem',
                }}
            >
                {props.children}
            </select>
        </div>
    );
}

export default SelectComponent;
