import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { Modal } from 'antd';
import { fetchData, pickSeatAction } from './duck/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCoins, faMobileScreen, faSwatchbook, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { comboFood } from '../../../util/constant';
import { InputNumber } from 'antd';
import PaypalComponents from '../../../component/Paypal';
export default function Checkout() {
    const { userLogin } = useSelector(state => state.loginReducer);
    const { loading, data, error, lstSeat } = useSelector(state => state.checkoutReducer);
    // Xử lý mở modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [totalFood, setTotalFood] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        if (!userLogin) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Bạn cần phải đăng nhập để vào trang đặt vé!',
            }).then(() => {
                navigate('/login')
            })
        }
        else {
            dispatch(fetchData(id))
        }
    }, []);
    const onChange = (value, price) => {
        setTotalFood(value * price);
    };
    // Hàm render danh sách ghế
    const renderLstSeat = () => {
        return data?.danhSachGhe.map((seat) => {
            if (seat.daDat) {
                return (
                    <button key={seat.stt} disabled={true} className='w-10 h-10 bg-red-600 text-white font-medium rounded-lg hover:scale-105 duration-300 border-2 border-gray-700'>{seat.tenGhe}</button>
                )
            }
            else {
                let index = lstSeat?.findIndex((item) => item.maGhe === seat.maGhe);
                if (index !== -1) {
                    return (
                        <button key={seat.stt} onClick={() => {
                            dispatch(pickSeatAction(seat))
                        }} className='w-10 h-10 bg-green-600 text-white font-medium rounded-lg hover:scale-105 duration-300 border-2 border-gray-700'>{seat.tenGhe}</button>
                    )
                }
                else {
                    if (seat.loaiGhe === 'Thuong') {
                        return (
                            <button key={seat.stt} onClick={() => {
                                dispatch(pickSeatAction(seat))
                            }} className='w-10 h-10 bg-gray-600 text-white font-medium rounded-lg hover:scale-105 duration-300 border-2 border-gray-700'>{seat.tenGhe}</button>
                        )
                    }
                    else {
                        return (
                            <button key={seat.stt} onClick={() => {
                                dispatch(pickSeatAction(seat))
                            }} className='w-10 h-10 bg-pink-600 text-white font-medium rounded-lg hover:scale-105 duration-300 border-2 border-gray-700'>{seat.tenGhe}</button>
                        )
                    }
                }
            }
        })
    }
    //hàm tính tổng tiền
    const calcTotal = () => {
        let totalTicketPrice = lstSeat?.reduce((total, seat) => {
            return total + seat.giaVe;
        }, 0)
        return totalFood + totalTicketPrice;
    }
    //Hàm thực hiện thanh toán
    const handlePaymentEvent = () => {
        if (lstSeat.length <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Bạn chưa chọn ghế!',
            })
        }
        else {
            showModal();
        }
    }
    return (
        <section className='flex justify-center py-10 bg-blue-100'>
            <Modal title={<h1 className='font-medium text-lg text-center pb-3'>Thanh toán</h1>} footer="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <PaypalComponents lstSeat={{ maLichChieu: id, danhSachVe: lstSeat }} total={calcTotal} closeModal={handleCancel} />
            </Modal>
            <div className='w-4/5 flex flex-col lg:flex-row'>
                <div className='w-full lg:w-2/3'>
                    <div className='mb-5'>
                        <h1 className='font-medium text-lg mb-3'>Thông tin hàng ghế</h1>
                        <div className='bg-white rounded-md flex flex-wrap gap-3 p-5 border border-gray-500'>
                            <div className='flex gap-1 items-center'>
                                <button className='w-6 h-6 rounded-md border-2 border-white bg-gray-600'></button>
                                <span>Ghế còn trống</span>
                            </div>
                            <div className='flex gap-1 items-center'>
                                <button className='w-6 h-6 rounded-md border-2 border-white bg-red-600'></button>
                                <span>Ghế đã đặt</span>
                            </div>
                            <div className='flex gap-1 items-center'>
                                <button className='w-6 h-6 rounded-md border-2 border-white bg-green-600'></button>
                                <span>Ghế bạn đang chọn</span>
                            </div>
                            <div className='flex gap-1 items-center'>
                                <button className='w-6 h-6 rounded-md border-2 border-white bg-pink-600'></button>
                                <span>Ghế vip</span>
                            </div>
                        </div>
                    </div>
                    <div className='p-5 border rounded-md border-gray-500 shadow-xl bg-white'>
                        {/* Màn hình */}
                        <div className='flex justify-center mb-2'>
                            <div className='w-2/3 h-3 bg-black border border-gray-100 text-center rounded-b-3xl'></div>
                        </div>
                        <h1 className='text-center uppercase font-medium text-lg mb-5'>Màn hình</h1>
                        {loading ?
                            <div className='flex justify-center'>
                                <div role="status">
                                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                </div>
                            </div>
                            :
                            <div className='grid grid-cols-6 xs:grid-cols-7 sm:grid-cols-8 md:grid-cols-12 gap-3'>
                                {renderLstSeat()}
                            </div>
                        }
                    </div>
                </div>
                <div className='w-full lg:w-1/3 mt-5 lg:mt-0 lg:ml-5'>
                    <h1 className='font-medium text-lg mb-3 text-center'>Thông tin phim</h1>
                    {/* Thông tin của phim */}
                    {loading ?
                        <div className='rounded-md border border-gray-500 bg-white px-3 py-5 flex justify-center gap-3 mb-5'>
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                            </div>
                        </div>
                        :
                        <div className='rounded-md border border-gray-500 bg-white px-3 py-5 flex gap-3 mb-5'>
                            <div className='w-32 rounded-sm overflow-hidden'>
                                <img src={data?.thongTinPhim.hinhAnh} alt="anh" />
                            </div>
                            <div>
                                <h1 className='font-medium uppercase'>{data?.thongTinPhim.tenPhim}</h1>
                                <div>
                                    <label className='text-sm font-medium'>Ngày chiếu:</label>
                                    <p className='text-sm'>{data?.thongTinPhim.gioChieu},{data?.thongTinPhim.ngayChieu}</p>
                                </div>
                                <div>
                                    <label className='text-sm font-medium'>Cụm rạp:</label>
                                    <p className='text-sm'>{data?.thongTinPhim.tenRap}, {data?.thongTinPhim.tenCumRap}</p>
                                </div>
                                <div>
                                    <label className='text-sm font-medium'>Địa chỉ:</label>
                                    <p className='text-sm hover:underline hover:text-blue-600 duration-300 cursor-pointer'>{data?.thongTinPhim.diaChi}</p>
                                </div>
                            </div>
                        </div>
                    }
                    {/* Thông tin người dùng */}
                    <h1 className='font-medium text-lg mb-3 text-center'>Thông tin đặt vé</h1>
                    <div className='rounded-md border bg-white border-gray-500 p-3 mb-5'>
                        <div className='flex mb-2'>
                            <h6 className='text-sm font-medium flex items-center gap-0.5'><FontAwesomeIcon icon={faUser} /> <span>Họ tên:</span></h6>
                            <span className='pl-2 text-sm'>{userLogin?.hoTen}</span>
                        </div>
                        <div className='flex mb-2'>
                            <h6 className='text-sm font-medium flex items-center gap-0.5'><FontAwesomeIcon icon={faEnvelope} /> <span>Email:</span></h6>
                            <span className='pl-2 text-sm'>{userLogin?.email}</span>
                        </div>
                        <div className='flex mb-2'>
                            <h6 className='text-sm font-medium flex items-center gap-0.5'><FontAwesomeIcon icon={faMobileScreen} /> <span>SĐT:</span></h6>
                            <span className='pl-2 text-sm'>{userLogin?.soDT}</span>
                        </div>
                        <div className='mb-2'>
                            <h6 className='text-sm font-medium flex items-center gap-0.5 mb-1'><FontAwesomeIcon icon={faSwatchbook} /> <span>Hàng ghế</span></h6>
                            <div className='flex flex-wrap gap-2'>
                                {lstSeat.length <= 0 ? <span className='text-sm'>Chưa có ghế được chọn</span> :
                                    lstSeat?.sort((a, b) => a.tenGhe - b.tenGhe).map((seat, index) => {
                                        return (
                                            <button key={index} className='border-2 border-black text-xs font-medium py-1 px-1.5 rounded-lg'>{seat.tenGhe}</button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='mb-2'>
                            <h6 className='text-sm font-medium flex items-center gap-0.5 mb-1'><FontAwesomeIcon icon={faUtensils} /> <span>Sản phẩm đi kèm</span></h6>
                            <div>
                                {comboFood.map((item) => {
                                    return (
                                        <div key={item.id} className='flex'>
                                            <div className='w-24'>
                                                <img src={item.img} alt={item.id} />
                                            </div>
                                            <div className='pl-3'>
                                                <h1 className='font-medium text-sm mb-2'>{item.name}</h1>
                                                <InputNumber min={0} className='border-2 w-16 border-black focus:border-blue-600' onChange={(value) => onChange(value, item.price)} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='flex mb-2'>
                                <h6 className='text-sm font-medium flex items-center gap-0.5'><FontAwesomeIcon icon={faCoins} /> <span>Tổng tiền:</span></h6>
                                <span className='pl-2 text-sm'>{calcTotal().toLocaleString()} đ</span>
                            </div>
                            <button className='font-medium bg-blue-600 p-2 rounded-md text-white hover:scale-105 hover:bg-blue-700 duration-300'
                                onClick={handlePaymentEvent}
                            >Thanh toán</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
