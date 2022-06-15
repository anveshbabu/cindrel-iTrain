import { moduleOrClassImages } from "../../services/apiVariables";
import { api } from "../../services/api"
import { Toast } from "../../services/toast";
import { objectToQueryString } from '../../services/helperFunctions'


export const uploadImageModuleOrClass = (body) => {
    console.log('body---------->',body)
    var bodyFormData = new FormData();

    bodyFormData.set('photo[]', body?.photo);
    bodyFormData.set('model_id', body?.model_id);
    bodyFormData.set('class_id', body?.class_id);
    bodyFormData.set('user_id', body?.user_id);


    return new Promise((resolve, reject) => {
        api({ ...moduleOrClassImages.post, body: bodyFormData }).then((data) => {
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


