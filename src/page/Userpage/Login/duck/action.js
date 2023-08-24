import { accountService } from "../../../../service/AccountService"
import { LOGIN_USER } from "./type";
import Swal from "sweetalert2";
export const actLogin = (data, navigate) => {
    return async (dispatch) => {
        try {
            let result = await accountService.login(data);
            if (result.status === 200) {
                dispatch({
                    type: LOGIN_USER,
                    payload: result.data.content
                })
                await Swal.fire({
                    icon: 'success',
                    text: 'Đăng nhập thành công',
                })
                if (result.data.content.maLoaiNguoiDung === 'QuanTri') {
                    await navigate('/admin/dashboard');
                }
                else {
                    await navigate('/');
                }
            }
        }
        catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                text: error.response.data.content,
            })
        }
    }
}