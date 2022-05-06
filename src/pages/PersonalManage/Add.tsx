import useDocumentTitle from '../../hooks/useDocumentTitle';
import { getBase64 } from '../../untils';
import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Divider,
    Upload,
    Button,
    Space,
    Select
}from '../../antdmoudle'

export function PersonalManageAdd():JSX.Element{
    useDocumentTitle('商场进存销管理系统——添加人员');
    const [form] = Form.useForm(); //表单数据
    const [loading,setLoading] = useState(false); //是否上传
    const [imageUrl ,setImageUrl] = useState(); //图片路径

    const {Option} = Select;
    
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

    return <>
    <div className="formtitle"><a href="/personal/manage">人员信息</a>/添加人员</div>
    <h3 style={{marginTop:'30px',color:'gray'}}>基本信息</h3>
    <Divider/>
    <Form
    labelAlign="left"
    name="empty"
    form={form}
    onSubmitCapture={()=>submit()}
    >
        <div className="flex">
        <Form.Item label="编号" name="jobNo">
            <Input placeholder="请输入人员编号"/>
        </Form.Item>
        <Form.Item label="姓名" name="name">
            <Input placeholder="请输入人员姓名"/>
        </Form.Item>

        <Form.Item label="工龄" name="work_time">
            <Input placeholder="请输入工龄"/>
        </Form.Item>
        <Form.Item label="工资" name="wage">
            <Input placeholder="请输入工资"/>
        </Form.Item>
        </div>
        <div className='flex'>
        <Form.Item label="备注" name="note">
            <Input placeholder="请输入备注"/>
        </Form.Item>
        <Form.Item label="类型" name="type">
        <Select placeholder="选择类型">
          <Option value={1}>职工</Option>
          <Option value={0}>供应商</Option>
        </Select>
        </Form.Item>
        </div>
        <div className="flex">
        <Form.Item label="上传用户头像" name="avator"  valuePropName="avator"
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