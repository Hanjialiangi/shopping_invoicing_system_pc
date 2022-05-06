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
    Space
}from '../../antdmoudle'
import { useParams } from 'react-router-dom';
import { sellInfo } from '../../constant';

export function SellManageEdit():JSX.Element{
    useDocumentTitle('商场进存销管理系统——修改销售信息')
    const [form] = Form.useForm(); //表单数据
    const [loading,setLoading] = useState(false); //是否上传
    const [imageUrl ,setImageUrl] = useState(); //图片路径

    const param = useParams();
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

    //

    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );

    //初始化
    const Init =()=>{
        let data:{img:any}= {
            img: ''
        };
        if(param.id){
            data = sellInfo[Number(param.id)-1]
        }
        form.setFieldsValue(data);
        setImageUrl(data.img);
    }
      
      useEffect(()=>{
          Init();
      })

    return <>
    <div className="formtitle"><a href="/sell/manage">销售信息</a>/添加销售信息</div>
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

        <Form.Item label="销售数量" name="number">
            <Input placeholder="请输入销售数量"/>
        </Form.Item>
        <Form.Item label="销售金额" name="sum">
            <Input placeholder="请输入销售金额"/>
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