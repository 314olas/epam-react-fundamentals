import React from "react";
import Select, { StylesConfig } from "react-select";
import { ISelectOption } from "../types";
import "../styles/components/dropdown.scss"

interface Props {
    items: ISelectOption[],
    className?: string,
    onChangeHandler: (value: ISelectOption | ISelectOption[]) => void,
    name?: string,
    multiply?: boolean,
    value: ISelectOption[] | ISelectOption | null
    styles?: StylesConfig<ISelectOption, true>,
    placeholder?: string,
    customComponents?: any
}

const DropDown: React.FC<Props> = (
    {
        items, 
        onChangeHandler, 
        className, 
        placeholder = '', 
        name, 
        multiply = false, 
        value = [''], 
        styles, 
        customComponents
    }) => {

    let defaultStylestyles: StylesConfig<ISelectOption, true> = {
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? '#fff' : '#fff',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            "&:hover": {
                backgroundColor: '#323232',
            },
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#ccc',
            border: '1px solid #F65261',
            borderRadius: '2px',
            color: '#fff'
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#fff'
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#323232',
            border: '1px solid #fff',
            width: 'fit-content',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        }),
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#232323',
            height: '56px',
            borderColor: state.isFocused ? 'transparent' : 'transparent',
            borderRadius: '4px',
            color: '#fff',
            "&:hover": {
                borderColor: 'transparent',
            },
            boxShadow: 'none'
        }),
        indicatorSeparator: () => ({}),
        placeholder: (provided) => ({
            ...provided,
            color: '#fff'
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: '#F65261',
            transform: state.isFocused ? "rotate(180deg)" : '',
            "&:hover": {
                color: "rgba(246,82,92, 0.8)",
            }
        })
    }

    const customStyles = {...defaultStylestyles, ...styles}

    return <div className={['dropdown', className].join(' ')}>
        <Select
            className={className}
            name={name}
            onChange={onChangeHandler}
            placeholder={placeholder}
            options={items}
            isMulti={multiply}
            styles={customStyles}
            components={customComponents}
        />
    </div>
}

export default DropDown
