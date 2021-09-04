import multer from "multer";
    
export default (extension) => {
    return {

        //specify diskStorage (another option is memory)
        storage: multer.diskStorage({
    
          //specify destination
          destination: function(req, file, next){
            next(null, "src/views/public/files");
          },
    
          //specify the filename to be unique
          filename: function(req, file, next){
            
            //get the file mimetype ie 'image/jpeg' split and prefer the second value ie'jpeg'
            const ext = extension;
            //set the file fieldname to a unique name containing the original name, current datetime and the extension.
            next(null, file.fieldname + '-' + (Math.random() * 10000000) + Date.now() + '.'+ext);
          }
        }),
    
        // filter out and prevent non-image files.
        fileFilter: function(req, file, next) {
              if(!file){
                next();
              }
    
            if(file.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
              next(null, true);
            }else{
    
                next();         
            }
        }
      }
};