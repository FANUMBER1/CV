const express=require('express');
const app = express();
const router=express.Router();
const usermodel=require('../../model/user/user')
const adminmodel=require('../../model/admin/admin')
app.set('view engine', 'ejs');
module.exports={
    postIndex:async(req,res)=>{
        const data=await adminmodel.post()
       res.redirect('/user')
       },
    postuserIndex:async(req,res)=>{
     const idpost=parseInt(req.params.idpost)||3;
     const data=await adminmodel.post()
    res.render('./page/index',{k1:'active',k2:'',k3:'',k4:'',k5:'',data:data,idpost:idpost})
    },
    postPost:async(req,res)=>{
        const idpost=parseInt(req.params.idpost)||3;
        const datapost= await adminmodel.pageEditPost(idpost);
        const datacomment= await adminmodel.commentpost(idpost);
        const datacategori= await adminmodel.datacategori(idpost);
        const data= await adminmodel.post()
        res.render('./page/post',{k1:'',k2:'active',k3:'',k4:'',k5:'',datapost:datapost,datacomment:datacomment,datacategori:datacategori,datat:data,idpost:idpost})
    },
    userComment:async(req,res)=>{
        const iduser=parseInt(req.session.userId)       
        const idpost=parseInt(req.params.idpost)||3;
        const content=req.body.content
        console.log(iduser)
        const creat= await usermodel.comment(iduser,idpost,content);
        const link='/post/'+idpost
        res.redirect(link)
    },
    postAbout:async(req,res)=>{
        const idpost=parseInt(req.params.idpost)||3;
        const dataprofile= await adminmodel.profile();
        const datapurpose = await adminmodel.purpose();
        const datafounder= await adminmodel.fouder()
        res.render('./page/about',{k1:'',k2:'',k3:'active',k4:'',k5:'',idpost:idpost,dataprofile:dataprofile,datapurpose:datapurpose,datafounder:datafounder})
    },
    postContact:async(req,res)=>{
        const idpost=parseInt(req.params.idpost)||3;
        res.render('./page/contact',{k1:'',k2:'',k3:'',k4:'active',k5:'',idpost:idpost})
    },
    creatContact:async(req,res)=>{
       const name= req.body.name;
       const email= req.body.email;
       const Subject= req.body.subject;
       const Message= req.body.message;
       const creat= await usermodel.creatContact(name,email,Subject,Message)
       res.redirect('/contact')
    },
    postAuthor:async(req,res)=>{
        const iduser=parseInt(req.session.userId) ;      
        const idpost=parseInt(req.params.idpost)||3;
        const author= await adminmodel.pageEditInforUser(iduser);
        const dataCategori=await adminmodel.categori()
        res.render('./page/authorPost',{k1:'',k2:'',k3:'',k4:'',k5:'active',idpost:idpost,iduser:iduser,dataCategori:dataCategori,author:author})
    },
    creatPost:async(req,res)=>{
        const author=parseInt(req.session.userId);
        const name=req.body.name;
        const anh=req.file;
        const img= await adminmodel.newImg(anh);
        const content=req.body.content;
        const describe=req.body.describe;
        const categori=req.body.categori;
        const time=req.body.time
        const creat= await adminmodel.createPost(author,name,img,content,describe,categori,time);
        res.redirect('/')
    }
}