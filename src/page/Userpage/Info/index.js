import React, { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import InfoForm from './InfoForm';
import History from './History';
const { Header, Sider, Content } = Layout;
export default function Info() {
    const { type } = useParams();
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={type}
                    onClick={({ key }) => {
                        navigate(`/info/${key}`)
                    }}
                    items={[
                        {
                            key: 'dashboard',
                            icon: <UserOutlined />,
                            label: 'Thông tin người dùng',
                        },
                        {
                            key: 'manageMovie',
                            icon: <VideoCameraOutlined />,
                            label: 'Lịch sử đặt vé',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
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
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 600,
                        background: colorBgContainer,
                    }}
                >
                    {type === 'dashboard' ? <InfoForm /> : <History />}
                </Content>
            </Layout>
        </Layout>
    );
}
