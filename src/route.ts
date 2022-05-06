import { GoodsManage } from './pages/manage/GoodsManage'
import { GoodsManageAdd } from './pages/GoodsManage/Add'
import { GoodsManageEdit } from './pages/GoodsManage/Edit'
import {PersonalManage } from './pages/manage/PersonalManage'
import { PersonalManageAdd } from './pages/PersonalManage/Add'
import { PersonalManageEdit } from './pages/PersonalManage/Edit'
import {SellManage} from './pages/manage/SellManage'
import { SellManageAdd } from './pages/SellManage/Add'
import { SellManageEdit } from './pages/SellManage/Edit'
import {StockManage} from './pages/manage/StockManage'
import { StockManageAdd } from './pages/StockManage/Add'
import { StockManageEdit } from './pages/StockManage/Edit'
import {DepotManage} from './pages/manage/DepotManage'
import { DepotManageAdd } from './pages/DepotManage/Add'
import { DepotManageEdit } from './pages/DepotManage/Edit'
import {Login} from './pages/login/index'

const token = 'acf7f89588d0f245a866a515ba4195a8';
let routes:Array<{path:string;redirect?:string;component:()=>JSX.Element}>=[];
if(token){
 routes= [{
    path: '/',
    redirect:'/goods/manage',
    component: GoodsManage
},{
    path: '/home',
    redirect:'/goods/manage',
    component: GoodsManage
},{
    path: '/goods/manage',
    component: GoodsManage
},
{
    path: '/goods/add',
    component:GoodsManageAdd
},
{
    path: '/goods/edit/:id',
    component:GoodsManageEdit
},
{
    path: '/personal/manage',
    component: PersonalManage

},
{
    path: '/personal/add',
    component:PersonalManageAdd
},
{
    path: '/personal/edit/:id',
    component:PersonalManageEdit
},{
    path: '/sell/manage',
    component: SellManage 
},
{
    path: '/sell/add',
    component:SellManageAdd
},
{
    path: '/sell/edit/:id',
    component:SellManageEdit
},{
    path: '/stock/manage',
    component: StockManage  
},
{
    path: '/stock/add',
    component:StockManageAdd
},
{
    path: '/stock/edit/:id',
    component:StockManageEdit
},{
    path: '/depot/manage',
    component: DepotManage 
},{
    path: '/depot/add',
    component:DepotManageAdd
},
{
    path: '/depot/edit/:id',
    component:DepotManageEdit
},]
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