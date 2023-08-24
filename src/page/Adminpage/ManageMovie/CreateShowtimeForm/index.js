import React, { useEffect } from 'react'
import { DatePicker, Form, Input, Select, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createShowtimeAction, getListCinemaAction, getListCinemaByBrandAction } from '../duck/action';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
export default function CreateShowtimeForm(props) {
    const dispatch = useDispatch();
    const { movieCreateShowtime } = useSelector(state => state.manageMovieReducer);
    const { lstCinema, lstCinemaByBrand } = useSelector(state => state.manageMovieReducer);
    const handleChangeBrand = (value) => {
        dispatch(getListCinemaByBrandAction(value));
    };

    const handleChangeCinema = (value) => {
        formik.setFieldValue('maRap', value)
    }

    const handleChangeDatePicker = (value) => {
        formik.setFieldValue('ngayChieuGioChieu', dayjs(value).format('DD/MM/YYYY hh:mm:ss'))
    }

    const formik = useFormik({
        initialValues: {
            maPhim: movieCreateShowtime,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: 75000
        },
        onSubmit: (value) => {
            dispatch(createShowtimeAction(value, resetForm, props.closeModal))
        }
    })

    const resetForm = () => {
        formik.setFieldValue('maRap', '');
        formik.setFieldValue('giaVe', 75000);
    }

    useEffect(() => {
        dispatch(getListCinemaAction())
    }, [])
    return (
        <Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
        >
            <Form.Item label="Mã phim">
                <Input name='maPhim' disabled value={movieCreateShowtime} />
            </Form.Item>
            <Form.Item label="Hãng">
                <Select
                    onChange={handleChangeBrand}
                    options={lstCinema?.map((cinema) => {
                        return {
                            label: cinema.tenHeThongRap,
                            value: cinema.maHeThongRap
                        }
                    })}
                />
            </Form.Item>
            <Form.Item label="Cụm rạp">
                <Select
                    value={formik.values.maRap}
                    onChange={handleChangeCinema}
                    options={lstCinemaByBrand?.map((cinema) => {
                        return {
                            value: cinema.maCumRap,
                            label: cinema.tenCumRap
                        }
                    })}
                />
            </Form.Item>
            <Form.Item label="Ngày chiếu">
                <DatePicker format='hh:mm:ss DD/MM/YYYY' showTime onChange={handleChangeDatePicker} className='w-full' />
            </Form.Item>
            <Form.Item label="Giá vé">
                <InputNumber min={75000} max={150000} value={formik.values.giaVe} onChange={(value) => {
                    formik.setFieldValue('giaVe', value);
                }} defaultValue={75000} />
            </Form.Item>
            <div className='text-right'>
                <button type='submit' className='p-2 bg-blue-600 font-medium text-white hover:bg-blue-700 duration-300 rounded-md'>Thêm phim</button>
            </div>
        </Form>
    )
}
