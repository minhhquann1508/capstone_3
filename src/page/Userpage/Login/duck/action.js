import { accountService } from "../../../../service/AccountService"
import { LOGIN_USER } from "./type";

export const actLogin = (data) => {
    return async (dispatch) => {
        try {
            let result = await accountService.login(data);
            if (result.status === 200) {
                dispatch({
                    type: LOGIN_USER,
                    payload: result.data.content
                })
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}