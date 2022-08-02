import React, { useState } from "react"
import "../styles/components/modal.scss"
import { Direction } from "../types"

interface Props {
    additionalClass?: string,
    position?: Direction,
    children: React.ReactElement,
    isOpen: boolean,
    toggleOpen: (value: boolean) => void
}

 const Modal = ({children, additionalClass, position, isOpen, toggleOpen}: Props): React.ReactElement =>  {

    return (
        <>
            {isOpen &&
                <>
                    <div className={['modal', additionalClass, position, isOpen ? 'open' : ''].join(' ')}>
                        <div className="modal__content">
                            <button className="modal__close-btn" onClick={() => toggleOpen(false)}>X</button>
                            {children}
                        </div>
                        <div className="modal-backdrop" onClick={() => toggleOpen(false)}></div>
                    </div>
                </>
            }
        </>
    )
}

Modal.defaultProps = {
    position: Direction.Center
}

export default Modal