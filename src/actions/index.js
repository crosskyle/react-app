import axios from 'axios'

import {
  DELETE_ITEM,
  CREATE_PACK,
  READ_PACK,
  READ_PACKS,
  SELECTED_PACK,
  READ_ITEMS,
  PACK_VIS
} from './types'

const ROOT_URL = 'http://localhost:3050'

const USER_ID = '59b5b4005a43c3029b9655de'


export function createPack() {
  const response = axios.post(`${ROOT_URL}/api/users/${USER_ID}/packs`)
    .then((resp) => resp.data)

  return {
    type: CREATE_PACK,
    payload: response
  }
}


export function createCategory(packId, reqObj) {
  const response = axios.post(`${ROOT_URL}/api/users/${USER_ID}/packs/${packId}/categories`, {
    title: reqObj.title
  })
    .then((resp) => resp.data)

  return {
    type: READ_PACK,
    payload: response
  }
}


export function createItemInCategory(packId, categoryId, reqObj) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/users/${USER_ID}/packs/${packId}/categories/${categoryId}/items`, reqObj)
      .then((resp) => {
        dispatch({
          type: READ_PACK,
          payload: resp.data
        })
        return resp
      })
      .then((resp) => {
        let series = updatePackVis(resp.data)
        dispatch({
          type: PACK_VIS,
          payload: series
        })
      })
      .then(() => {
        axios.get(`${ROOT_URL}/api/users/${USER_ID}`)
          .then((resp) =>  {
            dispatch({
              type: READ_ITEMS,
              payload: resp.data.items
            })
          })
      })
  }
}


export function readPacks() {
  const response = axios.get(`${ROOT_URL}/api/users/${USER_ID}/packs`)
    .then((resp) =>  resp.data )

  return {
    type: READ_PACKS,
    payload: response
  }
}


export function readItems() {
  const response = axios.get(`${ROOT_URL}/api/users/${USER_ID}`)
    .then((resp) =>  resp.data.items )

  return {
    type: READ_ITEMS,
    payload: response
  }
}


export function selectedPack(packId) {
  return {
    type: SELECTED_PACK,
    payload: packId
  }
}


export function deleteItem(itemId, pack) {
  return function(dispatch) {
    axios.delete(`${ROOT_URL}/api/users/${USER_ID}/items/${itemId}`)
      .then(() => {
        dispatch({
          type: DELETE_ITEM,
          payload: itemId
        })
      })
      .then(() => {
        axios.get(`${ROOT_URL}/api/users/${USER_ID}/packs`)
          .then((resp) => {
            dispatch({
              type: READ_PACKS,
              payload: resp.data
            })
            if (pack) {
              const updatedPack = resp.data.find(o => o.id === pack.id)
              const series = updatePackVis(updatedPack)
              dispatch({
                type: PACK_VIS,
                payload: series
              })
            }
          })
      })
  }
}


export function getPackVisData(pack) {

  const series = updatePackVis(pack)

  return {
    type: PACK_VIS,
    payload: series
  }
}


function updatePackVis(pack) {
  let series = []
  let maxItems = 0

  pack.categories.forEach((category) => {
    if (category.items.length > maxItems)
      maxItems = category.items.length
  })

  for (let i = 0; i < maxItems; i++) {
    let seriesInstance = []
    pack.categories.forEach((category) => {
      let obj = {}
      if (category.items[i] && category.items[i].weight) {
        obj.x = category.items[i].weight * category.items[i].quantity
        obj.weight = category.items[i].weight * category.items[i].quantity
      }
      else {
        obj.x = 0
        obj.weight = 0
      }
      if (category.items[i] && category.items[i].title)
        obj.title = category.items[i].title
      else
        obj.title = ''
      obj.y = category.title
      seriesInstance.push(obj)
    })
    series.push(seriesInstance)
  }

  return series
}
