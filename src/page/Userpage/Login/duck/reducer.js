import { LOGIN_USER } from "./type"

const initialState = {
    userLogin: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER: {

            return { ...state };
        }
        default:
            return { ...state };
    }
}
