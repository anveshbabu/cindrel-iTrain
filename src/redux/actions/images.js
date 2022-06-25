import { moduleOrClassImages } from "../../services/apiVariables";
import { api ,formDataApi} from "../../services/api"
import { Toast } from "../../services/toast";
import { objectToQueryString } from '../../services/helperFunctions'


export const uploadImageModuleOrClass = (body) => {
   

    return new Promise((resolve, reject) => {
        formDataApi({ ...moduleOrClassImages.post, body }).then((data) => {
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

export const getImageImageModuleOrClass = (reqObj) => {

    return new Promise((resolve, reject) => {
        let prefixUrl=objectToQueryString(reqObj);
        api({ ...moduleOrClassImages.get, prefixUrl }).then((data) => {
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


