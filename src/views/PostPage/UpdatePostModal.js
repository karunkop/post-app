import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal, Button, Form, Input, Row, Col, Select } from "antd";

import {
  showSuccessNotification,
  showErrorNotification,
} from "../../components/Notification/Notification";
import AddCategoryModal from "../CategoryPage/AddCategoryModal";
import updatePost from "../../action-creators/updatePost";

const UpdatePostModal = ({ isVisible, handleCancel, onSuccess, initialData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [showCategoryAddModal, setShowCategoryAddModal] = React.useState(false);

  const categories = useSelector((state) => state.category.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(initialData);
    // eslint-disable-next-line
  }, [initialData]);

  const handleSubmit = async () => {
    form.submit();
  };

  const onFinish = async (fieldsValue) => {
    setLoading(true);
    try {
      const post = {
        id: initialData.id,
        slug: fieldsValue.slug,
        title: fieldsValue.title,
        body: fieldsValue.body,
        categoryId: fieldsValue.categoryId,
      };

      try {
        await dispatch(updatePost(post));
      } catch (err) {}

      showSuccessNotification({
        message: "Success",
        description: "Post updated successfully.",
      });

      form.resetFields();
      onSuccess();
    } catch (err) {
      showErrorNotification();
    }
    setLoading(false);
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
        title="Update Post"
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
              <Form.Item name="title" label="Name" rules={[{ required: true }]}>
                <Input placeholder="title" />
              </Form.Item>
            </Col>
            <Row />
            <Row />
            <Col span={24}>
              <Form.Item name="body" label="Body" rules={[{ required: true }]}>
                <Input placeholder="body" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[20, 20]}>
            <Col span={12}>
              <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
                <Input placeholder="slug" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="categoryId"
                label="Category"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select a category"
                  mode="multiple"
                  allowClear={true}
                  dropdownRender={(menu) => {
                    return (
                      <div>
                        {menu}
                        <div
                          className="new_category_button"
                          onClick={() => setShowCategoryAddModal(true)}
                        >
                          + Add new category
                        </div>
                      </div>
                    );
                  }}
                >
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

export default UpdatePostModal;
