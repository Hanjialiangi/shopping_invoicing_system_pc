import useDocumentTitle from '../../hooks/useDocumentTitle';
import { getBase64 } from '../../untils';
import React, { useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Divider,
    Upload,
    Button,
    Space,
    DatePicker
}from '../../antdmoudle'
import moment from 'moment';
import { stockInfo } from '../../constant';
import { useParams } from 'react-router-dom';

export function StockManageEdit():JSX.Element{
    useDocumentTitle('');
    const [form] = Form.useForm(); //表单数据
    const [loading,setLoading] = useState(false); //是否上传
    const [imageUrl ,setImageUrl] = useState(); //图片路径
    const param = useParams();

    const dateFormat = 'YYYY-MM-DD';
     //重置按钮
     const onReset = ()=>{
        form.resetFields();
    }

    const handleChange = (info: any) => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
          getBase64(info.file.originFileObj, (imageUrl: any) =>{
            setLoading(false);
            setImageUrl(imageUrl);
          }
          );
        }
      };
    //提交
    const submit =()=>{
        console.log(form.getFieldsValue());
    }

    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );

   //初始化
   const Init =()=>{
    let data:{img:any,time:any}= {
        img: '',
        time:''
    };
    if(param.id){
        data = stockInfo[Number(param.id)-1]
        data.time = moment(data.time,'YYYY-MM-DD')
    }
    form.setFieldsValue(data);
    setImageUrl(data.img);
}
  
  useEffect(()=>{
      Init();
  })


    return <>
    <div className="formtitle"><a href="/stock/manage">进货信息</a>/修改进货信息</div>
    <h3 style={{marginTop:'30px',color:'gray'}}>基本信息</h3>
    <Divider/>
    <Form
    labelAlign="left"
    name="empty"
    form={form}
    onSubmitCapture={()=>submit()}
    >
        <div className="flex">
        <Form.Item label="编号" name="No">
            <Input placeholder="请输入商品编号"/>
        </Form.Item>
        <Form.Item label="名称" name="name">
            <Input placeholder="请输入商品名称"/>
        </Form.Item>

        <Form.Item label="进货数量" name="number">
            <Input placeholder="请输入进货数量"/>
        </Form.Item>
        <Form.Item label="金额" name="sum">
            <Input placeholder="请输入金额"/>
        </Form.Item>
        </div>
        <div className='flex'>
        <Form.Item label="进货人" name="people">
            <Input placeholder="请输入进货人"/>
        </Form.Item>
        <Form.Item label="进货时间" name="time">
        <DatePicker  format={dateFormat} />
        </Form.Item>
        </div>
        <div className="flex">
        <Form.Item label="上传商品图片" name="img"  valuePropName="img"
        getValueFromEvent={evt => {
            //尝试读取上传文件的URL信息，并设置为cover字段值
            if (
              evt &&
              evt.file &&
              evt.file.response &&
              evt.file.response[0]&&
              evt.file.response[0].url
            ) {
              return evt.file.response[0].url
            } else {
              return ''
            }
          }}>
            <Upload name="upload" 
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action=""
            onChange={handleChange}
            >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </Form.Item>
        <Form.Item style={{alignSelf:'end'}}>
          <Space>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button  htmlType="button" onClick={onReset}>
          重置
        </Button>
        </Space>
      </Form.Item>
      </div>
        </Form>
</>
}