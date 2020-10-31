import React, { useState, useCallback } from "react";
import {
  Modal,
  Table,
  Menu,
  Dropdown,
  Button,
  Row,
  Col,
  Tag,
  Space,
} from "antd";
import { DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import ViewLayout from "../../components/ViewLayout/ViewLayout";
import AddPostModal from "./AddPostModal";

import "./PostPage.scss";
import { useSelector, useDispatch } from "react-redux";
import UpdatePostModal from "./UpdatePostModal";
import deletePost from "../../action-creators/deletePost";
import { showSuccessNotification } from "../../components/Notification/Notification";

const showDeleteConfirm = ({ onOk, onCancel }) => {
  Modal.confirm({
    title: "Do you Want to delete this post?",
    icon: <ExclamationCircleOutlined />,
    content: "This post will be deleted",
    onOk: onOk,
    onCancel: onCancel,
  });
};

const dummySelectedPost = {
  id: "",
  body: "",
  categoryId: "",
  slug: "",
  title: "",
};

const PostPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(dummySelectedPost);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const posts = useSelector((state) => state.post.posts);

  const closeUpdateModal = useCallback(() => {
    setSelectedPost(dummySelectedPost);
    setShowUpdateModal(false);
  }, []);

  const handleDelete = useCallback((post) => {
    showDeleteConfirm({
      onOk: async () => {
        try {
          await dispatch(deletePost(post));

          showSuccessNotification({
            message: "Success",
            description: "Post deleted successfully.",
          });
        } catch (err) {}
      },
      onCancel: () => {},
    });
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Tite",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryIdArray) => {
        return (
          <Space>
            {categoryIdArray.map((categoryId) => (
              <Tag color="success">
                {
                  categories.find((category) => category.id === categoryId)
                    ?.name
                }
              </Tag>
            ))}
          </Space>
        );
      },
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
                  setShowUpdateModal(true);
                  setSelectedPost(record);
                }}
              >
                Update
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  handleDelete(record);
                }}
              >
                Delete
              </Menu.Item>
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
    <ViewLayout title="Post">
      <div>Post Page</div>
      <Row justify="end">
        <Col>
          <Button type="primary" onClick={() => setShowAddModal(true)}>
            Add Post
          </Button>
        </Col>
      </Row>
      <div></div>
      <AddPostModal
        isVisible={showAddModal}
        onSuccess={() => setShowAddModal(false)}
        handleCancel={() => setShowAddModal(false)}
      />
      <UpdatePostModal
        isVisible={showUpdateModal}
        onSuccess={closeUpdateModal}
        handleCancel={closeUpdateModal}
        initialData={selectedPost}
      />
      <Table
        className="mt-4"
        rowKey="id"
        columns={columns}
        dataSource={posts}
      />
    </ViewLayout>
  );
};

export default PostPage;
