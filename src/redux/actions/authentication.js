import { authentication } from "../../services/apiVariables";
import { api } from "../../services/api"
import { Toast } from "../../services/toast";
import { EXIST_LOCAL_STORAGE } from '../../services/constants'
import { setStorage } from '../../services/helperFunctions'



// login apil call function start
export const userSignin = (body) => {
    return new Promise((resolve, reject) => {
        api({ ...authentication.userSignIn, body }).then(({ access_token='',refresh_token='',results='',status='',message='' }) => {
            if (status ==='success') {
                setStorage(EXIST_LOCAL_STORAGE.AUTHTOKEN, access_token);
                setStorage(EXIST_LOCAL_STORAGE.REFRESH_TOKEN, refresh_token);
                setStorage(EXIST_LOCAL_STORAGE.USER_DETAIL, JSON.stringify(results));
                resolve({status,results})
            } else {
                reject(message);
                if(message){
                    Toast({ type: 'danger', message: message, title: 'Error' })
                }else{
                    Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
                }
              
            }
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
