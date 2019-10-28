const jwt = require('jsonwebtoken');

function auth(req, res, next){
    console.log(req.header('auth-token'))
    //retrieve token from function header
    const token = req.header('auth-token');
    if(!token) return res.status(401).send("access-denied");

    try{
        //verify the token using secret key and token
        const verified = jwt.verify(token, process.env.SECKRET_KEY);
        req.user = verified;
        next();
    } catch(err){
        res.status(400).send('Invalid User');
    }
}
module.exports = auth;