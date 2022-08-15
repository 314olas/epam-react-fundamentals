import React from "react"
import "../styles/components/input.scss"
import { IDropdownData } from "../types"
import DropDown from "./Dropdown"

interface Props {
    type?: React.HTMLInputTypeAttribute,
    className?: string,
    id?: string,
    label?: string,
    nameAttr: string,
    onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onChange: (value: string | number | IDropdownData | string[], name?: string) => void,
    placeholder?: string,
    value: string | number | string[] | IDropdownData,
    data?: IDropdownData,
    multiply?: boolean,
    step?: number
}

const InputCompenent = ({ type, id, nameAttr, placeholder, className, value, label, data, step, multiply, onChange, onBlur }: Props): React.ReactElement => {

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        onChange(e.target.value, nameAttr)
    }

    const classNames = ['input', type];

    const inputAttr: Pick<Props, 'id' | 'className' | 'placeholder' | 'step' | 'type'> & { name: string } = {
        id: id ? id : nameAttr,
        name: nameAttr,
        className: classNames.join(' '),
    };

    if (placeholder) {
        inputAttr.placeholder = placeholder;
    }

    if (step) {
        inputAttr.step = step;
    }

    if (type !== 'textarea' && type !== 'dropdown') {
        inputAttr.type = type
    }

    if (className) {
        classNames.push(className)
        inputAttr.className = classNames.join(' ')
    } else {
        inputAttr.className = classNames.join(' ')
    }

    return (
        <div className={['form-field', className].join(' ')}>
            <label className="input-label" htmlFor={nameAttr}>{label}</label>
            <div className="input-wrapper">

                {type === 'textarea' &&
                    <textarea  {...inputAttr} value={value as string} onChange={onChangeHandler}></textarea>
                }

                {type !== 'textarea' && type !== 'dropdown' &&
                    <input {...inputAttr} value={value as string} onChange={onChangeHandler} />
                }

                {type === 'dropdown' &&
                    <DropDown items={data} value={value as IDropdownData} multiply={multiply} name={nameAttr} onChangeHandler={(value) => onChange(value, nameAttr)}></DropDown>
                }
            </div>
        </div>
    )
}

InputCompenent.defaultProps = {
    label: "label",
    onBlur: () => { }
}


export default InputCompenent