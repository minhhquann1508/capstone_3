import * as Yup from 'yup';
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,50}$/;
const phoneRegex = /^0\d{9}$/;
const nameRegex = /^[a-zA-Z\s]+$/
const urlRegex = /^(http[s]?:\/\/){0,1}(www\.)?[a-zA-Z0-9.\-]+(\.[a-zA-Z]{2,3})(:[0-9]+)?(\/.*)?$/;
export const loginSchema = Yup.object().shape({
    taiKhoan: Yup.string()
        .min(2, 'Tài khoản quá ngắn')
        .max(50, 'Tài khoản vượt quá số ký tự cho phép')
        .required('Tài khoản không được bỏ trống'),
    matKhau: Yup.string()
        .matches(passwordRegex, 'Mật khẩu từ 8-50 ký tự bao gồm chữ thường,chữ hoa,số và ký tự đặc biệt')
        .required('Mật khẩu không được bỏ trống'),
});

export const registerSchema = Yup.object().shape({
    taiKhoan: Yup.string()
        .min(2, 'Tài khoản quá ngắn')
        .max(50, 'Tài khoản vượt quá số ký tự cho phép')
        .required('Tài khoản không được bỏ trống'),
    email: Yup.string()
        .email('Email không đúng định dạng')
        .required('Email không được bỏ trống'),
    matKhau: Yup.string()
        .matches(passwordRegex, 'Mật khẩu từ 8-50 ký tự bao gồm chữ thường,chữ hoa,số và ký tự đặc biệt')
        .required('Mật khẩu không được bỏ trống'),
    soDt: Yup.string()
        .matches(phoneRegex, 'Số điện thoại không hợp lệ')
        .required('Số điện thoại không được bỏ trống'),
    hoTen: Yup.string()
        .matches(nameRegex, 'Tên không được có dấu')
        .required('Tên không được bỏ trống'),
});

export const schemaContact = Yup.object().shape({
    email: Yup.string()
        .email('Email không đúng định dạng')
        .required('Email không được bỏ trống'),
    soDt: Yup.string()
        .matches(phoneRegex, 'Số điện thoại không hợp lệ')
        .required('Số điện thoại không được bỏ trống'),
    hoTen: Yup.string()
        .matches(nameRegex, 'Tên không được có dấu')
        .required('Tên không được bỏ trống'),
    content: Yup.string()
        .required('Nội dung không được bỏ trống'),
});


export const schemaMovie = Yup.object().shape({
    tenPhim: Yup.string()
        .required('Tên phim không được bỏ trống'),
    moTa: Yup.string()
        .required('Mô tả không được bỏ trống'),
    trailer: Yup.string()
        .matches(urlRegex, 'Trailer không đúng định dạng')
        .required('Trailer không được bỏ trống'),
    ngayKhoiChieu: Yup.string()
        .required('Ngày khởi chiếu không được bỏ trống'),
    hinhAnh: Yup.mixed()
        .required('Hình ảnh không được bỏ trống'),
});


export const schemaUpdateMovie = Yup.object().shape({
    tenPhim: Yup.string()
        .required('Tên phim không được bỏ trống'),
    moTa: Yup.string()
        .required('Mô tả không được bỏ trống'),
    trailer: Yup.string()
        .matches(urlRegex, 'Trailer không đúng định dạng')
        .required('Trailer không được bỏ trống'),
    ngayKhoiChieu: Yup.date()
        .required('Ngày khởi chiếu không được bỏ trống'),
    hinhAnh: Yup.mixed()
        .required('Hình ảnh không được bỏ trống'),
});

export const schemaFinding = Yup.object().shape({
    keyword: Yup.string()
        .required('Không được bỏ trống'),
});

