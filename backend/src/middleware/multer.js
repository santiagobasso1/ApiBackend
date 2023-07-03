import fs from 'fs'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const folderPath = `src/public/img/${file.fieldname}`;
      fs.mkdirSync(folderPath, { recursive: true }); // Verificar y crear la carpeta si no existe
      cb(null, folderPath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  

export const upload = multer({storage:storage})

export const mensajeResultadoMulter=(req,res)=>{
    res.status(200).json({message:"Upload image completed successfully"})
}