import Swal from "sweetalert2"
import { accountService } from "../../../../service/AccountService"
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
            let result = await accountService.getInfomation();
            if (result.status === 200) {
                dispatch(actFetchSuccess(result.data.content))
            }
        }
        catch (error) {
            dispatch(actFetchFail(error.response))
        }
    }
}

export const updateInfoAction = (data, setIsUpdate) => {
    return async (dispatch) => {
        try {
            let result = await accountService.updateUser(data);
            if (result.status === 200) {
                await Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Chúc mừng',
                    text: 'Cập nhật thông tin thành công',
                    showConfirmButton: false,
                    timer: 3000
                })
                await dispatch(fetchData())
                await setIsUpdate(false)
            }
        }
        catch (error) {
            await Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Opps..',
                text: error.response.data.content,
                showConfirmButton: false,
                timer: 3000
            })
        }
    }
}
