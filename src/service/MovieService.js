import BaseService from "./BaseService";
class MovieService extends BaseService {
    constructor() {
        super()
    }
    getBanner = () => {
        return this.get('api/QuanLyPhim/LayDanhSachBanner');
    }
}

export const movieService = new MovieService();