import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IinitialState {
    deleteConfirmationModal: boolean,
    successModal: boolean,
    movieFormModal: boolean,
    isOneModalOpen: boolean
}

const initialState: IinitialState = {
    deleteConfirmationModal: false,
    successModal: false,
    movieFormModal: false,
    isOneModalOpen: false
}

export const modalsSlise = createSlice({
    name: 'toolkit/modals',
    initialState,
    reducers: {
        toggleDeleteConfirmationModal: (state, action: PayloadAction<boolean>) => {
            state.deleteConfirmationModal = action.payload
            state.isOneModalOpen = action.payload
        },
        toggleSuccessModal: (state, action: PayloadAction<boolean>) => {
            state.successModal = action.payload
            state.isOneModalOpen = action.payload
        },
        toggleMovieFormModal: (state, action: PayloadAction<boolean>) => {
            state.movieFormModal = action.payload
            state.isOneModalOpen = action.payload
        }
    }

})

export const { toggleDeleteConfirmationModal, toggleSuccessModal, toggleMovieFormModal } = modalsSlise.actions
export default modalsSlise.reducer