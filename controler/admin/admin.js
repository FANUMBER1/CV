const express=require('express');
const app = express();
const router=express.Router();
const adminmodel=require('../../model/admin/admin')
app.set('view engine', 'ejs');

module.exports={
    profile:async(req,res)=>{
        const data= await adminmodel.profile();
        res.render('profile',{data:data})
    },
    editprofile:async(req,res)=>{
        const data= await adminmodel.profile();
        res.render('./edit/profile',{data:data})
    },
    editInforProfile:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const name=req.body.name;
        const address=req.body.address;
        const phone=req.body.phone;
        const email=req.body.email;
        const describe=req.body.describe;
        const content=req.body.content;
        const data= await adminmodel.profile()
        var anh= req.file;
        var img= await adminmodel.img(anh,data)
        const edit= await adminmodel.editprofile(id,name,address,phone,email,describe,content,img);
        res.redirect('/admin')
    },
    //////////FOUNDER
    fouder:async(req,res)=>{
        const data= await adminmodel.fouder();
        res.render('member',{data:data})
    },
    pageEditFouder:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await adminmodel.pageEditFouder(id)
        res.render('./edit/member',{data:data})
    },
    editFounder:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const name=req.body.name;
        const position=req.body.position;
        const describe=req.body.describe;
        const data= await adminmodel.editInforUser(id)
        const anh=req.file
        const img= await adminmodel.img(anh,data)
        const create= await adminmodel.editFounder(id,name,position,describe,img)
        res.redirect('/admin/FOUNDER') 
    },
    pageCreateFouder:async(req,res)=>{
        res.render('./create/member')
    },
    createFounder:async(req,res)=>{
       const name=req.body.name;
       const position=req.body.position;
       const describe=req.body.describe;
       const img='/assets/upload/'+req.file.filename
       const create= await adminmodel.createFounder(name,position,describe,img)
       res.redirect('/admin/FOUNDER')
    },
    deleteFounder:async(req,res)=>{
      const id=parseInt(req.params.ID);
      const del= await adminmodel.deleteFounder(id)
      res.redirect('/admin/FOUNDER')
    },
    /////////PURPOSE
    purpose:async(req,res)=>{
        const data= await adminmodel.purpose();
        res.render('purpose',{data:data})
    },
    pageEditPurpose:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await adminmodel.pageEditPurpose(id)
        console.log(id)

        res.render('./edit/purpose',{data:data})
    },
    editPurpose:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const name=req.body.name;
        const describe=req.body.describe;
        const data= await adminmodel.pageEditPurpose(id)
        const anh=req.file
        const img= await adminmodel.img(anh,data)  
        const create= await adminmodel.editPurpose(id,name,describe,img)
        res.redirect('/admin/PURPOSE') 

    },
    pageCreatePurpose:async(req,res)=>{
        res.render('./create/purpose')
    },
    createPurpose:async(req,res)=>{
        const name=req.body.name;
        const describe=req.body.describe;
        const anh=req.file
        const img= await adminmodel.newImg(anh)
        const create= await adminmodel.createPurpose(name,describe,img)
        res.redirect('/admin/PURPOSE')
 
    },
    deletePurpose:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await adminmodel.deletePurpose(id)
        res.redirect('/admin/PURPOSE')  
    },
    ////////POST
    post:async(req,res)=>{
        const data= await adminmodel.post();
        res.render('post',{data:data})   
    },
    pageEditPos:async(req,res)=>{
        const id=parseInt(req.params.IDPost);
        console.log(1)
        console.log(id)
        const data= await adminmodel.pageEditPost(id);
        const datacategori= await adminmodel.categori()
        const datacategoriposst= await adminmodel.datacategori(id)
        const dataauthor= await adminmodel.fouder()
        res.render('./edit/post',{data:data,datacategori:datacategori,dataauthor:dataauthor,categori:datacategoriposst})
    },
    editPost:async(req,res)=>{
        const id=parseInt(req.params.ID);
        console.log(id)
        const author=parseInt(req.body.author);
        const name=req.body.name;
        const data= await adminmodel.pageEditPost(id)
        const anh=req.file;
        const img= await adminmodel.img(anh,data)        
        const content=req.body.content;
        const describe=req.body.describe;
        const categori=req.body.categori;
        const time=req.body.time
        console.log(2)
        const creat= await adminmodel.editPost(id,author,name,img,content,describe,categori,time);
        res.redirect('/admin/POST')
    },
    pageCreatePost:async(req,res)=>{
        const dataAuthor= await adminmodel.fouder()
        const dataCategori=await adminmodel.categori()
        res.render('./create/post',{dataCategori:dataCategori,dataauthor:dataAuthor})
    },
    createPost:async(req,res)=>{
        const author=parseInt(req.body.author);
        const name=req.body.name;
        const anh=req.file;
        const img= await adminmodel.newImg(anh)
        const content=req.body.content;
        const describe=req.body.describe;
        const categori=req.body.categori;
        const time=req.body.time
        const creat= await adminmodel.createPost(author,name,img,content,describe,categori,time);
        res.redirect('/admin/POST')   
    },
    deletePost:async(req,res)=>{
        const id=parseInt(req.params.ID)
        const del= await adminmodel.deletePost(id)
        res.redirect('/admin/POST')
    },
    ////////USER
    user:async(req,res)=>{
        const data= await adminmodel.user();
        res.render('inforUser',{data:data})
    },
    pageEditInforUser:async(req,res)=>{
        const id=parseInt(req.params.ID)
        const data= await adminmodel.pageEditInforUser(id)
        const datarole= await adminmodel.role()
        res.render('./edit/inforuser',{data:data,datarole:datarole})
    },
    editInforUser:async(req,res)=>{
        const id= parseInt(req.params.ID)
        const name= req.body.name;
        const taikhoan=req.body.taikhoan;
        const pass0=req.body.pass;
        const data= await adminmodel.pageEditInforUser(id)
        const anh=req.file;
        const img= await adminmodel.img(anh,data)
        const role=parseInt(req.body.position);
        const edit= await adminmodel.editInforUser(id,name,taikhoan,pass0,img,role)
        res.redirect('/admin/INFORUSER')
    },
    pageCreateInforUser:async(req,res)=>{
    },
    createInforUser:async(req,res)=>{
    
    },
    deleteInforUser:async(req,res)=>{
       const id= parseInt(req.params.ID)  
       const del= await adminmodel.deleteInforUser(id)
       res.redirect('/admin/INFORUSER')
    },
    ////////ROLE
    role:async(req,res)=>{
        const data= await adminmodel.role();
        res.render('inforRole',{data:data})
    },
    pageEditRole:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await adminmodel.pageEditRole(id)
        res.render('./edit/inforRole',{data:data})
    },
    editRole:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const position=req.body.position;
        const create= await adminmodel.editRole(id,position)
        res.redirect('/admin/ROLE') 

    },
    createRole:async(req,res)=>{
        const position=req.body.position;
        const create= await adminmodel.createRole(position)
        res.redirect('/admin/ROLE') 
    },
    deleteRole:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await adminmodel.deleteRole(id)
        res.redirect('/admin/ROLE')  

    },
    ///////SOICIAL
    soicial:async(req,res)=>{
        const data= await adminmodel.soicial();
        res.render('soicial',{data:data})
    },
    pageEditSoicial:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await adminmodel.pageEditSoicial(id)
        res.render('./edit/soicial',{data:data})
    },
    editSoicial:async(req,res)=>{
        const id=parseInt(req.params.ID)
        const name=req.body.name;
        const link=req.body.link;
        const img='/assets/upload/'+req.file.filename
        const create= await adminmodel.editSoicial(id,name,link,img)
        res.redirect('/admin/SOICIAL') 
    },
    createSoicial:async(req,res)=>{
        const name=req.body.name;
        const link=req.body.link;
        const img='../assets/upload/'+req.file.filename
        const create= await adminmodel.createSoicial(name,link,img)
        res.redirect('/admin/SOICIAL') 
    },
    deleteSoicial:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await adminmodel.deleteSoicial(id)
        res.redirect('/admin/SOICIAL')  
    },
    ///////COMMENT
    comment:async(req,res)=>{
        const data= await adminmodel.comment()
        res.render('comment',{data:data})
    },
    pageEditComment:async(req,res)=>{
        const id=parseInt(req.params.ID)
        const data= await adminmodel.pagepost(id)
        res.render('./edit/comment',{data:data})
    },
    editComment:async(req,res)=>{
    
    },
    createComment:async(req,res)=>{
    
    },
    deleteComment:async(req,res)=>{
      const id= parseInt(req.params.ID)
      const del= await adminmodel.editComment(id)
      res.redirect('/admin/COMMENT')
    },
    ///////CATEGORI
    categori:async(req,res)=>{
        const data= await adminmodel.categori();
        res.render('categori',{data:data})
    },
    pageEditCategori:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const data= await adminmodel.pageEditCategori(id);
        res.render('./edit/categori',{data:data})
    },
    editCategori:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const name= req.body.name
        const edit= await adminmodel.editCategori(id,name)
        res.redirect('/admin/CATEGORI')
    },
    createCategori:async(req,res)=>{
        const name= req.body.name
        const edit= await adminmodel.createCategori(name)
        res.redirect('/admin/CATEGORI')    
    },
    deleteCategori:async(req,res)=>{
        const id=parseInt(req.params.ID);
        const del= await adminmodel.deleteCategori(id)
        res.redirect('/admin/CATEGORI')
    },
    ///////CONTACTADMIN
    contactAdmin:async(req,res)=>{
        const data= await adminmodel.contactAdmin()
        res.render('contactadmin',{data:data})
    },
    createContact:async(req,res)=>{
    
    },
    deleteContactAdmin:async(req,res)=>{
        const id= parseInt(req.params.ID)
        const del= await adminmodel.deleteContactAdmin(id)
        res.redirect('/admin/CONTACT')
    },
    fullContactAdmin:async(req,res)=>{
        const id= parseInt(req.params.ID)
        const data= await adminmodel.fullContactAdmin(id)
        res.render('./edit/fullcontact',{data:data})
    }
}