import { Router } from "express";
import path from "path";
import { Container } from "typedi";
import converterService from "../services/v1/converterService";
import multerConfig from "../config/multerConfig";
import multer from "multer";
var pandoc = require('node-pandoc');


const converterServiceInstance = Container.get(converterService);
var fs = require('fs'),
    request = require('request');

/**
 * Converter Resource
 */
export default (app: Router) => {
 



  app.get("/converter/docx", async (req, res) => {
    res.render(path.resolve("src/views/converter/docx-to-pdf"), {
      convertedFileDetail: null,
    });
  });
  app.post('/uploaddocx', multer(multerConfig('docx')).single('docx'), async function(req, res, next){
   
          const converterDetail = await converterServiceInstance.convertDocxToPdf(
    req,
    res
  );    
  console.log(converterDetail);

  res.render(path.resolve("src/views/converter/docx-to-pdf"), {
    convertedFileDetail : converterDetail,
  });
  });
  app.get("/converter/pdf", async (req, res) => {
    res.render(path.resolve("src/views/converter/pdf-to-docx"), {
      convertedFileDetail: null,
    });
  });
  app.get("/testpdftodocx",async function(req,res,next){
    
    var src, args, callback;
    const enterPath = path.join(__dirname , "../views/public/files/resume.pdf");
    src = enterPath ;
    args = ['-f','pdf', '-o','48656219.docx'];
// Set your callback function
    callback = function (err, result) {

        if (err) {
            console.error('Oh Nos: ',err);
        }

        // For output to files, the 'result' will be a boolean 'true'.
        // Otherwise, the converted value will be returned.
        console.log(result);
        // Call pandoc


    };
    await pandoc(src, args, callback);
    res.send({"status":"ok"})
  });
  app.post('/uploadpdf', multer(multerConfig('pdf')).single('pdf'), async function(req, res, next){
   
    const converterDetail = await converterServiceInstance.convertPdfToDocx(
req,
res
);    
console.log(converterDetail);

res.render(path.resolve("src/views/converter/pdf-to-docx"), {
convertedFileDetail : converterDetail,
});
});

  
  



};
