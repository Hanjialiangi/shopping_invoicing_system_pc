import useDocumentTitle from "../../hooks/useDocumentTitle";
import{
    Table,
    Form,
    Space,
    Input,
    Button,
    Modal,
    message,
    Row,
    Col
} from '../../antdmoudle';
import { useEffect, useState } from "react";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import {stockInfo}  from '../../constant';


const pageSize = 5;
export function StockManage():JSX.Element{
    useDocumentTitle('商场进存销管理系统——进货信息')
    const [data,setData] = useState<any>(); //表格数据

    const [isLoading, setIsLoading] = useState(false); //是否正在加载
    
    const [total, setTotal] = useState<number>(); //记录总数

    const [current, setCurrent] = useState<number>(); //当前页数

    const { confirm } = Modal;
    const [form] = Form.useForm();

    //搜索引擎
    const handleSearch =async (page=1)=>{
      setIsLoading(true);

      const data =stockInfo;
      setCurrent(page);
      setTotal(data.length);
      setData(data);
      setIsLoading(false);
    }

    //删除对话框
    const showDeleteConfirm = (info_id:string)=>{
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
        { title: '交易流水号', dataIndex: 'No', key: 'No' },
        { title: '图片', dataIndex: 'img', key: 'img' ,render:(_:any,record:any)=><img src={record.avator} width="100" alt="物品"/>},
        { title: '名称', dataIndex: 'name',key: 'name'},
        { title: '进货数量',dataIndex:'number',key:'number'},
        { title: '总金额',dataIndex:'sum',key:'sum'},
        { title: '进货人',dataIndex:'people',key:'people'},
        { title: '进货时间',dataIndex:'time',key:'time'},
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          render: (_:any,record:any) =><Space>
        <Button type="link"><Link to={`/stock/edit/${record.id}`}>编辑</Link></Button>
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
    进货信息
    </div>
    <Form
    form={form}
    name="basic"
    initialValues={{ }}
    onSubmitCapture={() => handleSearch(1)}
  >
      <Space size="large">
        <Row>
      <Form.Item label="交易流水号:" name="jobNo">
          <Input placeholder="请输入交易流水号"></Input>
      </Form.Item>
      <Form.Item label="名称:" name="name">
          <Input placeholder="请输入名称"></Input>
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
     <Button type="primary" className="add"><Link to="/stock/add">新增</Link></Button>
     <Table
     rowKey={(record)=>record.id}
     pagination={{ pageSize, total, current }}
     onChange={evt => handleSearch(evt.current)}
     loading={isLoading}
     columns={columns}
     dataSource={data}
  />
     </>
}