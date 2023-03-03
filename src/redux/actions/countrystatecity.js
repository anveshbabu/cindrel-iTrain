import { countrystatecity } from "../../services/apiVariables";
import { api } from "../../services/api"
import { Toast } from "../../services/toast";
import { objectToQueryString } from '../../services/helperFunctions'


export const getAllCountry = (reqObj) => {

    return new Promise((resolve, reject) => {
        api({ ...countrystatecity.countries }).then((data) => {
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
