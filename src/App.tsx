import {
  Layout,
  Avatar,
  Space,
  Popover,
  Button,
  message
} from './antdmoudle';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import { UserOutlined} from '@ant-design/icons';
import routes from './route'
import  MenuList  from './components/MenuList';
import React, { useEffect, useState } from 'react';
import { NotFound } from './pages/404/index';
import Cookies from "js-cookie";

const { Header, Content, Sider } = Layout;

const clearcookie = ()=>{
    Cookies.remove('token');
    message.success('注销成功');
    setTimeout(() => {
      window.location.href="/login";
    }, 2000);
}

const content =  (
  <div>
    <p><Button onClick={clearcookie}>注销</Button></p>
  </div>
);


export default function App() {
  const [token,setToken] = useState(''); //登录态
  const [user,setUser] = useState(''); // 登陆角色
  
  //验证
  // const verifyToken = async(auth:any)=>{
  //   const res = await verify({token:auth});
  //   if(res.data){
  //     setToken(auth);
  //     setUser(res.data);
  //   }else{
  //     Cookies.remove('token');
  //   }
  // }

  useEffect(()=>{
    // const auth = Cookies.get('token');
    setToken('acf7f89588d0f245a866a515ba4195a8');
    setUser('admin');
    // if(auth){
    //    verifyToken(auth);
    // }
  },[])

 return <Layout>
   {token &&
    <Header className="header">
      <div className="title">商场进存销管理系统</div>
      <div className="user">
      <Space>
      <Popover content={content} trigger="hover">
      <Avatar size="large" icon={<UserOutlined />} />
        {user}
        </Popover>
        </Space>
      </div>
    </Header>
}
    <Layout>
      <BrowserRouter>
      {token &&<Sider width={200} className="site-layout-background">
        <MenuList/>
        </Sider>}
    <Layout style={token?{ padding: '0 24px 24px' }:{padding:'0'}}>
        <Content
          className="site-layout-background"
          style={token?{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }:{
            padding:0,
            margin:0,
            minHeight:280
          }}
        >
        <Routes>
          {routes.map((route,index)=>{
            return (<Route key={index} path={route.path} element={route.redirect?<Navigate to={route.redirect}/>:<route.component/>}></Route>)
          })}
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
        </Content>
      </Layout>
      </BrowserRouter>
    </Layout>
  </Layout>
}