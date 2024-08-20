
module.exports={
    checkComment:(req,res,next)=>{
        const id=parseInt(req.params.idpost);
        const content=req.body.content;
        if(content ===''){
            req.flash('error', 'Bạn chưa comment !');
            var link='/post/'+id;
            res.redirect(link);
        }else{
            next();
        }
    }
}