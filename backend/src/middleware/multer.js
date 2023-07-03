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


export const upload = multer({ storage: storage })

export const associateDocumentsToUser = async (req, res) => {
  const cookie = req.cookies['userCookie']
  if (!cookie) {
    req.logger.fatal("Logued user not found")
    return res.status(401).json({ error: "Logued user not found" })
  }
  const loguedUser = jwt.verify(cookie, process.env.JWT_SECRET).user;
  const dbUser = await findUserById(loguedUser._id)
  try {
    req.files.forEach(document => {
      if (dbUser.documents.some((dbDocument) => { return dbDocument.name == document.filename })) {
        return ""
      }
      dbUser.documents.push({
        name: document.filename,
        reference: `${document.destination}/${document.filename}`
      })
    });
    dbUser.lastConnection = Date.now()
    if (dbUser.documents.length > 0) {
      dbUser.hasDocuments = true
    }
    await dbUser.save()
    res.status(200).json({ message: "Upload image completed successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error with the upload" })
  }

}


export const getUserDocumentsLink = async (req, res) => {
  const cookie = req.cookies['userCookie']
  if (!cookie) {
    req.logger.fatal("Logued user not found")
    return res.status(401).json({ error: "Logued user not found" })
  }
  const loguedUser = jwt.verify(cookie, process.env.JWT_SECRET).user;
  try {
    const dbUser = await findUserById(loguedUser._id)
    const documentsLinkArray = [];
    if (dbUser.documents.length > 0) {
      dbUser.documents.forEach(document => {
        documentsLinkArray.push(document.name);
        console.log(documentsLinkArray)
      })
      return res.status(200).json({
        message:"Your documents",
        documents: documentsLinkArray
      })
    }else{
      res.status(404).json({message:"Documents not found"})
    }


  } catch (error) {
    res.status(500).json({
      message: "Error with the server",
      error: error
    })
  }

}