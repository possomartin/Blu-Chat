//Authorization
const isAuth = (req, res, next) => {
    if(req.session.isAuth)
    {
        next()
    }
    else{
        res.status(401).json({success: false, msg: 'No Authorization'});
    }
}

module.exports = isAuth;