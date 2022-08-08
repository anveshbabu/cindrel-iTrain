import { experiments } from "../../services/apiVariables";
import { api ,formDataApi} from "../../services/api"
import { Toast } from "../../services/toast";
// import { objectToQueryString } from '../../services/helperFunctions';




export const getExperimentsImageList = (body) => {

    return new Promise((resolve, reject) => {
        api({ ...experiments.viewimages,body }).then((data) => {
            resolve(data)
        }).catch(({ erroe: { message = '' } }) => {
            if (!!message) {
                Toast({ type: 'danger', message: message, title: 'Error' })
            } else {
                Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            }
            reject(message)


        })
    })
}


export const changeClassForetestImage = (body) => {

    return new Promise((resolve, reject) => {
        api({ ...experiments.updateTestResults,body }).then((data) => {
            Toast({ type: 'success', message: data?.message, title: 'success' })
            resolve(data)
        }).catch(({ erroe: { message = '' } }) => {
            if (!!message) {
                Toast({ type: 'danger', message: message, title: 'Error' })
            } else {
                Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            }
            reject(message)


        })
    })
}


export const uploadImageModule = (body) => {

    return new Promise((resolve, reject) => {
        formDataApi({ ...experiments.updateTestImage, body }).then((data) => {
            resolve(data)
        }).catch(({ erroe: { message = '' } }) => {
            if (!!message) {
                Toast({ type: 'danger', message: message, title: 'Error' })
            } else {
                Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            }
            reject(message)


        })




    })
}


export const getExperimentsList = (body) => {

    return new Promise((resolve, reject) => {
        api({ ...experiments.getModelExperiments,body }).then((data) => {
            resolve(data)
        }).catch(({ erroe: { message = '' } }) => {
            if (!!message) {
                Toast({ type: 'danger', message: message, title: 'Error' })
            } else {
                Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            }
            reject(message)


        })
    })
}