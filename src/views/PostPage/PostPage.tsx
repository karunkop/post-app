import React, { useState, useCallback } from "react";
import { Modal, Table, Menu, Dropdown, Button, Row, Col, Tag } from "antd";
import { DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import ViewLayout from "../../components/ViewLayout/ViewLayout";
import { Post } from "../../db";
import AddPostModal from "./AddPostModal";

import "./PostPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../reducers/rootReducer";
import UpdatePostModal from "./UpdatePostModal";
import deletePost from "../../action-creators/deletePost";
import { showSuccessNotification } from "../../components/Notification/Notification";

const showDeleteConfirm = ({
  onOk,
  onCancel,
}: {
  onOk: () => void;
  onCancel: () => void;
}) => {
  Modal.confirm({
    title: "Do you Want to delete this post?",
    icon: <ExclamationCircleOutlined />,
    content: "This post will be deleted",
    onOk: onOk,
    onCancel: onCancel,
  });
};

const dummySelectedPost: Post = {
  id: "",
  body: "",
  categoryId: "",
  slug: "",
  title: "",
};

const PostPage: React.FC<{}> = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post>(dummySelectedPost);

  const dispatch = useDispatch();
  const categories = useSelector((state: State) => state.category.categories);
  const posts = useSelector((state: State) => state.post.posts);

  const closeUpdateModal = useCallback(() => {
    setSelectedPost(dummySelectedPost);
    setShowUpdateModal(false);
  }, []);

  const handleDelete = useCallback((post: Post) => {
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
      render: (categoryId: string) => {
        return (
          <Tag color="success">
            {categories.find((category) => category.id === categoryId)?.name}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "action",
      render: (text: string, record: Post) => {
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
