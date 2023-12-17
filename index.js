import { printError , printSuccess , printHelp} from "./services/log.service.js"
import getArgs from "./helpers/args.js"
import {TOKEN_DICTIONARY, saveKeyValue} from "./services/storage-save.js"
import { getWeather } from "./services/api.service.js"

const saveToken = async (token) => {
      if (!token.length) {
            printError("Token doesn't exist")
      }
      try {
       await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess("Token was saved")    
      } catch (error) {
            printError(error.message)
      }
      
}

const getForcast = async () => {
      try {
            const response = await getWeather(process.env.CITY ?? "Angren")
            console.log(response);
      } catch (error) {
         if (error?.response?.status == 404) {
            printError("City not found")
         } else if(error?.response?.status == 401) {
            printError("Invalid token")
         } else{
            printError(error.message)
         }
      }
}


const startCli = () => {
      const args = getArgs(process.argv)
      
      if (args.h) {
            //help
            printHelp()
      }
      if (args.s) {
            //save city
      }
      if (args.t) {
          return  saveToken(args.t)
      }
      getForcast()
      
}
startCli()