import BaseService from "./baseService";
import path from 'path';
import fs from 'fs';
import docxConverter from 'docx-pdf';
import parsePdf from 'parse-pdf';
import unoconv from "awesome-unoconv";


export default class ConverterService extends BaseService {


/**
 * @param req 
 * @param res 
 * @decs Convert Docx to Pdf by unoconv
 * @returns object having docx file url
 */	

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

/**
 * @param req 
 * @param res 
 * @decs Convert Pdf to Docx by simple parsing of pdf then wite in docx file
 * @returns object having docx file url
 */	
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
/**
 * @param req 
 * @param res 
 * @decs Convert Pdf to Docx by unoconv
 * @returns object having docx file url
 */	
	convertPdfToDocxMethod2	= async (req: any,res: any)=>{
		try {
			if(req.file) {
				const enterPath = path.join(__dirname , "../../views/public/files",req.file.filename);
				const sourceFilePath = path.resolve(enterPath);
				const outPathFileName = req.file.filename.split(".pdf")[0]+'.docx';
				const outputPath = path.join(__dirname , "../../views/public/files/converted-docx",outPathFileName);
				const outputFilePath = path.resolve(outputPath);	
				await unoconv
				.convert(sourceFilePath, outputFilePath)
				.then(result => {
					fs.unlinkSync(enterPath);
					return this.makeResponseObject(true, 'Successfully Converted', 'files/converted-docx/'+outPathFileName)
					console.log(result); // return outputFilePath
				});				
			}
			else{
				return this.makeResponseObject(false, 'Invalid File format.Please try again');
			}	
			}
		catch(err){
			return this.makeResponseObject(false, err.message);	
		}
		};
}
