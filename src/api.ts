import fetch from "cross-fetch";

export async function  request(url: string,type: string,data: string){
    if(type==="POST"){
     const response = await fetch('/api'+url,{method:type,body:data,headers: {
        'content-type': 'application/json'
      }});
      return await response.json();
    }else{
        const response = await fetch('/api'+url,{method:type,body:data});
        return await response.json();
    }
}

/**
 * 获取藏品信息
 */
export function getCollectionInfo(){
    return request('/collect/info','GET','');
}

/**
 * 藏品搜索引擎
 */
export function getCollectionSearchList(data: any){
    const final = JSON.stringify(data);
    return request('/search/collect/list','POST',final);
}

/**
 * 增加藏品信息
 */
export function addCollectionInfo(param: any){
    const data = JSON.stringify(param);
    return request('/collect/info/add','POST',data);
}

/**
 * 删除藏品信息
 */
export function deleteCollectionInfo(data:any){
    return request(`/collect/info/delete/${data}`,'GET','');
}

/**
 * 修改藏品信息
 */
export function updateCollectionInfo(data:any){
    const final = JSON.stringify(data)
    return request('/collect/info/update','POST',final);
}

/**
 * 查看藏品详细信息 by proof
 */
export function getCollectionDetailInfo(proof: any){
    const data = JSON.stringify({proof})
    return request('/collect/info/detail','POST',data);
}

/**
 * 查看藏品所有信息 by proof 
 */
export function getAllCollectionInfo(proof: any){
    return request(`/collect/info/all/${proof}`,'GET','')
}



/**
 * 用户
 */
/**
 * 用户搜索引擎
 */
export function getUserSearchList(data: any){
    const final = JSON.stringify(data);
    return request('/search/user/list','POST',final);
} 

/**
 * 增加用户信息
 */
export function addUserInfo(data: any){
    const final =JSON.stringify(data);
    return request('/user/info/add','POST',final);
}

/**
 * 删除用户信息
 */
export function deleteUserInfo(data: any){
    return request(`/user/info/delete/${data}`,'GET','');
}

/**
 * 修改用户信息
 */
export function updateUserInfo(data: any){
    const final = JSON.stringify(data);
    return request('/user/info/update','POST',final);
}

/**
 * 获取用户信息 by user_id
 */
export function getUserInfo(user_id: any){
    return request(`/user/info/get/${user_id}`,'GET','');
}

/**
 * 根据编号获取图片地址
 */
export function getUserCollectionInfo(collection: any){
    const final = JSON.stringify({collection});
    return request('/user/collection/info/get','POST',final);
}


/**
 * 订单
 */

/**
 * 搜索订单列表
 */
export function getOrderSearchList(param: any){
    const data =JSON.stringify(param);
    return request('/search/order/list','POST',data);
}

/**
 * 软删除订单
 */
export function deleteOrderInfo(data: any){
    return request(`/order/info/delete/${data}`,'GET','')
}

/**
 * 发起退款
 */
export function refundOrder(data: any){
    return request(`/order/info/refund/${data}`,'GET','')
}

/**
 * 通知
 */
/**
 * 通知列表
 */
export function getNoticeSearchList(param: any){
    const data = JSON.stringify(param);
    return request('/search/notice/list','POST',data);
}

/**
 *删除通知 
 */
export function deleteNoticeInfo(data: any)
{
    return request(`/notice/info/delete/${data}`,'GET','');
}

/**
 * 增加通知
 */
export function addNoticeInfo(data: any)
{
    const final =JSON.stringify(data);
    return request('/notice/info/add','POST',final);
}

/**
 * 修改通知
 */
export function updateNoticeInfo(data: any)
{
    const final = JSON.stringify(data);
    return request('/notice/info/update','POST',final);
}

/**
 * 获取通知详情by id
 */
export function getNoticeInfoDetail(info_id: any)
{
    return request(`/notice/info/get/detail/${info_id}`,'GET','');
}

/**
 * 获取通知all
 */
 export function getNoticeInfo(info_id: any)
 {
     return request(`/notice/info/get/${info_id}`,'GET','');
 }

 /**
  * 卡片serial
  */
 /**
  * 搜索引擎
  */
  export function getSerialSearchList(param: any){
    const data =JSON.stringify(param);
    return request('/search/serial/list','POST',data);
}

/**
 * 获取对应详情by id
 */
export function getSerialInfoDetail(id: any)
{
return request(`/serial/info/get/detail/${id}`,'GET','');
}

/**
 * 修改编号
 */
export function updateSerialInfo(data: any)
{
    const final = JSON.stringify(data);
    return request('/serial/info/update','POST',final);
}

/**
 * admin
 */
/**
 * 登陆
 */
export function login(data: any)
{
    const final = JSON.stringify(data);
    return request('/login','POST',final);
}

/**验证token，以防伪造 */
export function verify(data: {token:string})
{
    const final = JSON.stringify(data);
    return request('/verify','POST',final);
}

/**
 * 控制中心
 */
export function getValue()
{
    return request('/get/control/center','GET','');
}

/**
 * 修改控制中心
 */
export function updateValue(data: any)
{
    const final = JSON.stringify({value:data});
    return request('/update/control/center','POST',final );
}

/**
 * 资讯
 */
/**
 * 获取资讯列表(搜索引擎)
 */
export function getInformationList(param: any)
{
    const data =JSON.stringify(param);
    return request('/search/information/list','POST',data);
}

/**
 * 删除资讯
 */
export function deleteInformation(id: any)
{
    return request(`/information/delete/${id}`,'GET','');
}

/**
 * 新增资讯
 */
export function addInformation(param: any)
{
    const data = JSON.stringify(param);
    return request('/information/add','POST',data);
}

/**
 * 修改资讯
 */
export function updateInformation(param: any)
{
    const data = JSON.stringify(param);
    return request('/information/update','POST',data);
}

/**
 * 获取资讯byid
 */
export function getInformationInfo(info_id: any)
{
    return request(`/information/get/${info_id}`,'GET','');
}