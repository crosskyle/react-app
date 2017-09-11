import { combineReducers } from 'redux'
import PacksReducer from './reducer_packs'

const rootReducer = combineReducers({
  packs: PacksReducer,
})

export default rootReducer