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
import { getInformationList,deleteInformation } from '../../api';
import { Link } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const pageSize = 5; //页面大小
export function PersonalManage():JSX.Element
{
    useDocumentTitle('商场进存销管理系统——人事信息')
    const [data,setData] = useState(); //表格数据

    const [isLoading, setIsLoading] = useState(false); //是否正在加载
    
    const [total, setTotal] = useState(); //记录总数

    const [current, setCurrent] = useState(); //当前页数

    const { confirm } = Modal;
    const [form] = Form.useForm();

    //搜索引擎
    const handleSearch =async (page=1)=>{
      setIsLoading(true);

      const queryValue = form.getFieldsValue();
      const query = { page, pageSize };
      const param = Object.assign({},queryValue,query);
      const res = await getInformationList(param);
      setCurrent(res.current_page);
      setTotal(res.total);
      setData(res.data);
      setIsLoading(false);
    }

    //删除对话框
    const showDeleteConfirm = (info_id:string)=>{
      confirm({
        title: '确认删除该资讯？',
        icon: <ExclamationCircleOutlined />,
        content: '此操作不可恢复',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        async onOk() {
          const res = await deleteInformation(info_id);
          if(res.data==="success"){
            message.success('删除成功');
            Init();
          }else{
            message.error('删除失败');
          }
        }
      });
    }

    const columns = [
        { title: '序号', dataIndex: 'id', key: 'id' },
        { title: '编号', dataIndex: 'info_id', key: 'info_id' },
        { title: '图片', dataIndex: 'img_url', key: 'img_url' ,render:(_:any,record:any)=><img src={record.img_url} width="100" alt="资讯"/>},
        { title: '题目', dataIndex: 'title',key: 'title'},
        { title: '描述1', dataIndex: 'description1', key: 'description1' },
        { title: '描述2', dataIndex: 'description2', key: 'description2' },
        { title: '描述3',dataIndex: 'description3', key:'description3'},
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          render: (_:any,record:any) =><Space>
        <Button type="link"><Link to={`/information/edit/${record.id}`}>编辑</Link></Button>
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
      <Form.Item label="编号:" name="info_id">
          <Input placeholder="请输入资讯编号"></Input>
      </Form.Item>
      <Form.Item label="题目:" name="title">
          <Input placeholder="请输入资讯题目"></Input>
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
     <Button type="primary" className="add"><Link to="/information/add">新增</Link></Button>
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