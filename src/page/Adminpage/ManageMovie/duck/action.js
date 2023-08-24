import Swal from "sweetalert2"
import { manageMovieService } from "../../../../service/ManageMovieService"
import { FETCH_REQUEST, FETCH_REQUEST_FAIL, FETCH_REQUEST_SUCCESS, FINDING_MOVIE, GET_CINEMA_LIST, GET_LST_CINEMA_BY_BRAND, GET_MOVIE_CREATE_SHOWTIME, GET_MOVIE_UPDATE } from "./types"
import { cinemaService } from "../../../../service/CinemaService"

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

export const fetchLstMovieData = (page, setActivePage) => {
    return async (dispatch) => {
        dispatch(actFetchRequest())
        try {
            let result = await manageMovieService.getLstMovie(page);
            if (result.status === 200) {
                await dispatch(actFetchSuccess(result.data.content));
                await setActivePage(1);
            }
        }
        catch (error) {
            dispatch(actFetchFail(error.response.data.content))
        }
    }
}

export const deleteMovieAction = (maPhim, setActivePage) => {
    return async (dispatch) => {
        try {
            let result = await manageMovieService.deleteMovie(maPhim);
            if (result.status === 200) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Xóa phim thành công!',
                })
                await dispatch(fetchLstMovieData(1, setActivePage));
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


export const addMovieAction = (formData, closeModal, resetForm, setPage) => {
    return async (dispatch) => {
        try {
            let result = await manageMovieService.addMovie(formData);
            if (result.status === 200) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Thêm phim thành công!',
                })
                await resetForm();
                await closeModal();
                await dispatch(fetchLstMovieData(1, setPage));
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

export const getUpdateMovieAction = (maPhim, setIsAddModalOpen) => {
    return async (dispatch) => {
        try {
            let result = await manageMovieService.getMovieUpdate(maPhim);
            if (result.status === 200) {
                await dispatch({
                    type: GET_MOVIE_UPDATE,
                    payload: result.data.content
                })
                await setIsAddModalOpen(true);
            }
        }
        catch (error) {
            console.log(error.response.data.content);
        }
    }
}

export const updateMovieAction = (formData, closeModal, setPage) => {
    return async (dispatch) => {
        try {
            let result = await manageMovieService.updateMovie(formData);
            if (result.status === 200) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Cập nhật phim thành công!',
                })
                await closeModal();
                await dispatch(fetchLstMovieData(1, setPage));
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


export const getMovieCreateShowtimeAction = (maPhim, setIsCreateShowtime) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: GET_MOVIE_CREATE_SHOWTIME,
                payload: maPhim
            })
            await setIsCreateShowtime(true);
        }
        catch (error) {
            console.log(error);
        }
    }
}

export const findingMovieAction = (keyword, page) => {
    return async (dispatch) => {
        try {
            let result = await manageMovieService.findingMovieByName(keyword, page);
            if (result.status === 200) {
                await dispatch({
                    type: FINDING_MOVIE,
                    payload: result.data.content
                })
            }
        }
        catch (error) {
            console.log(error.response.data.content);
        }
    }
}

export const getListCinemaAction = () => {
    return async (dispatch) => {
        try {
            let result = await cinemaService.getCinemaBrand();
            if (result.status === 200) {
                await dispatch({
                    type: GET_CINEMA_LIST,
                    payload: result.data.content
                })
            }
        }
        catch (error) {
            console.log(error.response.data.content);
        }
    }
}

export const getListCinemaByBrandAction = (brand) => {
    return async (dispatch) => {
        try {
            let result = await cinemaService.getLstCinemaByBrand(brand);
            if (result.status === 200) {
                await dispatch({
                    type: GET_LST_CINEMA_BY_BRAND,
                    payload: result.data.content
                })
            }
        }
        catch (error) {
            console.log(error.response.data.content);
        }
    }
}

export const createShowtimeAction = (data, resetForm, closeModal) => {
    return async (dispatch) => {
        try {
            let result = await cinemaService.createShowtime(data);
            if (result.status === 200) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Tạo lịch chiếu thành công!',
                })
                await resetForm();
                await closeModal();
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