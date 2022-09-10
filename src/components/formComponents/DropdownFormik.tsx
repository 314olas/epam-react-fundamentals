import * as React from 'react';
import { FieldProps, useField } from 'formik';
import Select, { StylesConfig } from 'react-select'
import { ISelectOption } from '../../types';

export interface IDropdownFormikProps extends FieldProps {
    isMulti?: boolean;
    className?: string;
    placeholder?: string;
    options: ISelectOption[],
}

export default function DropdownFormik({ field, form, className, placeholder, options, isMulti, ...props }: IDropdownFormikProps) {
    const [fieldValue] = useField(field);

    const customStyles: StylesConfig<ISelectOption, true> = {
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'red' : '#fff',
            backgroundColor: 'transparent',
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
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#232323',
        }),
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#323232',
            height: '56px',
            borderColor: state.isFocused ? '#F65261' : 'transparent',
            borderRadius: '4px',
            color: '#fff',
            "&:hover": {
                borderColor: '#F65261',
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
            transform: state.isFocused ? "rotate(180deg)": '',
            "&:hover": {
                color: "rgba(246,82,92, 0.8)",
            }
        }),
    }

    const onChange = (option: ISelectOption | ISelectOption[]) => {
        form.setFieldValue(field.name,
            isMulti ?
                (option as ISelectOption[]).map(item => item) :
                (option as ISelectOption)
        )
    }

    return (
        <Select
            className={className}
            name={fieldValue.name}
            onChange={onChange}
            placeholder={placeholder}
            options={options}
            isMulti={isMulti}
            styles={customStyles}
            defaultValue={fieldValue.value}
        />
    );
}
