import { cinemaService } from "../../../../service/CinemaService"
import { FETCH_REQUEST, FETCH_REQUEST_FAIL, FETCH_REQUEST_SUCCESS, PICK_SEAT } from "./types"

const actFetchRequest = () => {
    return {
        type: FETCH_REQUEST
    }
}

const actFetchSuccess = (data) => {
    return {
        type: FETCH_REQUEST_SUCCESS,
        payload: data
    }
}

const actFetchFail = (error) => {
    return {
        type: FETCH_REQUEST_FAIL,
        payload: error
    }
}

export const fetchData = (id) => {
    return async (dispatch) => {
        dispatch(actFetchRequest())
        try {
            let result = await cinemaService.getLstSeat(id);
            if (result.status === 200) {
                dispatch(actFetchSuccess(result.data.content))
            }
        }
        catch (error) {
            dispatch(actFetchFail(error.response))
        }
    }
}

export const pickSeatAction = (seat) => {
    return (dispatch) => {
        dispatch({
            type: PICK_SEAT,
            payload: seat
        })
    }
}