import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { bannerReducer } from '../../component/Carousel/duck/reducer';
import { loginReducer } from '../../page/Userpage/Login/duck/reducer'
import { movieListReducer } from '../../component/MovieList/duck/reducer'
const rootReducer = combineReducers({
    bannerReducer,
    loginReducer,
    movieListReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))