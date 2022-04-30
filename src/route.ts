import { GoodsManage } from './pages/manage/GoodsManage'
import {PersonalManage } from './pages/manage/PersonalManage'
import {SellManage} from './pages/manage/SellManage'
import {StockManage} from './pages/manage/StockManage'
import {DepotManage} from './pages/manage/DepotManage'
import {Login} from './pages/login/index'
import Cookies from 'js-cookie'

const token = Cookies.get('token');
let routes:Array<{path:string;redirect?:string;component:()=>JSX.Element}>=[];
if(token){
 routes= [{
    path: '/',
    redirect:'/goods/manage',
    component: GoodsManage
},{
    path: '/goods/manage',
    component: GoodsManage
},{
    path: '/personal/manage',
    component: PersonalManage

},{
    path: '/sell/manage',
    component: SellManage 
},{
    path: '/stock/manage',
    component: StockManage  
},{
    path: '/depot/manage',
    component: DepotManage 
}]
}else{
     routes=[
        {
            path: '/',
            redirect:'/login',
            component: Login
        },
        {
            path: '/login',
            component: Login
        },{
            path: '*',
            redirect: '/login',
            component: Login
        }
    ]
}

export default routes;