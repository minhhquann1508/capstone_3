import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { bannerReducer } from '../../component/Carousel/duck/reducer';
const rootReducer = combineReducers({
    bannerReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))