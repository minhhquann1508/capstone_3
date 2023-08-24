import { GROUP_ID } from "../util/constant";
import BaseService from "./BaseService";

class CinemaService extends BaseService {
    constructor() {
        super()
    }
    getLstSeat = (id) => {
        return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`)
    }
    bookTicket = (data) => {
        return this.post(`api/QuanLyDatVe/DatVe`, data)
    }
    getCinemaBrand = () => {
        return this.get(`api/QuanLyRap/LayThongTinHeThongRap`)
    }
    getLstCinemaByBrand = (brand) => {
        return this.get(`api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${brand}`)
    }
    getDataOfCinema = (maHeThongRap) => {
        return this.get(`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=${GROUP_ID}`)
    }
    createShowtime = (data) => {
        return this.post(`api/QuanLyDatVe/TaoLichChieu`, data)
    }
}

export const cinemaService = new CinemaService();