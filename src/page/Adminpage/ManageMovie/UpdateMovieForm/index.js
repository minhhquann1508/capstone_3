import React, { useEffect, useRef, useState } from 'react';
import { Button, Cascader, DatePicker, Form, Input, InputNumber, Radio, Select, Switch, TreeSelect } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { updateMovieAction } from '../duck/action';
import { schemaUpdateMovie } from '../../../../util/schema';
import { GROUP_ID } from '../../../../util/constant';
export default function UpdateMovieForm(props) {
    const { data, loading, error, movieUpdate } = useSelector(state => state.manageMovieReducer);
    const [img, setImg] = useState('');
    const fileRef = useRef(null);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            maPhim: 0,
            tenPhim: '',
            moTa: '',
            trailer: '',
            ngayKhoiChieu: '',
            maNhom: GROUP_ID,
            danhGia: 0,
            hot: false,
            dangChieu: false,
            sapChieu: false,
            hinhAnh: null
        },
        validationSchema: schemaUpdateMovie,
        enableReinitialize: true,
        onSubmit: (values) => {
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    if (key === 'ngayKhoiChieu') {
                        formData.append('ngayKhoiChieu', dayjs(values.ngayKhoiChieu).format('DD/MM/YYYY'));
                    }
                    else {
                        formData.append(key, values[key]);
                    }
                }
                else {
                    if (typeof values.hinhAnh !== 'string') {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);
                    }
                    else {
                        formData.append('hinhAnh', values.hinhAnh);
                    }
                }
            }
            dispatch(updateMovieAction(formData, props.closeModal, props.setPage))

        }
    })
    useEffect(() => {
        formik.setFieldValue('maPhim', movieUpdate.maPhim);
        formik.setFieldValue('tenPhim', movieUpdate.tenPhim);
        formik.setFieldValue('moTa', movieUpdate.moTa);
        formik.setFieldValue('trailer', movieUpdate.trailer);
        formik.setFieldValue('danhGia', movieUpdate.danhGia);
        formik.setFieldValue('ngayKhoiChieu', dayjs(movieUpdate.ngayKhoiChieu));
        formik.setFieldValue('hot', movieUpdate.hot);
        formik.setFieldValue('dangChieu', movieUpdate.dangChieu);
        formik.setFieldValue('sapChieu', movieUpdate.sapChieu);
        formik.setFieldValue('hinhAnh', movieUpdate.hinhAnh);
        setImg(movieUpdate.hinhAnh)
    }, [movieUpdate]);

    //set value cho các ô input thường
    const handleChangeInputValue = (name, e) => {
        let value = e.target.value
        formik.setFieldValue(name, value);
    }
    //Set value cho ô input number value
    const handleChangeNumberInputValue = (value, name) => {
        formik.setFieldValue(name, value);
    }
    //Set value cho các ô check
    const handleChangeCheckedInputValue = (value, name) => {
        if (name === 'dangChieu') {
            formik.setFieldValue('dangChieu', value);
            formik.setFieldValue('sapChieu', !value);
        }
        else {
            formik.setFieldValue(name, value);
        }
    }

    const handleChangeDatePickerValue = (value, name) => {
        formik.setFieldValue(name, dayjs(value));
    }

    //set value ô file
    const handleChangeFileInputValue = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setImg(e.target.result);
        }
        formik.setFieldValue('hinhAnh', file);
    }

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
                <Input disabled={true} value={formik.values.maPhim} />
            </Form.Item>
            <Form.Item label="Tên phim">
                <Input onChange={(e) => handleChangeInputValue('tenPhim', e)} value={formik.values.tenPhim} />
                {formik.touched.tenPhim && formik.errors.tenPhim ? <p className='text-red-600'>{formik.errors.tenPhim}</p> : ''}
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input value={formik.values.moTa} onChange={(e) => handleChangeInputValue('moTa', e)} />
                {formik.touched.moTa && formik.errors.moTa ? <p className='text-red-600'>{formik.errors.moTa}</p> : ''}
            </Form.Item>
            <Form.Item label="Trailer">
                <Input value={formik.values.trailer} onChange={(e) => handleChangeInputValue('trailer', e)} />
                {formik.touched.trailer && formik.errors.trailer ? <p className='text-red-600'>{formik.errors.trailer}</p> : ''}
            </Form.Item>
            <Form.Item label="Ngày chiếu">
                <DatePicker format='DD/MM/YYYY' onChange={(value) => handleChangeDatePickerValue(value, 'ngayKhoiChieu')} value={formik.values.ngayKhoiChieu} />
                {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu ? <p className='text-red-600'>{formik.errors.ngayKhoiChieu}</p> : ''}
            </Form.Item>
            <Form.Item label="Đánh giá">
                <InputNumber min={0} max={10} value={formik.values.danhGia} onChange={(value) => handleChangeNumberInputValue(value, 'danhGia')} />
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch style={{ border: '1px solid #ccc' }} onChange={(value) => handleChangeCheckedInputValue(value, 'dangChieu')} checked={formik.values.dangChieu} />
            </Form.Item>
            <Form.Item label="Phim hot" valuePropName="checked">
                <Switch style={{ border: '1px solid #ccc' }} onChange={(value) => handleChangeCheckedInputValue(value, 'hot')} checked={formik.values.hot} />
            </Form.Item>
            <Form.Item label="Hình ảnh" valuePropName="checked">
                <input ref={fileRef} type="file" onChange={handleChangeFileInputValue} accept=".jpg, .jpeg, .png, .gif" />
                {formik.touched.hinhAnh && formik.errors.hinhAnh ? <p className='text-red-600'>{formik.errors.hinhAnh}</p> : ''}
            </Form.Item>
            <div>
                <img src={img} alt="anh" width={120} height={120} />
            </div>
            <div className='text-right'>
                <button type='submit' className='bg-blue-600 p-2 font-medium text-white hover:bg-blue-700 duration-300 rounded-md'>Cập nhật</button>
            </div>
        </Form>
    );
}