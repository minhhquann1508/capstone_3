import axios from "axios"
import { CINEMA_DOMAIN } from "../../../util/constant"
import { FETCH_REQUEST, FETCH_REQUEST_FAIL, FETCH_REQUEST_SUCCESS } from "./types"

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

export const fetchData = () => {
    return async (dispatch) => {
        dispatch(actFetchRequest())
        try {
            let result = await axios({
                method: "GET",
                url: `${CINEMA_DOMAIN}/api/cinema`
            });
            if (result.status === 200) {
                dispatch(actFetchSuccess(result.data))
            }
        }
        catch (error) {
            dispatch(actFetchFail(error.response))
        }
    }
}
