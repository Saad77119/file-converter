import { Router } from "express";
import path from "path";
import { Container } from "typedi";
import converterService from "../services/v1/converterService";
import multerConfig from "../config/multerConfig";
import multer from "multer";
import fs from "fs";
import request from "request";

const converterServiceInstance = Container.get(converterService);

/**
 * Converter Resource
 */
export default (app : Router) => {

//GET request on "/" and render index.html 
  app.get("/", async (req, res) => {
    res.render(path.resolve("src/views/converter/index"), {
      convertedFileDetail: null,
    });
  });

//GET request on "/converter/docx" and render docx-to-pdf.html 
  app.get("/converter/docx", async (req, res) => {
    res.render(path.resolve("src/views/converter/docx-to-pdf"), {
      convertedFileDetail: null,
    });
  });

//POST request on "/uploaddocx" to convert docx to pdf 
  app.post('/uploaddocx', multer(multerConfig('docx')).single('docx'), async function(req, res, next){
   
          const converterDetail = await converterServiceInstance.convertDocxToPdf(
    req,
    res
  );    
  res.render(path.resolve("src/views/converter/docx-to-pdf"), {
    convertedFileDetail : converterDetail,
  });
  });

//GET request on "/converter/pdf1" and render pdf-to-docx-method1.html 
  app.get("/converter/pdf1", async (req, res) => {
    res.render(path.resolve("src/views/converter/pdf-to-docx-method1"), {
      convertedFileDetail: null,
    });
  });

//GET request on "/converter/pdf2" and render pdf-to-docx-method2.html 
  app.get("/converter/pdf2", async (req, res) => {
    res.render(path.resolve("src/views/converter/pdf-to-docx-method2"), {
      convertedFileDetail: null,
    });
  });
  

//POST request on "/uploadpdf" to convert pdf to docx by method1
  app.post('/uploadpdf', multer(multerConfig('pdf')).single('pdf'), async function(req, res, next){ 
    const converterDetail = await converterServiceInstance.convertPdfToDocxMethod1(
    req,
    res
    );    
    res.render(path.resolve("src/views/converter/pdf-to-docx-method1"), {
    convertedFileDetail : converterDetail,
    });
  });

//POST request on "/uploadpdf2" to convert pdf to docx by method2  
  app.post('/uploadpdf2', multer(multerConfig('pdf')).single('pdf'), async function(req, res, next){
    
    const converterDetail = await converterServiceInstance.convertPdfToDocxMethod2(
    req,
    res
    );    
    res.render(path.resolve("src/views/converter/pdf-to-docx-method2"), {
    convertedFileDetail : converterDetail,
    });
    });
};
