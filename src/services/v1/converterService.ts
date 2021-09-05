import BaseService from "./baseService";
import path from 'path';
import fs from 'fs';
import docxConverter from 'docx-pdf';
import parsePdf from 'parse-pdf';


export default class ConverterService extends BaseService {

	convertDocxToPdf =  async (req: any, res: any)  => {

		try {
			if(req.file) {
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

	convertPdfToDocx  =  async (req: any, res: any)  => {
	try{
		if(req.file) {
		const enterPath = path.join(__dirname , "../../views/public/files",req.file.filename);
		const parsed = await parsePdf(fs.readFileSync( enterPath));
		console.log(parsed);
		const outPathFileName = req.file.filename.split(".pdf")[0]+'.docx';
		const outputPath = path.join(__dirname , "../../views/public/files/converted-docx",outPathFileName);
		console.log(outputPath);
		await fs.writeFile(outputPath , parsed.pages[0].text, 'UTF-8',function(err){
			if (err) throw err;
		});
		fs.unlinkSync(enterPath)
		return this.makeResponseObject(true, 'Successfully Converted', 'files/converted-docx/'+outPathFileName)

	}
	else{
		return this.makeResponseObject(false, 'Invalid File format.Please try again')
	}
	}
	catch(err){
		return this.makeResponseObject(false, err.message)
	}
	}
}
