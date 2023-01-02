const fs = require('fs');
const axios = require('axios');

class Busquedas {
    db_path='./db/database.json'
    historial = [];

    constructor(){

    }

    get historialCapitalizado(){
        return this.historial.map( lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );

            return palabras.join(' ');
        });
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'lenguage': 'es'
        }
    }

    get paramsOpenWeather(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
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

    async climaLugar( lat, lon){
        try{

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenWeather, lat, lon }
            });

            const resp = await instance.get();
            
            return {
                desc: resp.data.weather[0].description,
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
                temp: resp.data.main.temp
            }

        } catch(error) {
            console.log(error);
            return [];
        }
    }

    agregarHistorial( lugar = '' ){

        if( this.historial.includes(lugar.toLocaleLowerCase()) ){
            return;
        }
        this.historial = this.historial.splice(0,5);
        this.historial.unshift(lugar.toLocaleLowerCase());
        this.guardarDB();
    }

    guardarDB(){
        const payload = {
            historial: this.historial
        };

        fs.writeFileSync( this.db_path, JSON.stringify(payload) );        
    }

    leerDB(){
        if( !fs.existsSync(this.db_path) ) null;

        const info = fs.readFileSync( this.db_path, { encoding : 'UTF-8' } );
        
        const data = JSON.parse(info);

        this.historial = data.historial;
    }

}

module.exports = Busquedas;