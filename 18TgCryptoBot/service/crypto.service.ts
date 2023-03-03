import axios from "axios";

class CryptoService {
    constructor(){}

    async getCrypto(coin:string){
        try {
            const crypto = await axios.get(`http://localhost:5050/getCryptoData?coin=${coin}`);
            return crypto
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}
export default new CryptoService();