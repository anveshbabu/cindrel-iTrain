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
    method: 'post',
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
  }, trainmodel: {
    api: 'trainmodel',
    method: 'get',
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
  update: {
    api: '/putclass',
    method: 'put',
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

export const moduleOrClassImages = {
  post: {
    api: 'postimage',
    method: 'post',
    isFormData:true,
    baseURL: 'normal',
  },
  get: {
    api: 'viewimage',
    method: 'post',
    baseURL: 'normal',
  },
}


export const experiments = {
  viewimages: {
    api: 'viewtestimages',
    method: 'post',
    baseURL: 'normal',
  },
  updateTestResults: {
    api: 'update_test_results',
    method: 'post',
    baseURL: 'normal',
  },
  updateTestImage: {
    api: 'upload_test_image',
    method: 'post',
    baseURL: 'normal',
    isFormData:true,
  },
}

