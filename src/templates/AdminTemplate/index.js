import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faFilm, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
const { Header, Sider, Content } = Layout;
export default function AdminTemplate() {
    const { userLogin } = useSelector(state => state.loginReducer);
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    useEffect(() => {
        if (userLogin === null) {
            navigate('/login');
        }
        else {
            if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
                Swal.fire({
                    icon: 'error',
                    text: 'Bạn không có quyền truy cập trang này !',
                }).then(() => {
                    navigate('/')
                })
            }
        }
    }, [location])
    const defaultKey = location.pathname.split('/')[2]
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={defaultKey}
                    onClick={({ key }) => navigate(`/admin/${key}`)}
                    items={[
                        {
                            key: 'dashboard',
                            icon: <FontAwesomeIcon icon={faCircleInfo} />,
                            label: 'Thông tin tài khoản',
                        },
                        {
                            key: 'manageMovie',
                            icon: <FontAwesomeIcon icon={faFilm} />,
                            label: 'Quản lý phim',
                        },
                        {
                            key: 'manageUser',
                            icon: <FontAwesomeIcon icon={faUsers} />,
                            label: 'Quản lý người dùng',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: '0 20px',
                        background: colorBgContainer,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <button className='underline font-medium hover:text-blue-600 duration-300'
                        onClick={() => {
                            localStorage.clear();
                            navigate('/login');
                            window.location.reload();
                        }}
                    >Đăng xuất</button>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 700,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

