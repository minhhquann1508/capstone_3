import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { bannerReducer } from '../../component/Carousel/duck/reducer';
import { loginReducer } from '../../page/Userpage/Login/duck/reducer'
import { movieListReducer } from '../../component/MovieList/duck/reducer';
import { detailReducer } from "../../page/Userpage/Detail/duck/reducer";
import { checkoutReducer } from "../../page/Userpage/Checkout/duck/reducer";
import { cinemaListReducer } from "../../component/CinemaList/duck/reducer";
import { dashboardReducer } from "../../page/Adminpage/Dashboard/duck/reducer";
import { manageUserReducer } from "../../page/Adminpage/ManageUser/duck/reducer";
import { manageMovieReducer } from "../../page/Adminpage/ManageMovie/duck/reducer";
import { detailListCinemaReducer } from "../../component/DetailListCinema/duck/reducer";
import { listMovieShowtimeReducer } from "../../page/Userpage/ListMovieShowtime/duck/reducer";
import { infoReducer } from "../../page/Userpage/Info/duck/reducer";
import { footerReducer } from "../../component/Footer/duck/reducer";
const rootReducer = combineReducers({
    bannerReducer,
    loginReducer,
    movieListReducer,
    detailReducer,
    checkoutReducer,
    cinemaListReducer,
    dashboardReducer,
    manageUserReducer,
    manageMovieReducer,
    detailListCinemaReducer,
    listMovieShowtimeReducer,
    infoReducer,
    footerReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))