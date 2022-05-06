import React,{ useEffect, useState} from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import {
    Input,
    Button,
    message
} from '../../antdmoudle';
export function Login():JSX.Element
{
    useDocumentTitle('商场进存销管理系统--登陆页面');
    const [account,setAccount] = useState<string>(); //用户名
    const [password,setPassword] = useState<string>(); // 密码
    useEffect(()=>{
    })


    //提交动作
    const handleSubmit = async(e: any)=>{
        e.preventDefault();
        if(account==='' || password===''){
            message.error('账号或密码不为空');
            return;
        }
        // // const res = await login({account,password});
        // if(res.data ==='success'){
        //     message.success('登陆成功');
        //     Cookies.set('token',res.token); //设置cookie
        //     setTimeout(() => {
        //         window.location.href='/collection/manage'; 
        //     }, 2000);
        // }else{
        //     message.error('账号或者密码错误');
        // }
    }

    return  <div className="bg">
    <div className='content'>
        <div className='system'>
            <span className='first'>商场进存销管理系统</span>
            <div className='profile'>
                <form onSubmit={handleSubmit}>
                <div className="account">账号:&nbsp;&nbsp;&nbsp;<Input className="account" style={{width:'200px'}} name="username" type="text" onChange={(e)=>setAccount(e.target.value)}/></div>
                <div className="password">密&nbsp;&nbsp; 码:&nbsp;&nbsp;&nbsp;<Input className="password" style={{width:'200px'}} name="password" type="password" onChange={(e)=>setPassword(e.target.value)}/></div>
                <Button className="login" type ="primary" htmlType="submit">登陆</Button>
                </form>
            </div>
        </div>
    </div>
</div>;
}