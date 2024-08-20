
module.exports={
    checkEmail:(req,res,next)=>{
        const email=req.body.email;
        console.log(email)
        const form =/^[^\s@]+@[^\s@]+\.[^\s@]+\.com$/;
        if(form.test(email)){
            req.flash('error', 'Email không đúng !');
            res.redirect('/contact')
        }else{
            next();
        }
    }
}