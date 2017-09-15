import { combineReducers } from 'redux'
import PacksReducer from './reducer_packs'
import ItemsReducer from './reducer_items'
import SelectedPackReducer from './reducer_selected_pack'
import PackVisReducer from './reducer_pack_vis'

const rootReducer = combineReducers({
  packs: PacksReducer,
  items: ItemsReducer,
  selectedPack: SelectedPackReducer,
  packVisData: PackVisReducer
})

export default rootReducer