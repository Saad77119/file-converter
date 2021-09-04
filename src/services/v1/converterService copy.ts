import * as request from "request";
import helperService from "./helperService";
import {of , forkJoin, bindNodeCallback } from "rxjs";
import { catchError } from "rxjs/operators";
import BaseService from "./baseService";
import { URLS } from "../../interface/url.interface"

export default class AddressService extends BaseService {

	fetchTitleFromURLs = async (req: any, res: any)  => {
    if (req.query.address) {
      let addresses = [];

      addresses = helperService.validatedUrls(
        typeof req.query.address === "string"
          ? [req.query.address]
          : req.query.address
      );
	  const requestAsObservable = bindNodeCallback(request.get);

      const observables = addresses
        .filter((address) => address.value === null)
        .map((address, index) =>
          requestAsObservable({
            url: address.address,
            headers: { addressIndex: index },
		  }).pipe(
			catchError(error => of(error))
			)
		);

		const data : URLS[] = await new Promise((resolve, _reject)   => {
			forkJoin(...observables)
			.subscribe(
				(resp: any) => {
				  	const data = resp.map((addresRespnse, index) => {	
					
						if(addresRespnse.errno) {
						return this.makeNoResponseObject(addresRespnse, addresses)	
					}

					return this.makeSuccessObject(addresRespnse[0], addresses);
				  });
				  
				  resolve(data);
				  
				}
				
			)
		});


		return [...data, ...this.fetchInvalidURLAddress(addresses)]

    }
  };

 
}
