import axios from "axios";
import { apiLinks } from "./data/links";

export const getCrypto = async (period: string, coin: string, market: string) => {
    let link: string
    let response
    if(market) {
        link = apiLinks.filter(apiLink => apiLink.name === market)[0].link
        // if(coin){
        //     response = axios.get(`${link}`)
        // }
        response = await axios.get(`${link}`)
    }
    return response?.data
}
// console.log(getCrypto('', '', 'coinbase'));
