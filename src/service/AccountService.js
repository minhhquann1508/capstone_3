import BaseService from "./BaseService";
class AccountService extends BaseService {
    constructor() {
        super()
    }
    login = (data) => {
        return this.post('api/QuanLyNguoiDung/DangNhap', data)
    }
}

export const accountService = new AccountService();