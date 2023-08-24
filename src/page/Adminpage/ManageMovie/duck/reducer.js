import { FETCH_REQUEST, FETCH_REQUEST_FAIL, FETCH_REQUEST_SUCCESS, FINDING_MOVIE, GET_CINEMA_LIST, GET_LST_CINEMA_BY_BRAND, GET_MOVIE_CREATE_SHOWTIME, GET_MOVIE_UPDATE } from "./types";

const initialState = {
    loading: false,
    data: null,
    error: null,
    movieUpdate: null,
    movieCreateShowtime: null,
    lstCinema: null,
    lstCinemaByBrand: null
}

export const manageMovieReducer = (state = initialState, action) => {
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
        case GET_MOVIE_UPDATE: {
            state.movieUpdate = action.payload;
            return { ...state };
        }
        case GET_MOVIE_CREATE_SHOWTIME: {
            state.movieCreateShowtime = action.payload;
            return { ...state };
        }
        case GET_CINEMA_LIST: {
            state.lstCinema = action.payload;
            return { ...state };
        }
        case GET_LST_CINEMA_BY_BRAND: {
            state.lstCinemaByBrand = action.payload;
            return { ...state };
        }
        case FINDING_MOVIE: {
            state.data = action.payload;
            return { ...state };
        }
        default: {
            return { ...state };
        }
    }
}