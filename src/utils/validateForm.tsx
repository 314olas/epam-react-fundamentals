import { IAddMovieForm, IGlobalContextInterface } from "../types";

export const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

export const validateForm = (state: IGlobalContextInterface): boolean => {
    let isValidFields = true
    let keys = Object.keys(state.formFields) as Array<keyof IAddMovieForm>
    keys.forEach((key) => {
        const value = String(state.formFields[key].value).trim()
        if (value && value.length > 0) {
            isValidFields = true
        } else {
            isValidFields = false
        }
    })

    return isValidFields
}
