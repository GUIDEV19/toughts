function checkAuth(req, res, next){
    console.log('entei!');
    const userId = req.session.userid;
    if(!userId){
        res.redirect('/login');
    }

    next();
}

export default checkAuth;