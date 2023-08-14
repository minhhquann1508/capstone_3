import BaseService from "./BaseService";

class CinemaService extends BaseService {
    constructor() {
        super()
    }
    getLstSeat = (id) => {
        return this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`)
    }
}

export const cinemaService = new CinemaService();