import { Router } from "express";
import passport from "passport";

const routerGithub = Router()
//Register
routerGithub.get("/github",passport.authenticate("github",{scope:["user:email"]}), async(req,res)=>{req.session.login = true;})
//Login
routerGithub.get("/githubSession",passport.authenticate("github"),async(req,res)=>{

    req.session.user=req.user;
    req.session.login = true;
    res.redirect("/products")
})

export default routerGithub