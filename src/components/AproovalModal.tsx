import React from "react"
import { GlobalContextInterface, ToggleAproovalModal, toggleAproovalModal } from "./Globaltate"
import Modal from "./Modal"
import '../styles/components/aprooval-modal.scss'

interface Props {
    children: React.ReactElement
    state: GlobalContextInterface,
    toggleOpen: React.Dispatch<ToggleAproovalModal>
}

const AproovalModal: React.FC<Props> = ({children, state, toggleOpen}) =>  {

    return (
        <Modal isOpen={state.aprooveMoadal.isOpen} 
                toggleOpen={(state) => toggleOpen(toggleAproovalModal(state))}
                additionalClass={state.aprooveMoadal.aditionalClass}
                position={state.aprooveMoadal.position}>
            {children}
        </Modal>
    )
}

export default AproovalModal