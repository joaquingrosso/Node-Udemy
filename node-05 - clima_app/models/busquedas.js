
const axios = require('axios');

class Busquedas {

    historial = [];

    constructor(){

    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'lenguage': 'es'
        }
    }

    async ciudad( lugar = '' ){
        try{
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                name: lugar.place_name,
                lng: lugar.center[0],                
                lat: lugar.center[1]
            }));

        } catch {
            console.log('No se encontro informacion!');
            return [];
        }
    }
}

module.exports = Busquedas;