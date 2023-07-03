import fs from 'fs'
import multer from 'multer'
import jwt from 'jsonwebtoken'
import { findUserById } from '../services/UserService.js';

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

export const mensajeResultadoMulter=async(req,res)=>{
    const cookie = req.cookies['userCookie']
    if (!cookie) {
        req.logger.fatal("Logued user not found")
        return res.status(401).json({ error: "Logued user not found" })
    }
    const loguedUser = jwt.verify(cookie, process.env.JWT_SECRET).user;
    const dbUser = await findUserById(loguedUser._id)
    
    req.files.forEach(document => {
        if(dbUser.documents.some((dbDocument)=>{return dbDocument.name==document.filename})){
            return ""
        }
        dbUser.documents.push({
            name:document.filename,
            reference:`${document.destination}/${document.filename}`
        })
    });
    dbUser.lastConnection= Date.now()
    await dbUser.save()
    console.log(dbUser)
    res.status(200).json({message:"Upload image completed successfully"})
}