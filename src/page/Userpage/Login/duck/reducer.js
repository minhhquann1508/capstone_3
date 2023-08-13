import { ACCESS_TOKEN, USER_LOGIN } from "../../../../util/constant";
import { LOGIN_USER } from "./type"
let user = null;
let userToken = null;
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
    userToken = localStorage.getItem(ACCESS_TOKEN);
}
const initialState = {
    userLogin: user,
    accessToken: userToken
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER: {
            state.userLogin = action.payload;
            state.accessToken = action.payload.accessToken;
            localStorage.setItem(USER_LOGIN, JSON.stringify(action.payload));
            localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
            return { ...state };
        }
        default:
            return { ...state };
    }
}
