import { classes} from "../../services/apiVariables";
import { api } from "../../services/api"
import { Toast } from "../../services/toast";



export const getAllClasssList = (body) => {

    return new Promise((resolve, reject) => {

        api({ ...classes.allClasssList }).then((data) => {
            // Toast({ type: 'success', message: 'You have been sucessfully logged into iTrain', title: 'Success!' })
            resolve(data)
        }).catch(({erroe:{message=''}}) => {
            Toast({ type: 'danger', message: message, title: 'Error' })
            reject(message)


        })




    })
}