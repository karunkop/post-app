import Dexie from 'dexie'

export interface Post {
  id: string,
  slug: string,
  title: string,
  body: string,
  categoryId: string
}

export interface Category {
  id: string,
  name: string,
  description: string
}

const databaseFactory = () => {
  const db = new Dexie('local-database');

  const init = async () => {
    await db.version(1).stores({
      post: 'id, slug, title, body, categoryId',
      category: 'id, name'
    });
  }

  const addPost = async (post: Post) => db.table<Post>('post').add(post);
  const getAllPosts = async () => db.table<Post>('post').toArray();
  const updatePost = async (id: string, post: Post) => db.table<Post>('post').update(id, post);
  const deletePost = async (id: string) => db.table<Post>('post').delete(id);

  const addCategory= async (category: Category) => db.table<Category>('category').add(category);
  const getAllCategories = async () => db.table<Category>('category').toArray();
  const updateCategory= async (id: string, category: Category) => db.table<Category>('category').update(id, category);
  const deleteCategory= async (id: string) => db.table<Category>('category').delete(id);


  return {
    init,
    addPost,
    getAllPosts,
    updatePost,
    deletePost,
    addCategory,
    getAllCategories,
    deleteCategory,
    updateCategory
  }
}

export default databaseFactory()