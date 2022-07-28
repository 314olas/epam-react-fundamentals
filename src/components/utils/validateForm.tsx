import { IAddMovieForm } from "../../types";
import { GlobalContextInterface } from "../Globaltate";

export const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

export const validateForm = (state: GlobalContextInterface): boolean => {
    let isValidFields = true

    let key: keyof IAddMovieForm

    for ( key of Object.keys(state.formFields) ) {
        const value = String(state.formFields[key].value).trim()
        console.log('value:', value)
        if (value && value.length > 0) {
            isValidFields = true
        } else {
            isValidFields = false
        }
    }

    return isValidFields
}
