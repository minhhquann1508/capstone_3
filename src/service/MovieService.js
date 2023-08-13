import { GROUP_ID } from "../util/constant";
import BaseService from "./BaseService";
class MovieService extends BaseService {
    constructor() {
        super()
    }
    getBanner = () => {
        return this.get('api/QuanLyPhim/LayDanhSachBanner');
    }
    getListMovie = () => {
        return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`)
    }
}

export const movieService = new MovieService();