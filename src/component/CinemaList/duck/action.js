import { cinemaService } from "../../../service/CinemaService"
import { FETCH_REQUEST, FETCH_REQUEST_FAIL, FETCH_REQUEST_LIST_CINEMA_BRAND, FETCH_REQUEST_SUCCESS } from "./types"

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
//Lấy danh sách hệ thống lịch chiếu theo brand
export const fetchCinemaData = (maHeThongRap) => {
    return async (dispatch) => {
        dispatch(actFetchRequest())
        try {
            let result = await cinemaService.getDataOfCinema(maHeThongRap);
            if (result.status === 200) {
                dispatch(actFetchSuccess(result.data.content))
            }
        }
        catch (error) {
            dispatch(actFetchFail(error.response))
        }
    }
}
