'use client'
const ProLayout = dynamic(
  () => import('@ant-design/pro-layout').then(m => m.ProLayout),
  { ssr: false }
);
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import dynamic from "next/dynamic";
import React, { useState } from "react"
const Provider = ({ children }: { children: React.ReactNode }) => {
  const [pathname, setPathname] = useState('/dashboard');
  return (
    <ProLayout
      title="EduRank"
      logo="/logo.png"
      // Header sozlamalari
      fixedHeader={true}
      title="EduRank"
      logo="/logo.png"
      layout="side"
      navTheme="light"
      fixedHeader={true}
      // ✅ Yangi header prop
      actionsRender={() => [
        <Dropdown
          key="user"
          menu={{
            items: [
              { key: 'logout', icon: <LogoutOutlined />, label: 'Chiqish' },
            ],
          }}
        >
          <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
        </Dropdown>,
      ]}
      avatarProps={{
        src: <Avatar icon={<UserOutlined />} />,
        title: 'Ilhomjon',
      }}
      menuDataRender={() => [
        { path: '/dashboard', name: 'Dashboard' },
        { path: '/students', name: 'Studentlar' },
        { path: '/jobs', name: 'Ishlar' },
      ]}
      location={{ pathname }}
      menuItemRender={(item, dom) => (
        <a onClick={() => setPathname(item.path || '/')}>{dom}</a>
      )}
      actionsRender={() => [
        <span key="user">Admin</span>,
      ]}
      // Sidebar
      layout="side"
      navTheme="light"
      menuDataRender={() => [
        { path: '/dashboard', name: 'Dashboard', icon: '📊' },
        { path: '/students', name: 'Studentlar', icon: '👨‍🎓' },
        { path: '/jobs', name: 'Ishlar', icon: '💼' },
      ]}
      location={{ pathname }}
      menuItemRender={(item, dom) => (
        <a onClick={() => setPathname(item.path || '/')}>{dom}</a>
      )}
    >
      {children}
    </ProLayout>
  )
}

export default Provider
