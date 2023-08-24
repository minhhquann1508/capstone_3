import { GROUP_ID } from "../util/constant";
import BaseService from "./BaseService";

class ManageMovieService extends BaseService {
    constructor() {
        super()
    }
    getLstMovie = (page) => {
        return this.get(`api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${GROUP_ID}&soTrang=${page}&soPhanTuTrenTrang=15`);
    }
    deleteMovie = (maPhim) => {
        return this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
    }
    addMovie = (formData) => {
        return this.post(`api/QuanLyPhim/ThemPhimUploadHinh`, formData);
    }
    getMovieUpdate = (maPhim) => {
        return this.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
    }
    updateMovie = (formData) => {
        return this.post(`api/QuanLyPhim/CapNhatPhimUpload`, formData);
    }
    findingMovieByName = (keyword, page) => {
        return this.get(`api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${GROUP_ID}&tenPhim=${keyword}&soTrang=${page}&soPhanTuTrenTrang=15`);
    }
}

export const manageMovieService = new ManageMovieService();