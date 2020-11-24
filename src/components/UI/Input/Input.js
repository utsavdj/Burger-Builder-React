import React from 'react';
import styles from './Input.module.css'

const input = (props) => {
    let inputElement = null;
    const inputClasses = [styles.InputElement];
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(styles.Invalid);
    }
    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = (<p style={{color:'red', margin:'5px 0'}}>
            <strong>Please enter a valid {props.elementName}!</strong>
        </p>);
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')}
                                  onChange={props.changed}
                                  {...props.elementConfig}
                                  value={props.value} />;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')}
                                     onChange={props.changed}
                                     {...props.elementConfig}
                                     value={props.value} />;
            break;
        case ('select'):
            inputElement = (
                <select className={inputClasses.join(' ')}
                        onChange={props.changed}
                        {...props.elementConfig}
                        value={props.value}>
                    {props.elementConfig.options.map(option=>(
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')}
                                  {...props.elementConfig}
                                  value={props.value} />;
    }
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default input;
