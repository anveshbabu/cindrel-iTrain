import { model } from "../../services/apiVariables";
import { api } from "../../services/api"
import { Toast } from "../../services/toast";
import { objectToQueryString } from '../../services/helperFunctions'



export const getModelList = (body) => {

    return new Promise((resolve, reject) => {
        // let prefixUrl=objectToQueryString(reqObj);
        console.log('reqObj------------->', body)
        api({ ...model.get, body }).then((data) => {
            // Toast({ type: 'success', message: 'You have been sucessfully logged into iTrain', title: 'Success!' })
            resolve(data)
        }).catch(({ erroe: { message = '' } }) => {
            if (!!message) {
                Toast({ type: 'danger', message: message, title: 'Error' })
            } else {
                Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            }
            reject(message)


        });
    });
}

export const createModelList = (body) => {

    return new Promise((resolve, reject) => {
        api({ ...model.create, body }).then((data) => {
            // Toast({ type: 'success', message: 'You have been sucessfully logged into iTrain', title: 'Success!' })
            resolve(data)
        }).catch(({ erroe: { message = '' } }) => {
            if (!!message) {
                Toast({ type: 'danger', message: message, title: 'Error' })
            } else {
                Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            }

            reject(message)


        });
    });
}



export const updateModelList = (body) => {

    return new Promise((resolve, reject) => {
        api({ ...model.update, body }).then((data) => {
            // Toast({ type: 'success', message: 'You have been sucessfully logged into iTrain', title: 'Success!' })
            resolve(data)
        }).catch(({ erroe: { message = '' } }) => {
            if (!!message) {
                Toast({ type: 'danger', message: message, title: 'Error' })
            } else {
                Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            }

            reject(message)


        });
    });
}


export const deleteModelList = (body) => {

    return new Promise((resolve, reject) => {
        api({ ...model.default, body }).then((data) => {
            // Toast({ type: 'success', message: 'You have been sucessfully logged into iTrain', title: 'Success!' })
            resolve(data)
        }).catch(({ erroe: { message = '' } }) => {
            if (!!message) {
                Toast({ type: 'danger', message: message, title: 'Error' })
            } else {
                Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            }

            reject(message)


        });
    });
}


export const trainModelList = (reqObj) => {

    return new Promise((resolve, reject) => {
        let prefixUrl = objectToQueryString(reqObj);
        api({ ...model.trainmodel, prefixUrl }).then((data) => {
            let { message } = data;
            Toast({ type: 'success', message, title: 'Success!' })
            resolve(data)
        }).catch(({ erroe: { message = '' } }) => {
            if (!!message) {
                Toast({ type: 'danger', message: message, title: 'Error' })
            } else {
                Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            }

            reject(message)


        });
    });
};




export const getModelUserList = (body) => {

    return new Promise((resolve, reject) => {
        api({ ...model.getModuleUser, body }).then((data) => {
            // Toast({ type: 'success', message: 'You have been sucessfully logged into iTrain', title: 'Success!' })
            resolve(data)
        }).catch(({ erroe: { message = '' } }) => {
            if (!!message) {
                Toast({ type: 'danger', message: message, title: 'Error' })
            } else {
                Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            }

            reject(message)


        });
    });
}