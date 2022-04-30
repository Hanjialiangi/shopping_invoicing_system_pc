import {
    Menu,
} from '../antdmoudle'
import { Link } from 'react-router-dom'
import {
    UserOutlined, 
    LaptopOutlined, 
    NotificationOutlined,
    AccountBookOutlined,
    MessageOutlined
} from '@ant-design/icons'
import { useState, useEffect} from 'react'
import { useLocation} from 'react-router-dom'
import React from 'react'


export default function MenuList():JSX.Element
{

    const [key,setKey] = useState<Array<string>>();

    const location = useLocation();//获取地址栏参数
    
    useEffect(()=>{
        let  initval= location.pathname.split('/')[1];
        let name:Array<string>=[''];
       if(initval==='goods')
        {
            name=['goods_manage']
        }
        else if(initval==='personal'){
            name = ['personal_manage']
        }else if(initval==='sell'){
            name = ['sell_manage']
        }else if(initval==='stock'){
            name = ['stock_manage']
        }else if(initval==='depot'){
            name =['depot_manage']
        }
        setKey(name);
    },[location]);

    return <>
        <Menu
          mode="inline"
          selectedKeys={key}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="goods_manage" icon={<MessageOutlined />}>
            <Link to="/goods/manage">商品管理</Link>
          </Menu.Item>
          <Menu.Item key="personal_manage" icon={<LaptopOutlined />}>
            <Link to="/personal/manage">人事管理</Link>
          </Menu.Item>
          <Menu.Item key="sell_manage"  icon={<UserOutlined/>}>
          <Link to="/sell/manage">销售管理</Link>
          </Menu.Item>
          <Menu.Item  key="stock_manage" icon={<AccountBookOutlined />}>
          <Link to="/stock/manage">进货管理</Link>
          </Menu.Item>
          <Menu.Item  key="depot_manage" icon={<NotificationOutlined/>}>
          <Link to="/depot/manage">库存管理</Link>
          </Menu.Item>
        </Menu>
    </>
}