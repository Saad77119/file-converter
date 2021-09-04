import BaseService from "./baseService";
import path from 'path';
import fs from 'fs';
import docxConverter from 'docx-pdf';

export default class ConverterService extends BaseService {

	convertDocxToPdf =  async (req: any, res: any)  => {

		try {
			
			if(req.file) {

				console.log(req.file);
				
				const enterPath = path.join(__dirname , "../../views/public/files",req.file.filename);
				const outPathFileName = req.file.filename.split(".docx")[0]+'.pdf';
				const outputPath = path.join(__dirname , "../../views/public/files/converted-pdf",outPathFileName);
				
				const data = await docxConverter(enterPath, outputPath, (err,res)=> {});
				fs.unlinkSync(enterPath)
				 return this.makeResponseObject(true, 'Successfully Converted', 'files/converted-pdf/'+outPathFileName)
	
				} else {
	
					return this.makeResponseObject(false, 'Invalid File format.Please try again')
				}


		} catch(err) {
			return this.makeResponseObject(false, 'Something issue please try again')
		}
	
  };
	
}
