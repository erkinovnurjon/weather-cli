import https from "https"
import { TOKEN_DICTIONARY, getKeyValue } from "./storage-save.js"

const getWeather = async (city) => {
      //https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=39.099724&lon=-94.578331&dt=1643803200&appid={API key}
     
      const token = getKeyValue(TOKEN_DICTIONARY.token)

      const url = new URL('https://api.openweathermap')
      url.searchParams.append('q' , city)
      url.searchParams.append('appid' , token)
      url.searchParams.append('lang' , 'en')
      url.searchParams.append('units' , 'metric')

      https.get(url , response => {
            let res = ''
            response.on('data' , chunk => {
                  res = res + chunk
            })
            response.on('end' ,  () => {
               console.log(res);
            })
      })
}

export {getWeather}