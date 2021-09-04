import { Router } from "express";
import path from "path";
import { Container } from "typedi";
import converterService from "../services/v1/converterService";
import multerConfig from "../config/multerConfig";
import multer from "multer";
import download from 'download-pdf';

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
  })

  
  



};
