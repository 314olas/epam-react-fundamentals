import React, {useEffect} from "react"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const UseModal = () => {
    const isModalOpen = useAppSelector(state => state.modals.isOneModalOpen)

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('modal-open')
        } else {
            document.body.classList.remove('modal-open')
        }

    }, [isModalOpen])
}