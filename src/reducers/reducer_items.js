import { READ_ITEMS, DELETE_ITEM } from "../actions/types"
import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_ITEM:
      console.log('deleteitem')
      return _.omit(state, action.payload)
    case READ_ITEMS:
      console.log('readitems')
      return _.mapKeys(action.payload, "id")
    default:
      return state
  }
}