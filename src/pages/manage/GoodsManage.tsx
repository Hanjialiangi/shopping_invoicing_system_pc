import{
    Table,
    Divider,
    Form,
    Space,
    Input,
    Button,
    Modal,
    message,
    Row,
    Col
} from '../../antdmoudle'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import React from 'react';
import {GoodsInfo} from '../../constant';



const pageSize = 5; //每页数量

export function GoodsManage():JSX.Element {
    useDocumentTitle('商场进存销管理系统——商品信息');

    const [data,setData] = useState<any>(); //表格数据

    const [isLoading, setIsLoading] = useState(false); //是否正在加载
    
    const [total, setTotal] = useState<number>(); //记录总数

    const [current, setCurrent] = useState<number>(); //当前页数

    const { confirm } = Modal;
    const [form] = Form.useForm();

    //搜索引擎
    const handleSearch =async (page=1)=>{
      setIsLoading(true);
      const data = GoodsInfo;

      setCurrent(1);
      setTotal(data.length);
      setData(data);
      setIsLoading(false);
    }

    //删除对话框
    const showDeleteConfirm = (proof:any)=>{
      confirm({
        title: '确认删除该商品？',
        icon: <ExclamationCircleOutlined />,
        content: '此操作不可恢复',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        async onOk() {
          message.success('删除成功');
        }
      });
    }
 

    const columns = [
        { title: '序号', dataIndex: 'id', key: 'id' },
        { title: '商品码', dataIndex: 'isbn', key: 'isbn' },
        { title: '商品名称', dataIndex: 'name', key: 'title' },
        { title: '商品图片', dataIndex: 'img', key: 'img' ,render:(_: any,record: any)=><img src={record.img} width="100" alt="商品"/>},
        { title: '价格', dataIndex: 'price', key: 'price'},
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          render: (_: any,record: { id: any; }) =><Space>
        <Button type="link"><Link to={`/goods/edit/${record.id}`}>编辑</Link></Button>
        <Button type="link" danger onClick={()=>showDeleteConfirm(record.id)}>删除</Button>
        </Space>,
        },
      ];

    
    //重置操作
    const onReset = () => {
        form.resetFields();
      };
    
    //初始化
    const  Init =()=>{
     handleSearch();
    }

    //副作用函数
    useEffect(()=>{
        Init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return <>
    <div className="formtitle">
    商品信息
    </div>
    <Form
    form={form}
    name="basic"
    initialValues={{ }}
    onSubmitCapture={() => handleSearch(1)}
  >
      <Space size="large">
        <Row>
      <Form.Item label="编号:" name="proof">
          <Input placeholder="请输入商品编号"></Input>
      </Form.Item>
      <Form.Item label="商品名称:" name="name">
          <Input placeholder="请输入商品名称"></Input>
      </Form.Item>
      </Row>
      </Space>
      <Row justify="end">
        <Col>
      <Form.Item>
          <Space>
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
        <Button htmlType="button" onClick={onReset}>
          重置
        </Button>
        </Space>
      </Form.Item>
      </Col>
      </Row>
    </Form>
     <Divider/>
     <Button type="primary" className="add"><Link to="/goods/add">新增</Link></Button>
     <Table
     rowKey={(record:any)=>record.id}
     pagination={{ pageSize, total, current }}
     onChange={evt => handleSearch(evt.current)}
     loading={isLoading}
     columns={columns}
     dataSource={data}
  />
     </>

}