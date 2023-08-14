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
}

export const cinemaService = new CinemaService();