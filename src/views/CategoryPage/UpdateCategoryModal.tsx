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

import {
  showSuccessNotification,
  showErrorNotification,
} from "../../components/Notification/Notification";

import { Category } from "../../db";

import updateCategory from "../../action-creators/updateCategory";

const UpdateCategoryModal: React.FC<{ isVisible: boolean, handleCancel: () => void, onSuccess: () => void, initialData: Category}>= ({ isVisible, handleCancel, onSuccess, initialData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch()

  const handleSubmit = async () => {
    form.submit();
  };

  React.useEffect(() => {
    form.setFieldsValue(initialData)
    // eslint-disable-next-line
  }, [initialData])

  const onFinish = async (fieldsValue: any) => {
    setLoading(true)
    try {

      const category: Category = {
        id: initialData.id,
        name: fieldsValue.name,
        description: fieldsValue.description
      }

      try{
        await dispatch(updateCategory(category))
      }
      catch(err) {
        
      }

      showSuccessNotification({
        message: "Success",
        description: "Category updated successfully.",
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
      title="Update Category"
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
        initialValues={initialData}
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

export default UpdateCategoryModal;
