import cheerio from  'cheerio';
import { RESPONSE } from "../../interface/response.interface"


const NO_RESPONSE = 'NO RESPONSE';


abstract class BaseService {

 
  makeResponseObject = (success ,message, convertedFile = null) :RESPONSE => {
   return {
     success: success,
     message: message,
     data: convertedFile ? {converted_file: convertedFile} : null
    
   }
  }

 
}

export default BaseService;