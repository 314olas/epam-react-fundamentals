import React, { useCallback, useEffect, useState, useContext } from "react";
import "../styles/components/_dropdown.scss"

interface Props {
    items: string[],
    defaultValue?: string,
    className?: string | string[],
    position?: string,
    onChange: (value: string) => void,
    children?: React.ReactElement<any, any>
}

interface EventListener {
    (evt: Event): void;
}

export const DropDown: React.FC<Props> = ({items, defaultValue, onChange, children, className, position}) => {

    const [dropValue, setDropValue ] = useState<string>(defaultValue || items[0] || 'Choose from the list');
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        const dropdownHandler = (e: any) => {

            if (!e.target.closest('.dropdown') && isOpen) {
                toggleIsOpen()
            }
        }

        document.addEventListener('click', dropdownHandler)

        return () => {
            document.removeEventListener('click', dropdownHandler)
        }
    }, [])


    const clickHandler = (e: React.MouseEvent<HTMLElement>, value: string) => {
        e.preventDefault();
        setDropValue(value);
        onChange(value)
        toggleIsOpen(false)
    }

    const toggleIsOpen = (value?: boolean ): void => {
        if (value === undefined) {
            setIsOpen(false)
        } else {
            setIsOpen(value)
        }
    }

    return <>
        <div className={['dropdown', isOpen ? 'open': '', className].join(' ')}>
             <button className="button dropdown__btn" type="button" id="dropdownMenuButton1" aria-expanded="false" onClick={() => toggleIsOpen(!isOpen)}>

                    {children ||
                        <>
                            {dropValue}
                            <svg className="dropdown__arrow" width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.17339 0C0.319169 0 -0.141788 1.00184 0.413939 1.65057L4.23746 6.11398C4.63642 6.57971 5.35674 6.57992 5.75597 6.11442L9.58401 1.65101C10.1403 1.0024 9.67943 0 8.82494 0H1.17339Z"/>
                            </svg>
                        </>
                    }

                </button>
            <ul className={['dropdown__menu', position].join(' ')} aria-labelledby="dropdownMenuButton1">
                {items.map((item: string) => {
                    return <li key={item}><a className="dropdown__item"  onClick={(e)=> clickHandler(e, item)}>{item}</a></li>
                })}
            </ul>
        </div>
    </>
}
