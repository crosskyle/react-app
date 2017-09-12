import axios from 'axios'

import {
  DELETE_ITEM,
  CREATE_PACK,
  CREATE_CATEGORY,
  CREATE_ITEM,
  READ_PACK,
  READ_PACKS,
  SELECTED_PACK,
  READ_ITEMS
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


export function createCategory() {
  const response = {}

  return {
    type: CREATE_CATEGORY,
    payload: response
  }
}


export function createItem() {
  const response = {}

  return {
    type: CREATE_ITEM,
    payload: response
  }
}


export function readPack(packId) {
  const response = axios.get(`${ROOT_URL}/api/users/${USER_ID}/packs/${packId}`)
    .then((resp) => resp.data)

  return {
    type: READ_PACK,
    payload: response
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


export function deleteItem(itemId) {
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
            console.log(resp.data)
            dispatch({
              type: READ_PACKS,
              payload: resp.data
            })
          })
      })
  }
}

