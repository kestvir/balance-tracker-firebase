export const alertReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ERROR':
            return {
                ...state,
                errorMessage: { message: action.errorMessage }
            }
        case 'SET_SUCCESS':
            return {
                ...state,
                successMessage: { message: action.successMessage }
            }
        default:
            return state

    }
}