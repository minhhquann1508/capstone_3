import BaseService from "./BaseService";
class AccountService extends BaseService {
    constructor() {
        super()
    }
    login = (data) => {
        return this.post('api/QuanLyNguoiDung/DangNhap', data)
    }
    register = (data) => {
        return this.post('api/QuanLyNguoiDung/DangKy', data)
    }
    getInfomation = () => {
        return this.post('api/QuanLyNguoiDung/ThongTinTaiKhoan', '')
    }
    updateUser = (data) => {
        return this.put('api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', data)
    }
}

export const accountService = new AccountService();