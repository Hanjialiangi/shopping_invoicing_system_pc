import { useEffect, useState} from "react";
import { useParams } from "react-router"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {getBase64} from '../../untils'
import {
    Form,
    Button,
    Divider,
    Input,
    Upload,
} from '../../antdmoudle';
import { GoodsInfo } from "../../constant";
import useDocumentTitle from '../../hooks/useDocumentTitle';


export function GoodsManageEdit():JSX.Element{
    useDocumentTitle('商场进存销管理系统——修改商品');

    const param = useParams();
    const [loading,setLoading] = useState(false); //是否上传
    const [imageUrl ,setImageUrl] = useState(); //图片路径

    const [form] = Form.useForm(); //表单数据

    //上传图片
    const handleChange = (info:any) => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
          getBase64(info.file.originFileObj, (imageUrl:any) =>{
            setLoading(false);
            setImageUrl(imageUrl);
          }
          );
        }
      };
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
            data = GoodsInfo[Number(param.id)-1]
        }
        form.setFieldsValue(data);
        setImageUrl(data.img);
    }

    //提交
    const submit = ()=>{
        console.log(form.getFieldsValue());
    }
      
    useEffect(()=>{
        Init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[param.id]);
    return <>
    <div className="formtitle"><a href="/goods/manage">商品信息</a>/修改商品</div>
    <h3 style={{marginTop:'30px',color:'gray'}}>基本信息</h3>
    <Divider/>
    <Form
    labelAlign="left"
    name="empty"
    form={form}
    onSubmitCapture={()=>submit()}
    >
        <div className="flex">
        <Form.Item label="编号" name="isbn">
            <Input placeholder="请输入商品编号"/>
        </Form.Item>
        <Form.Item label="名称" name="name">
            <Input placeholder="请输入商品名称"/>
        </Form.Item>

        <Form.Item label="单价" name="price">
            <Input placeholder="请输入商品价格"/>
        </Form.Item>
        <Form.Item label="描述" name="description">
            <Input placeholder="请输入商品描述"/>
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
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
        </div>
        </Form>
        </>
}