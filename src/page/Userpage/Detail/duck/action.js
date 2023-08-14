import { movieService } from "../../../../service/MovieService"
import { FETCH_REQUEST, FETCH_REQUEST_FAIL, FETCH_REQUEST_SUCCESS } from "./type"
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
            let result = await movieService.getShowtimeByMovieId(id);
            if (result.status === 200) {
                dispatch(actFetchSuccess(result.data.content))
            }
        }
        catch (error) {
            dispatch(actFetchFail(error.response))
        }
    }
}