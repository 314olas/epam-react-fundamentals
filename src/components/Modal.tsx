import React from "react"
import { Direction } from "../types"

import "../styles/components/modal.scss"

interface Props {
    additionalClass?: string,
    position?: Direction,
    children: React.ReactElement,
    isOpen: boolean,
    toggleOpen: (value: boolean) => void
}

const Modal = ({ children, additionalClass, position, isOpen, toggleOpen }: Props): React.ReactElement => {

    return (
        <>
            {isOpen &&
                <>
                    <div className={['modal', additionalClass, position, isOpen ? 'open' : ''].join(' ')}>
                        <div style={{margin: '25px 0'}}>
                            <div className="modal__content">
                                <button className="modal__close-btn" onClick={() => toggleOpen(false)}>X</button>
                                {children}
                            </div>
                            <div className="modal-backdrop" onClick={() => toggleOpen(false)}></div>
                        </div>
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