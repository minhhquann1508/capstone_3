import { accountService } from "../../../../service/AccountService"
import Swal from "sweetalert2";
import { REGISTER_ACCOUNT } from "./types";
export const registerAction = (data, navigate) => {
    return async (dispatch) => {
        try {
            let result = await accountService.register(data);
            if (result.status === 200) {
                await dispatch({
                    type: REGISTER_ACCOUNT
                })
                await Swal.fire({
                    icon: 'success',
                    title: 'Chúc mừng',
                    text: 'Đăng ký thành công',
                })
                await navigate('./login')
            }
        }
        catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Opps...',
                text: error.response.data.content,
            })
        }
    }
}