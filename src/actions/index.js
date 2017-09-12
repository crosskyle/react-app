import axios from 'axios'

import {
  DELETE_ITEM,
  CREATE_PACK,
  READ_PACK,
  READ_PACKS,
  SELECTED_PACK,
  READ_ITEMS
} from './types'

const ROOT_URL = 'http://localhost:3050'

const USER_ID = '59b5a0bda049a53cab715a8c'

export function createPack() {
  const response = axios.post(`${ROOT_URL}/api/users/${USER_ID}/packs`)
    .then((resp) => resp.data)

  return {
    type: CREATE_PACK,
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

export function deleteItem(id) {
  console.log(id)
  const request = axios
    .delete(`${ROOT_URL}/api/users/${USER_ID}/items/${id}`)
    .then((res) => console.log(res))
    .catch(() => console.log('woah'))

  return {
    type: DELETE_ITEM,
    payload: id

  }
}

