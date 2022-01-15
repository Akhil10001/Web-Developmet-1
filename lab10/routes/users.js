const express = require('express');
const router = express.Router();
const users = require('../data/users');


function paramCheck(username, password)
{

if(!username)
{
    throw 'Please enter username'
}
else if(!password)
{
    throw 'please enter password'
}
else if(username.trim()==0 || /^([a-zA-Z0-9]{4,})*$/.test(username)==false)
{
    throw 'please check the username format'
}
else if(/^([a-zA-Z0-9-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]{6,})*$/.test(password)==false)
{
    throw 'please check the password format'
}


}

router.get('/',async (req,res)=>
{
if(req.session.user)
{
    res.redirect('/private')
}
else{
    res.render('pages/login',{})
}
})


router.get('/private', async (req,res)=>
{

    
   res.render('pages/private',{user:req.session.user.username})

} )


router.get('/signup', async(req,res)=>
{
    if(req.session.user)
    {
        res.redirect('/private')
    }
    else
    {
        res.render('pages/sign-up',{})
    }

})

router.post('/signup', async(req,res)=>
{

    let errors=[]

    userName=req.body.username;
    password=req.body.password;


    try{
    paramCheck(userName,password)
    
    const user=await users.createUser(userName,password)

    if(user.userInserted==true)
    {
        res.redirect('/')
    }
    else
    {
        res.status(500).render('pages/sign-up',{error: errors.push('Internal Server Error')})
        return;
    }

    }
    catch(e)
    {
        errors.push(e)
        res.status(400).render('pages/sign-up',{error: errors})
        return;
    }

})





router.post('/login', async (req,res)=>
{
    let errors=[]

    userName=req.body.username;
    password=req.body.password;


    try{
    paramCheck(userName,password)
    }
    catch(e)
    {
        errors.push(e)
        res.status(400).render('pages/login',{error: errors})
        return;
    }
    try{
    const user=await users.checkUser(userName,password)

    if(user.authenticated==true)
    {
        req.session.user={username : user.username}
        res.redirect('/private')
    
    }
    else
    {
        errors.push('username or password are invalid')
        res.status(400).render('pages/login',{error:errors })
    }
    }
    catch(e)
    {
        errors.push(e)
        res.status(400).render('pages/login',{error:errors })
    }

})


router.get('/logout',(req,res)=>{

    if(req.session.user)
    {
    req.session.destroy()
    
    res.clearCookie('AuthCookie')

    res.render('pages/logout',{})
}
else
{
    res.redirect('/')
}
})



module.exports=router