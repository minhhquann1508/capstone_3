import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../duck/action';
import dayjs from 'dayjs';

export default function History() {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.infoReducer);
    useEffect(() => {
        dispatch(fetchData());
    }, []);
    const renderContent = () => {
        return data?.thongTinDatVe.map((item) => {
            return (
                <li key={item.maVe} className="flex flex-col py-6 sm:flex-row sm:justify-between">
                    <div className="flex w-full space-x-2 sm:space-x-4">
                        <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src={item.hinhAnh} alt="Polaroid camera" />
                        <div className="flex flex-col justify-between w-full pb-4">
                            <div className="flex justify-between w-full pb-2 space-x-2">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold leadi sm:pr-8">{item.tenPhim}</h3>
                                    <p className='font-medium'>Thời lượng:<span className="font-normal ml-1 text-sm text-gray-600">{item.thoiLuongPhim} phút</span></p>
                                    <p className='font-medium'>Ngày đặt :<span className="font-normal ml-1 text-sm text-gray-600">{dayjs(item.ngayDat).format('hh:mm A, DD/MM/YYYY')}</span></p>
                                    <p className='font-medium'>Cụm rạp :<span className="font-normal ml-1 text-sm text-gray-600">{item.danhSachGhe[0].tenHeThongRap}</span></p>
                                    <p className='font-medium'>Phòng chiếu :<span className="font-normal ml-1 text-sm text-gray-600">{item.danhSachGhe[0].tenCumRap}</span></p>
                                    <p className='font-medium'>Ghế đã đặt</p>
                                    <div className='flex gap-3 flex-wrap'>
                                        {item.danhSachGhe.sort((a, b) => a.tenGhe - b.tenGhe).map((seat, index) => {
                                            return (
                                                <button key={index} className='border-2 rounded-md border-gray-800 font-medium font-sm w-8 h-8'>{seat.tenGhe}</button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li >
            )
        })
    }
    return (
        <div className="flex flex-col max-w-3xl space-y-4 p-5 dark:bg-gray-900 dark:text-gray-100">
            <h2 className="text-xl font-semibold">Danh sách vé bạn đã đặt</h2>
            <ul className="flex flex-col divide-y divide-gray-700">
                {renderContent()}
            </ul>
        </div>
    )
}
