import React, { useCallback, useEffect, useState, useContext } from "react";
import "../styles/components/dropdown.scss"
import { IDropdownData } from "../types";

interface Props {
    items: IDropdownData[],
    className?: string | string[],
    position?: string,
    onChangeHandler: (value:  string, name?: string) => void,
    children?: React.ReactElement<any, any>
    name?: string,
    multiply?: boolean
}

interface EventListener {
    (evt: Event): void;
}

const DropDown: React.FC<Props> = ({items, onChangeHandler, children, className, position, name, multiply}) => {
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


    const clickHandler = (e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLInputElement> , itemName: string) => {
        e.preventDefault();
        if (name) {
            onChangeHandler(itemName, name)
        } else {
            onChangeHandler(itemName)
        }
        toggleIsOpen(false)
    }

    const toggleIsOpen = (value?: boolean ): void => {
        if (value === undefined) {
            setIsOpen(false)
        } else {
            setIsOpen(value)
        }
    }

    const choosenItem = (): string => {
        const string = items.reduce((ac: string, item) => {
            if (item.isActive) return ac + item.name + ' '
            return ac
        }, '')

        return string
    }

    return <>
        <div className={['dropdown', isOpen ? 'open': '', className].join(' ')}>
             <button className="button dropdown__btn" type="button" id="dropdownMenuButton1" aria-expanded="false" onClick={() => toggleIsOpen(!isOpen)}>

                    {children ||
                        <>
                            {choosenItem() ? choosenItem() : 'choose item'}
                            <svg className="dropdown__arrow" width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.17339 0C0.319169 0 -0.141788 1.00184 0.413939 1.65057L4.23746 6.11398C4.63642 6.57971 5.35674 6.57992 5.75597 6.11442L9.58401 1.65101C10.1403 1.0024 9.67943 0 8.82494 0H1.17339Z"/>
                            </svg>
                        </>
                    }

                </button>
            <ul className={['dropdown__menu', position].join(' ')} aria-labelledby="dropdownMenuButton1">

                {multiply && 
                    items.map((item: IDropdownData) => {
                        return (<li key={item.name}>
                                    <label className="dropdown__item" >
                                        <input type="checkbox" onChange={(e) => clickHandler(e, item.name)} checked={item.isActive}/>
                                        <span>{item.name}</span>
                                    </label>
                                </li>)
                    })
                }

                {!multiply && items.map((item: IDropdownData) => {
                    return <li key={item.name}><a className="dropdown__item" onClick={(e)=> clickHandler(e, item.name)}>{item.name}</a></li>
                })}
            </ul>
        </div>
    </>
}

DropDown.defaultProps = {
    multiply: false
}

export default DropDown
