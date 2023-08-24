import React, { useRef, useState } from 'react';
import { DatePicker, Form, Input, InputNumber, Switch } from 'antd';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { addMovieAction } from '../duck/action';
import { schemaMovie } from '../../../../util/schema';
import { GROUP_ID } from '../../../../util/constant';
const AddMovieForm = (props) => {
    const [img, setImg] = useState('');
    const inputRef = useRef(null);
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
            hinhAnh: ''
        },
        validationSchema: schemaMovie,
        onSubmit: (values) => {
            const formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key])
                }
                else {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name)
                }
            }
            dispatch(addMovieAction(formData, props.closeModal, resetForm, props.setPage));
        }
    })

    const resetForm = () => {
        formik.resetForm();
        inputRef.current.value = '';
        setImg('');
    }
    //set value cho các ô input thường
    const handleChangeInputValue = (name, value) => {
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
    //Set value cho ô datepicker
    const handleChangeDatePickerValue = (value, name) => {
        formik.setFieldValue(name, dayjs(value).format('DD/MM/YYYY'));
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
            <Form.Item label="Tên phim">
                <Input name='tenPhim' onChange={(e) => handleChangeInputValue('tenPhim', e.target.value)} value={formik.values.tenPhim} />
                {formik.touched.tenPhim && formik.errors.tenPhim ? <p className='text-red-600'>{formik.errors.tenPhim}</p> : ''}
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name='moTa' onChange={(e) => handleChangeInputValue('moTa', e.target.value)} value={formik.values.moTa} />
                {formik.touched.moTa && formik.errors.moTa ? <p className='text-red-600'>{formik.errors.moTa}</p> : ''}
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name='trailer' onChange={(e) => handleChangeInputValue('trailer', e.target.value)} value={formik.values.trailer} />
                {formik.touched.trailer && formik.errors.trailer ? <p className='text-red-600'>{formik.errors.trailer}</p> : ''}
            </Form.Item>
            <Form.Item label="Ngày chiếu">
                <DatePicker format='DD/MM/YYYY' onChange={(value) => handleChangeDatePickerValue(value, 'ngayKhoiChieu')} />
                {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu ? <p className='text-red-600'>{formik.errors.ngayKhoiChieu}</p> : ''}
            </Form.Item>
            <Form.Item label="Đánh giá">
                <InputNumber name='danhGia' min={0} max={10} onChange={(value) => handleChangeNumberInputValue(value, 'danhGia')} value={formik.values.danhGia} />
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch name='dangChieu' style={{ border: '1px solid #ccc' }} onChange={(value) => handleChangeCheckedInputValue(value, 'dangChieu')} checked={formik.values.dangChieu} />
            </Form.Item>
            <Form.Item label="Phim hot" valuePropName="checked">
                <Switch name='hot' style={{ border: '1px solid #ccc' }} onChange={(value) => handleChangeCheckedInputValue(value, 'hot')} checked={formik.values.hot} />
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <input type="file" ref={inputRef} onChange={handleChangeFileInputValue} accept=".jpg, .jpeg, .png, .gif" />
                {formik.touched.hinhAnh && formik.errors.hinhAnh ? <p className='text-red-600'>{formik.errors.hinhAnh}</p> : ''}
            </Form.Item>
            <div className='pl-3'>
                <img src={img} alt="poster" width={100} height={100} />
            </div>
            <div className='text-right'>
                <button type='submit' className='p-2 bg-blue-600 font-medium text-white hover:bg-blue-700 duration-300 rounded-md'>Thêm phim</button>
            </div>
        </Form>
    );
};
export default AddMovieForm;