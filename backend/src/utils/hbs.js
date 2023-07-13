import 'dotenv/config.js'

export const sendHbsUrl = (req,res)=>{
    const url = process.env.URL_REQUESTS_HBS
    res.status(200).json({message:url})
}