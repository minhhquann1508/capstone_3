import Swal from "sweetalert2"
import { manageUserService } from "../../../../service/ManageUserService"
import { FETCH_REQUEST, FETCH_REQUEST_FAIL, FETCH_REQUEST_SUCCESS, FINDING_USER, GET_USER_INFO } from "./types"

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

export const fetchLstUserData = (page) => {
    return async (dispatch) => {
        dispatch(actFetchRequest())
        try {
            let result = await manageUserService.getLstUser(page);
            if (result.status === 200) {
                dispatch(actFetchSuccess(result.data.content))
            }
        }
        catch (error) {
            dispatch(actFetchFail(error.response.data.content))
        }
    }
}

export const deletedUserAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            let result = await manageUserService.deleteUser(taiKhoan);
            if (result.status === 200) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Xóa người dùng thành công!',
                })
                await dispatch(fetchLstUserData(1))
            }
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.content,
            })
        }
    }
}

export const getUserDataAction = (taiKhoan, setIsUpdateModalOpen) => {
    return async (dispatch) => {
        try {
            let result = await manageUserService.getInfomation(taiKhoan);
            if (result.status === 200) {
                await dispatch({
                    type: GET_USER_INFO,
                    payload: result.data.content
                })
                await setIsUpdateModalOpen(true);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}

export const updateUserAction = (data, closeModal) => {
    return async (dispatch) => {
        try {
            let result = await manageUserService.updateUser(data);
            if (result.status === 200) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Cập nhật thông tin người dùng thành công!',
                })
                await closeModal();
                await dispatch(fetchLstUserData(1))
            }
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.content,
            })
        }
    }
}

export const addUserAction = (data, resetForm, closeModal) => {
    return async (dispatch) => {
        try {
            let result = await manageUserService.addUser(data);
            if (result.status === 200) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Thêm người dùng thành công!',
                })
                await resetForm();
                await closeModal();
                await dispatch(fetchLstUserData(1))
            }
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.content,
            })
        }
    }
}

//Tìm kiếm người dùng
export const findingUserAction = (keyword) => {
    return async (dispatch) => {
        if (keyword === '') {
            dispatch(fetchLstUserData(1))
        }
        else {
            try {
                let result = await manageUserService.getFindingUser(keyword);
                if (result.status === 200) {
                    await dispatch({
                        type: FINDING_USER,
                        payload: result.data.content
                    })
                }
            }
            catch (error) {
                dispatch(actFetchFail(error.response.data.content))
            }
        }
    }
}
