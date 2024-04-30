import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useSearchParams } from 'react-router-dom';
import './index.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { createArticleAPI, getArticleById } from '@/apis/article';
import { useChannel } from '@/hooks/useChannel';

const { Option } = Select;

const Publish = () => {
  //获取频道列表
  const { channelList } = useChannel();

  //publish article
  const onFinish = async (formValue) => {
    if (coverType !== imageList.length)
      return message.warning('封面类型和图片数量不匹配');
    const { title, content, channel_id } = formValue;
    //form data
    const formData = {
      channel_id,
      content,
      title,
      type: coverType,
      cover: {
        type: coverType,
        images: imageList.map((item) => item.response.data.url),
      },
    };
    //submit form data
    await createArticleAPI(formData);
  };

  //upload image
  const [imageList, setImageList] = useState([]);
  const onUploadChange = (info) => {
    setImageList(info.fileList);
  };
  const [coverType, setCoverType] = useState(0);
  const onTypeChange = (e) => {
    console.log('切换封面了', e.target.value);
    setCoverType(e.target.value);
  };

  //回填数据
  //get article's id via route
  //获取form组件实例
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get('id');
  console.log(articleId);
  useEffect(() => {
    async function getArticleDetail() {
      const res = await getArticleById(articleId);
      form.setFieldsValue(res.data);
    }
    getArticleDetail();
  }, [articleId, form]);

  return (
    <div className='publish'>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={'/'}>首页</Link> },
              { title: '发布文章' },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label='标题'
            name='title'
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder='请输入文章标题' style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label='频道'
            name='channel_id'
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder='请选择文章频道' style={{ width: 400 }}>
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='封面'>
            <Form.Item name='type'>
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {coverType > 0 && (
              <Upload
                listType='picture-card'
                showUploadList
                name='image'
                action={'http://geek.itheima.net/v1_0/upload'}
                onChange={onUploadChange}
                maxCount={coverType}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label='内容'
            name='content'
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className='publish-quill'
              theme='snow'
              placeholder='请输入文章内容'
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size='large' type='primary' htmlType='submit'>
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
