import{
    Table,
    Divider,
    Form,
    Space,
    Select,
    Input,
    Button,
    Modal,
    message,
    Row,
    Col
} from '../../antdmoudle'
import { useState,useEffect } from 'react';
import { getCollectionSearchList, deleteCollectionInfo} from '../../api';
import { Link } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import React from 'react';



const pageSize = 5; //每页数量

export function GoodsManage():JSX.Element {
    useDocumentTitle('商场进存销管理系统——商品信息');

    const [data,setData] = useState(); //表格数据

    const [isLoading, setIsLoading] = useState(false); //是否正在加载
    
    const [total, setTotal] = useState(); //记录总数

    const [current, setCurrent] = useState(); //当前页数

    const { Option } = Select;
    const { confirm } = Modal;
    const [form] = Form.useForm();

    //搜索引擎
    const handleSearch =async (page=1)=>{
      setIsLoading(true);

      const queryValue = form.getFieldsValue();
      const query = { page, pageSize };
      const param = Object.assign({},queryValue,query);
      const res = await getCollectionSearchList(param);
      setCurrent(res.current_page);
      setTotal(res.total);
      setData(res.data);
      setIsLoading(false);
    }

    //删除对话框
    const showDeleteConfirm = (proof:any)=>{
      confirm({
        title: '确认删除该藏品？',
        icon: <ExclamationCircleOutlined />,
        content: '此操作不可恢复',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        async onOk() {
          const res = await deleteCollectionInfo(proof);
          if(res.data==="success"){
            message.success('删除成功');
            Init();
          }else{
            message.error('删除失败');
          }
        }
      });
    }

    //平台展示
    const displayPlatform = (record:any)=>{
      let result=[];
         if(record.display_platform){
           if(record.display_platform.includes('1')){
             result[0]= <span key="1">| 米果元宇宙(支付宝小程序1) |</span>;
           }
           if(record.display_platform.includes('2')){
            result[1]= <span key="2">| 国潮元宇宙(支付宝小程序2) |</span>;
           }
           if(record.display_platform.includes('3')){
            result[2]= <span key="3">| 元宇宙藏品(微信) |</span>;
           }
         }
         return <span>{result.map((item)=>{
           return item;
         })}</span>;
    }

    const columns = [
        { title: '序号', dataIndex: 'id', key: 'id' },
        { title: '编号', dataIndex: 'proof', key: 'proof' },
        { title: '主题', dataIndex: 'title', key: 'title' },
        { title: '样品图片', dataIndex: 'cover', key: 'cover' ,render:(_: any,record: any)=><img src={record.cover} width="100" alt="藏品"/>},
        { title: '藏品图片', dataIndex: 'real_cover', key: 'real_cover' ,render:(_: any,record: any)=><img src={record.real_cover} width="100" alt="藏品"/>},
        { title: '信息', dataIndex: 'info', key: 'info' },
        { title: '容量', dataIndex: 'capacity', key: 'capacity'},
        { title: '收集者', dataIndex: 'collector', key: 'collector'},
        { title: '价格', dataIndex: 'price', key: 'price'},
        { title: '剩余数量', dataIndex: 'remain', key: 'remain'},
        { title: '是否下架', dataIndex: 'is_stop' ,key: 'is_stop',render:(_:any,record:any)=>record.is_stop===1?<span>已下架</span>:<span>未下架</span>},
        { title: '是否开始', dataIndex: 'is_start', key: 'is_start', render:(_: any,record:any)=>record.is_start?<span>已开始</span>:<span>未开始</span>},
        {title: '是否展示红包皮肤',dataIndex: 'is_show_skin',key: 'is_show_skin',render:(_:any,record:any)=>record.is_show_skin===1?<span>已展示</span>:<span>未展示</span>},
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          render: (_: any,record: { proof: any; }) =><Space><Button type="link">
          <Link to={{ pathname: `/collection/detail/${record.proof}` }}>
            查看详情
          </Link>
        </Button>
        <Button type="link"><Link to={`/collection/edit/${record.proof}`}>编辑</Link></Button>
        <Button type="link" danger onClick={()=>showDeleteConfirm(record.proof)}>删除</Button>
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
      <Form.Item label="主题:" name="title">
          <Input placeholder="请输入商品主题"></Input>
      </Form.Item>
      <Form.Item label="库存:" name="remain">
          <Select style={{ width: 100 }}>
              <Option value="0">已售罄</Option>
              <Option value="1">未售罄</Option>
          </Select>
      </Form.Item>
      <Form.Item label="下架状态" name="is_stop">
          <Select style={{width:100}}>
              <Option value="1">已下架</Option>
              <Option value="0">未下架</Option>
          </Select>
      </Form.Item>
      <Form.Item label="开始状态" name="is_start">
          <Select style={{width:100}}>
              <Option value="1">已开始</Option>
              <Option value="0">未开始</Option>
          </Select>
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
     <Button type="primary" className="add"><Link to="/collection/add">新增</Link></Button>
     <Table
     rowKey={(record:any)=>record.id}
     pagination={{ pageSize, total, current }}
     onChange={evt => handleSearch(evt.current)}
     loading={isLoading}
     columns={columns}
     dataSource={data}
     expandable={{
      expandedRowRender: (record:any) =><>{record.skin &&<span style={{ margin: 50}}>红包皮肤链接: {record.skin}</span>}
        <div style={{ margin: 50}}>展示平台:{displayPlatform(record)}</div>
      </>,
      rowExpandable: (record:any) => record.name !== 'Not Expandable',
    }}
  />
     </>

}