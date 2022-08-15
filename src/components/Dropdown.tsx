import React, { useEffect, useMemo, useState } from "react";
import { IDropdownData } from "../types";
import "../styles/components/dropdown.scss"


interface Props {
    items: IDropdownData,
    className?: string | string[],
    position?: string,
    onChangeHandler: (value: IDropdownData, name?: string) => void,
    children?: React.ReactElement<any, any>
    name?: string,
    multiply?: boolean,
    value: string[]
}

const DropDown: React.FC<Props> = ({ items, onChangeHandler, children, className, position, name, multiply, value = [''] }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        const dropdownHandler = (e: any) => {

            if (!e.target.closest('.dropdown')) {
                toggleIsOpen()
            }
        }

        document.addEventListener('click', dropdownHandler)

        return () => {
            document.removeEventListener('click', dropdownHandler)
        }
    }, [])


    const clickHandler = (e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLInputElement>, itemName: IDropdownData) => {
        e.preventDefault();

        let newValue: IDropdownData = undefined;

        if (!multiply) {
            newValue = itemName
        } else {
            if (value.includes(itemName[0])) {
                newValue = value.filter(item => item !== itemName[0])
            } else {
                newValue = value.concat(itemName)
            }
        }

        name ? onChangeHandler(newValue, name) : onChangeHandler(newValue)
        toggleIsOpen(false)
    }

    const toggleIsOpen = (value?: boolean): void => {
        if (value === undefined) {
            setIsOpen(false)
        } else {
            setIsOpen(value)
        }
    }

    const choosenItem = useMemo((): string => {
        const string = value ?
            value.reduce((ac: string, item) => {
                if (item) return ac + item + ' '
                return ac
            }, '') : ''

        return string
    }, [value])

    return <>
        <div className={['dropdown', isOpen ? 'open' : '', className].join(' ')}>
            <button className="button dropdown__btn" type="button" id="dropdownMenuButton1" aria-expanded="false" onClick={() => toggleIsOpen(!isOpen)}>

                {children ||
                    <>
                        {choosenItem ? choosenItem : 'choose item'}
                        <svg className="dropdown__arrow" width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.17339 0C0.319169 0 -0.141788 1.00184 0.413939 1.65057L4.23746 6.11398C4.63642 6.57971 5.35674 6.57992 5.75597 6.11442L9.58401 1.65101C10.1403 1.0024 9.67943 0 8.82494 0H1.17339Z" />
                        </svg>
                    </>
                }

            </button>
            <ul className={['dropdown__menu', position].join(' ')} aria-labelledby="dropdownMenuButton1">

                {multiply &&
                    items.map((item) => {
                        return (<li key={item.split(' ').join('')}>
                            <label className="dropdown__item" >
                                {value}
                                <input type="checkbox" onChange={(e) => clickHandler(e, [item])} 
                                // checked={value.includes(item)} 
                                />
                                <span>{item}</span>
                            </label>
                        </li>)
                    })
                }

                {!multiply && items.map((item) => {
                    return <li key={item}><a className="dropdown__item" onClick={(e) => clickHandler(e, [item])}>{item}</a></li>
                })}
            </ul>
        </div>
    </>
}

DropDown.defaultProps = {
    multiply: false,
}

export default DropDown
