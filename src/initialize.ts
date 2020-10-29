import db from './db'
import store from './store/store'
import loadFromDatabase from './action-creators/loadFromDatabase'

const initialize = async () => {
  await db.init()
  store.dispatch(loadFromDatabase())
}

export default initialize