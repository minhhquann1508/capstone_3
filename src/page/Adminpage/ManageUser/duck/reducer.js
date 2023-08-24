import { FETCH_REQUEST, FETCH_REQUEST_FAIL, FETCH_REQUEST_SUCCESS, FINDING_USER, GET_USER_INFO } from "./types";

const initialState = {
    loading: false,
    data: null,
    error: null,
    userUpdate: null
}

export const manageUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUEST: {
            state.loading = true;
            state.data = null;
            state.error = null;
            return { ...state };
        }
        case FETCH_REQUEST_SUCCESS: {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state };
        }
        case FETCH_REQUEST_FAIL: {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return { ...state };
        }
        case GET_USER_INFO: {
            state.userUpdate = action.payload;
            return { ...state };
        }
        case FINDING_USER: {
            state.data = action.payload;
            return { ...state };
        }
        default: {
            return { ...state };
        }
    }
}