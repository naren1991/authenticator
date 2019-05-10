//Utils

exports.authenticate = (req) => {
    var res = null
   
    ////////////////////////////////////////////
    //TODO: Implement and test Auth with google
    console.log("start auth")
    /*passport.authenticate('google', {
        scope: ['profile', 'email']
    })*/
    
    //console.log(req)
    //////////////////////////////////////////////

    console.log("auth request sent")
    res = req
    return res;
    
}

exports.callback = (req) => {
    var res = null
    res = req
    console.log("calling back")


    /////////////////////////////////////
    //TODO: This flow needs to be thought of properly. Unclear.

    //TODO: Pass request/ response correctly
    
    /*   passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        console.log("authenticated")
        console.log(res)
    }*/
    //////////////////////////////////////
    return res
}

