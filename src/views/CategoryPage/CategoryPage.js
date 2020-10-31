import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Table, Menu, Dropdown, Button, Row, Col } from "antd";
import { DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import ViewLayout from "../../components/ViewLayout/ViewLayout";
import AddCategoryModal from "./AddCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../components/Notification/Notification";
import deleteCategory from "../../action-creators/deleteCategory";

const showDeleteConfirm = ({
  onOk,
  onCancel,
}) => {
  Modal.confirm({
    title: "Do you Want to delete this category?",
    icon: <ExclamationCircleOutlined />,
    content: "This category will be deleted",
    onOk: onOk,
    onCancel: onCancel,
  });
};

const dummyCategory = {
  id: "",
  name: "",
  description: "",
};

const CategoryPage = () => {
  const [showAddModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    dummyCategory
  );
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  const closeUpdateModal = useCallback(() => {
    setSelectedCategory(dummyCategory);
    setShowUpdateModal(false);
    // eslint-disable-next-line
  }, []);

  const handleDelete = useCallback((category) => {
    showDeleteConfirm({
      onOk: async () => {
        try {
          await dispatch(deleteCategory(category));

          showSuccessNotification({
            message: "Success",
            description: "Category deleted successfully.",
          });
        } catch (err) {
          showErrorNotification({
            message: "Category",
            description: "Category cannot be deleted",
          });
        }
      },
      onCancel: () => {},
    });
  // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => {
        const ActionMenu = () => {
          return (
            <Menu>
              <Menu.Item
                onClick={() => {
                  setSelectedCategory(record);
                  setShowUpdateModal(true);
                }}
              >
                Update
              </Menu.Item>
              <Menu.Item onClick={() => handleDelete(record)}>Delete</Menu.Item>
            </Menu>
          );
        };

        return (
          <>
            <Dropdown overlay={ActionMenu} placement="bottomLeft" arrow>
              <Button type="dashed">
                Actions
                <DownOutlined />
              </Button>
            </Dropdown>
          </>
        );
      },
    },
  ];

  return (
    <ViewLayout title="Category">
      <Row justify="end">
        <Col>
          <Button type="primary" onClick={() => setShowModal(true)}>
            Add Category
          </Button>
        </Col>
      </Row>
      <div></div>
      <AddCategoryModal
        isVisible={showAddModal}
        handleCancel={() => setShowModal(false)}
        onSuccess={() => setShowModal(false)}
      />
      <UpdateCategoryModal
        isVisible={showUpdateModal}
        handleCancel={() => closeUpdateModal()}
        onSuccess={() => closeUpdateModal()}
        initialData={selectedCategory}
      />
      <Table
        className="mt-4"
        rowKey="id"
        columns={columns}
        dataSource={categories}
      />
    </ViewLayout>
  );
};

export default CategoryPage;
