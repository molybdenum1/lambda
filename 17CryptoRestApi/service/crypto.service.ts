import axios from "axios";
import { apiLinks, iApiLink } from "../data/links";


class CryptoService {
    
    async getCrypto (period: string, coin: string, market: string) {
        let apiLink: iApiLink
        let response
        if(market) {
            apiLink = apiLinks.filter(apiLink => apiLink.name === market)[0]
            if(apiLink.headers){
                response = await axios.get(`${apiLink.link}`, {
                    headers: {
                        'X-CMC_PRO_API_KEY': 'e320c0a3-b5e4-4a99-8fac-750034ab5716'
                    }
                } )
            }else {
                response = await axios.get(`${apiLink.link}`)
            }
            
        }
        return response?.data
    }

}
export default CryptoService;

