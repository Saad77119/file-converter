import { RESPONSE } from "../../constants/response.const";
import { URLS } from "../../interface/url.interface"


export default class HelperService {
  static validatedUrls = (urls): URLS[] => {
    return urls.map((url) => {
      const httpsScheme = "https://";
      const regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
      const match = regex.test(url);
      return match
        ? url.indexOf("http://") == 0 || url.indexOf("https://") == 0
          ? { hostname: url, address: url, value: null }
          : { hostname: url, address: httpsScheme + url, value: null }
        : { hostname: url, address: url, value: RESPONSE.NOT_VALIDATED };
    });
  };
}
