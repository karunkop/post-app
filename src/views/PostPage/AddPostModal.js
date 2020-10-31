import React from "react";
import { useDispatch, useSelector } from 'react-redux'

import {
  Modal,
  Button,
  Form,
  Input,
  Row,
  Col,
  Select,
} from "antd";

import { v4 as uuidv4 } from 'uuid';

import {
  showSuccessNotification,
  showErrorNotification,
} from "../../components/Notification/Notification";

import addPost from "../../action-creators/addPost";
import AddCategoryModal from "../CategoryPage/AddCategoryModal";

const AddPostModal = ({ isVisible, handleCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [showCategoryAddModal, setShowCategoryAddModal] = React.useState(false);

  const categories = useSelector((state) => state.category.categories)

  const dispatch = useDispatch()

  const handleSubmit = async () => {
    form.submit();
  };

  const onFinish = async (fieldsValue) => {

    console.log(fieldsValue.categoryIdArray)
    setLoading(true)
    try {

      const post = {
        id: uuidv4(),
        slug: fieldsValue.slug,
        title: fieldsValue.title,
        body: fieldsValue.body,
        categoryId: fieldsValue.categoryId
      }

      try{
        await dispatch(addPost(post))
      }
      catch(err) {

      }

      showSuccessNotification({
        message: "Success",
        description: "Post added successfully.",
      });

      form.resetFields()
      onSuccess()
    } catch (err) {
      showErrorNotification();
    }
    setLoading(false)
  };

  const onModalClose = () => {
    form.resetFields();
    handleCancel();
  };

  return (
    <>
    <AddCategoryModal 
      isVisible={showCategoryAddModal}
      onSuccess={() => setShowCategoryAddModal(false)}
      handleCancel={() => setShowCategoryAddModal(false)}
    />
    <Modal
      width={700}
      visible={isVisible}
      title="Add Post"
      onCancel={onModalClose}
      footer={[
        <Button key="back" onClick={onModalClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={loading}
          onClick={handleSubmit}
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row>
          <Col span={24}>
            <Form.Item name="title" label="Name" rules={[{ required: true }]}>
              <Input placeholder="title" />
            </Form.Item>
          </Col>
        <Row/>
        <Row/>
          <Col span={24}>
            <Form.Item name="body" label="Body" rules={[{ required: true }]}>
              <Input placeholder="body" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[20,20]}>
          <Col span={12}>
            <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
              <Input placeholder="slug" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
            <Select mode="multiple" placeholder="Select a category" allowClear={true} dropdownRender={(menu) => {
              return <div>
                {menu}
                <div className="new_category_button" onClick={() => setShowCategoryAddModal(true)}>
                  + Add new category
                </div>
              </div>
            }}>
                {categories.map((category) => {
                  return (
                    <Select.Option key={category.id} value={category.id}>
                      {category.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
    </>
  );
};

export default AddPostModal;
