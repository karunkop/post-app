import Dexie from 'dexie'

const databaseFactory = () => {
  const db = new Dexie('local-database');

  const init = async () => {
    await db.version(1).stores({
      post: 'id, slug, title, body, *categoryId',
      category: 'id, name'
    });
  }

  const addPost = async (post) => db.table('post').add(post);
  const getAllPosts = async () => db.table('post').toArray();
  const updatePost = async (id, post) => db.table('post').update(id, post);
  const deletePost = async (id) => db.table('post').delete(id);

  const addCategory= async (category) => db.table('category').add(category);
  const getAllCategories = async () => db.table('category').toArray();
  const updateCategory= async (id, category) => db.table('category').update(id, category);
  const deleteCategory= async (id) => db.table('category').delete(id);


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