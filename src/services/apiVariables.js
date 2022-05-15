// import { generateQuery } from './helperFunctions';




export const testApi = {
  get: {
    api: '/posts',
    method: 'get',
    baseURL: 'test',
  },
}



export const model = {
  get: {
    api: 'viewmodel',
    method: 'get',
    baseURL: 'normal',
  },
  create: {
    api: 'postmodel',
    method: 'post',
    baseURL: 'normal',
  },update: {
    api: 'putmodel',
    method: 'put',
    baseURL: 'normal',
  },default: {
    api: 'deletemodel',
    method: 'post',
    baseURL: 'normal',
  },
}

export const classes = {
  allClasssList: {
    api: '/allClasssList.json',
    method: 'get',
    baseURL: 'normal',
  },
}
