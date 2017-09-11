import { combineReducers } from 'redux'
import PacksReducer from './reducer_packs'
import SelectedPackReducer from './reducer_selected_pack'

const rootReducer = combineReducers({
  packs: PacksReducer,
  selectedPack: SelectedPackReducer
})

export default rootReducer