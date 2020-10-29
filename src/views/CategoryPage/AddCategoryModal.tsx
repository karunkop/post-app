import React from "react";
import { useDispatch } from 'react-redux'

import {
  Modal,
  Button,
  Form,
  Input,
  Row,
  Col,
} from "antd";

import { v4 as uuidv4 } from 'uuid';

import {
  showSuccessNotification,
  showErrorNotification,
} from "../../components/Notification/Notification";
import { Category } from "../../db";
import addCategory from "../../action-creators/addCategory";

const AddCategoryModal: React.FC<{ isVisible: boolean, handleCancel: () => void, onSuccess: () => void}>= ({ isVisible, handleCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch()

  const handleSubmit = async () => {
    form.submit();
  };

  const onFinish = async (fieldsValue: Category) => {
    setLoading(true)
    try {

      const category = {
        ...fieldsValue,
        id: uuidv4()
      }

      try{
        await dispatch(addCategory(category))
      }
      catch(err) {

      }

      showSuccessNotification({
        message: "Success",
        description: "Category added successfully.",
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
    <Modal
      width={700}
      visible={isVisible}
      title="Add Category"
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
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input placeholder="name" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <Input placeholder="description" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
