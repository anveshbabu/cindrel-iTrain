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
  }, update: {
    api: 'putmodel',
    method: 'put',
    baseURL: 'normal',
  }, default: {
    api: 'deletemodel',
    method: 'post',
    baseURL: 'normal',
  },
}

export const classes = {
  get: {
    api: '/viewclass',
    method: 'get',
    baseURL: 'normal',
  },
  create: {
    api: '/postclass',
    method: 'post',
    baseURL: 'normal',
  },
  delete: {
    api: '/deleteclass',
    method: 'post',
    baseURL: 'normal',
  },
}


export const authentication = {
  userSignIn: {
    api: '/login',
    method: 'post',
    baseURL: 'normal',
  },
}
