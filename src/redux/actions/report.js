import { reporting } from "../../services/apiVariables";
import { api ,formDataApi} from "../../services/api"
import { Toast } from "../../services/toast";



export const getReportDetails = (body) => {

    return new Promise((resolve, reject) => {
        api({ ...reporting.get,body }).then((data) => {
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



export const getUserReport = () => {

    return new Promise((resolve, reject) => {
        api({ ...reporting.userGet }).then((data) => {
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


export const getseasonalityreport = (body) => {

    return new Promise((resolve, reject) => {
        api({ ...reporting.getseasonalityreport,body }).then((data) => {
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