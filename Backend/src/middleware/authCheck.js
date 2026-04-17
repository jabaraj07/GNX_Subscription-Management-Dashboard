import jwt from "jsonwebtoken"

export const validateAuth = (req,res,next) =>{
    try {
        const Token = req.cookies.AccessToken;
        if(!Token){
            return res.status(401).json({message:"UnAuthorize Token missing"})
        }
        const Decode = jwt.verify(Token,process.env.ACCESS_TOKEN_SECRET);        
        req.user = Decode;
        next()
    } catch (error) {
        console.log("Error in ValidateAuth : ",error);
        return res.status(401).json({message:"UnAuthorize"})
    }
}