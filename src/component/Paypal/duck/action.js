import { cinemaService } from "../../../service/CinemaService"
import { FETCH_REQUEST, FETCH_REQUEST_FAIL, FETCH_REQUEST_SUCCESS } from "./types"
import Swal from "sweetalert2"
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

export const fetchDataBookingTicket = (data, closeModal) => {
    return async (dispatch) => {
        dispatch(actFetchRequest())
        try {
            let result = await cinemaService.bookTicket(data);
            if (result.status === 200) {
                await dispatch(actFetchSuccess(result.data));
                await closeModal();
                await Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Bạn đã đặt vé thành công',
                })
                window.location.reload();
            }
        }
        catch (error) {
            dispatch(actFetchFail(error.response))
        }
    }
}
