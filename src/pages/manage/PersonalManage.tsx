import useDocumentTitle from "../../hooks/useDocumentTitle";
import {useState,useEffect} from 'react';
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
import { Link } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { personalInfo} from '../../constant'

const pageSize = 5; //页面大小
export function PersonalManage():JSX.Element
{
    useDocumentTitle('商场进存销管理系统——人事信息')
    const [data,setData] = useState<any>(); //表格数据

    const [isLoading, setIsLoading] = useState(false); //是否正在加载
    
    const [total, setTotal] = useState<number>(); //记录总数

    const [current, setCurrent] = useState<number>(); //当前页数

    const { confirm } = Modal;
    const [form] = Form.useForm();

    //搜索引擎
    const handleSearch =async (page=1)=>{
      setIsLoading(true);

      const data =personalInfo;
      setCurrent(page);
      setTotal(data.length);
      setData(data);
      setIsLoading(false);
    }

    //删除对话框
    const showDeleteConfirm = (info_id:string)=>{
      confirm({
        title: '确认删除该人员信息？',
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
        { title: '工号', dataIndex: 'jobNo', key: 'jobNo' },
        { title: '头像', dataIndex: 'avator', key: 'avator' ,render:(_:any,record:any)=><img src={record.avator} width="100" alt="头像"/>},
        { title: '姓名', dataIndex: 'name',key: 'name'},
        { title: '工作时长(供应时长)', dataIndex: 'work_time', key: 'work_time' },
        { title: '工资/元', dataIndex: 'wage', key: 'wage' },
        { title: '备注',dataIndex: 'note', key:'note'},
        { title: '类型',dataIndex: 'type', key:'type'},
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          render: (_:any,record:any) =><Space>
        <Button type="link"><Link to={`/personal/edit/${record.id}`}>编辑</Link></Button>
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
    人员信息
    </div>
    <Form
    form={form}
    name="basic"
    initialValues={{ }}
    onSubmitCapture={() => handleSearch(1)}
  >
      <Space size="large">
        <Row>
      <Form.Item label="工号:" name="jobNo">
          <Input placeholder="请输入员工编号"></Input>
      </Form.Item>
      <Form.Item label="姓名:" name="name">
          <Input placeholder="请输入员工姓名"></Input>
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
     <Button type="primary" className="add"><Link to="/personal/add">新增</Link></Button>
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