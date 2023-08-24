import { GROUP_ID } from "../util/constant";
import BaseService from "./BaseService";

class ManageUserService extends BaseService {
    constructor() {
        super()
    }
    getLstUser = (page) => {
        return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${GROUP_ID}&soTrang=${page}&soPhanTuTrenTrang=15`);
    }
    deleteUser = (taiKhoan) => {
        return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
    }
    getInfomation = (taiKhoan) => {
        return this.post(`api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`, '');
    }
    updateUser = (data) => {
        return this.post('api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', data);
    }
    addUser = (data) => {
        return this.post('api/QuanLyNguoiDung/ThemNguoiDung', data);
    }
    getFindingUser = (keyword) => {
        return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${GROUP_ID}&tuKhoa=${keyword}`);
    }
}

export const manageUserService = new ManageUserService();