import { FETCH_REQUEST, FETCH_REQUEST_FAIL, FETCH_REQUEST_SUCCESS, PICK_SEAT } from "./types";

const initialState = {
    loading: false,
    data: null,
    error: null,
    lstSeat: []
}

export const checkoutReducer = (state = initialState, action) => {
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
        case PICK_SEAT: {
            let cloneLstSeat = [...state.lstSeat];
            let index = cloneLstSeat.findIndex((seat) => seat.maGhe === action.payload.maGhe);
            if (index !== -1) {
                cloneLstSeat.splice(index, 1);
            }
            else {
                cloneLstSeat.push(action.payload);
            }
            state.lstSeat = cloneLstSeat;
            return { ...state };
        }
        default: {
            return { ...state };
        }
    }
}
