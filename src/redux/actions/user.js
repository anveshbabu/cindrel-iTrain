import { user } from "../../services/apiVariables";
import { api } from "../../services/api"
import { Toast } from "../../services/toast";
import { objectToQueryString } from '../../services/helperFunctions'

export const createUser = (body) => {

    return new Promise((resolve, reject) => {
        api({ ...user.create,body }).then(({message}) => {
            Toast({ type: 'success', message: message, title: 'success' })
            resolve(message)
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

export const getUserList = () => {

    return new Promise((resolve, reject) => {
        api({ ...user.getusers }).then((data) => {
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