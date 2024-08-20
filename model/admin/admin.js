const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
const check = (obj) => {
    const newObj = {};
    for (const key in obj) {
      if (obj[key] === null) {
        newObj[key] = '';
      } else {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  };
    

module.exports={
    profile:async(req,res)=>{
        const data= await prisma.$queryRaw`select * from "blog" `
        return data;
    },
    editprofile:async(id,name,address,phone,email,describe,content,img)=>{
        const edit= await prisma.$queryRaw`update "blog" set name=${name},address=${address},phone=${phone},email=${email},describe=${describe},content=${content},img=${img} where id=${id}`
    },
    //////////FOUNDER
    fouder:async(req,res)=>{
        const data= await prisma.$queryRaw`select "user".id, "user".name, "user".position, "user".describe,"user".avata from "user" 
        JOIN "role" on "role".id = "user".roleid where "role".position='Bloger' `
        return data; 
    },
    pageEditFouder:async(id)=>{
        const data= await prisma.$queryRaw`select * from "user" where id=${id} and roleid=4 `
        return data;
    },
    editFounder:async(id,name,position,describe,img)=>{
        const update=await prisma.$queryRaw`UPDATE "user" SET name =${name},position=${position},describe=${describe},avata=${img} WHERE id=${id}` 
    },
    pageCreateFouder:async(req,res)=>{
        res.render('./create/member')
    },
    createFounder:async(name,position,describe,img)=>{
        const creat= await prisma.member.create({data:{name:`${name}`,position:`${position}`,describe:`${describe}`,img:`${img}`}})    },
    deleteFounder:async(id)=>{
        const del= await prisma.$queryRaw`delete from "user" where id=${id}`
    },
    /////////PURPOSE
    purpose:async()=>{
        const data= await prisma.$queryRaw`select * from "purpose" `
        return data;
    },
    pageEditPurpose:async(id)=>{
        const data= await prisma.$queryRaw`select * from "purpose" where id=${id} `
        return data;
    },
    editPurpose:async(id,name,describe,img)=>{
        const update=await prisma.$queryRaw`UPDATE "purpose" SET name =${name},describe=${describe},img=${img} WHERE id=${id}` 
    },
    pageCreatePurpose:async(req,res)=>{
        res.render('./create/purpose')
    },
    createPurpose:async(name,describe,img)=>{
        const create= await prisma.purpose.create({data:{name:`${name}`,describe:`${describe}`,img:`${img}`}})
    },
    deletePurpose:async(id)=>{
        const del= await prisma.$queryRaw`delete from "purpose" where id=${id}`
    },
    ////////POST
    post:async(req,res)=>{
        const data = await prisma.$queryRaw`
        SELECT posts.id, posts.name, "posts".img, "user".name AS author,"user".position as position, posts.content, posts.describe, posts.time
        FROM "posts"
        JOIN "user" ON posts.userid = "user".id`;
       return data;
    },
    pageEditPost:async(id)=>{
        const data = await prisma.$queryRaw`
        SELECT posts.id, posts.name, "user".name AS author,"user".position as position ,posts.img, posts.content, posts.describe, posts.time
        FROM "posts"
        JOIN "user" ON posts.userid = "user".id
        WHERE posts.id = ${id};
      `;
         return data;
    },
    datacategori:async(id)=>{
        const data = await prisma.$queryRaw`
        SELECT "posts".id, "categori".name AS name
        FROM "posts"
        JOIN "post_categori" ON "posts".id = "post_categori".postid
        JOIN "categori" ON "post_categori".categorid = "categori".id
        WHERE "posts".id = ${id}
      `;
         return data;
    },
    editPost:async(id,author,name,img,content,describe,categori,time)=>{
        const data= await prisma.$queryRaw`
        UPDATE "posts" 
        SET userid=${author}, name=${name},img=${img}, content=${content}, describe=${describe}, time=${time}
         where id=${id}`


         const delete1 = await prisma.$queryRaw`
         delete from "post_categori" 
         where "post_categori".postid= ${id}`;


         for (var i = 0; i < categori.length; i++) {
            await prisma.post_categori.create({
              data: {
                postid: id,
                categorid: parseInt(categori[i])
              }
            });
          }
    },
    pageCreatePost:async(req,res)=>{
        res.render('./create/post')
    },
    createPost: async (author, name, img, content, describe, categori,time) => {
        const createdPost = await prisma.posts.create({
        data: {name: name,describe: describe,content: content,img: img,user: {connect: {id:author }},time:time}});
        const post = await prisma.$queryRaw`SELECT id FROM "posts" WHERE name = ${name} AND content = ${content} AND img = ${img} ORDER BY id DESC LIMIT 1`;
        const postId = post[0].id;
        if(categori !=undefined){
            for (var i = 0; i < categori.length; i++) {
                await prisma.post_categori.create({
                  data: {
                    postid: postId,
                    categorid: parseInt(categori[i])
                  }
                });
              }
        }      
        
      },
    deletePost:async(id)=>{
        const delcomment = await prisma.$queryRaw`
        DELETE FROM "comment" 
        USING "posts"
        WHERE "comment".postid = "posts".id AND "posts".id = ${id};
    `;
        const delecategori= await prisma.$queryRaw`delete from "post_categori" 
        USING "posts"
        WHERE "post_categori".postid = "posts".id AND "posts".id = ${id}`
        const delepost= await prisma.$queryRaw`delete from "posts" where id=${id}`    
    },
    ////////USER
    user:async()=>{
        const data= await prisma.$queryRaw`
        select "user".id as id, name , avata ,email , pass, role.position as position from "user" 
           JOIN role on "user".roleid =role.id `       
         return data;
    },
    pageEditInforUser:async(id)=>{
        const data= await prisma.$queryRaw`
        select "user".id as id, name , avata ,email,"user".position as job, pass, role.position as position from "user" 
           JOIN role on "user".roleid =role.id where "user".id = ${id}`     
        return data;
    },
    editInforUser:async(id,name,taikhoan,pass,img,role)=>{
        const creat= await prisma.$queryRaw` update "user" set name=${name},email=${taikhoan},avata=${img}, pass=${pass},roleid=${role} where id=${id}`

    },
    pageCreateInforUser:async(req,res)=>{
        res.render('./create/post')
    },
    createInforUser:async(req,res)=>{
    
    },
    deleteInforUser:async(id)=>{
        const delcomment= await prisma.$queryRaw`delete from "comment" 
        where "comment".userid=${id}`
        const del= await prisma.$queryRaw`delete from "user" where id=${id}` 
    },
    ////////ROLE
    role:async(req,res)=>{
        const data= await prisma.$queryRaw`select * from "role" `
        return data;
    },
    pageEditRole:async(id)=>{
        const data= await prisma.$queryRaw`select * from "role" where id=${id} `
        return data;
    },
    editRole:async(id,position,)=>{
        const update=await prisma.$queryRaw`UPDATE "role" SET position=${position} WHERE id=${id}` 
    },
    createRole:async(position)=>{
        const create= await prisma.role.create({data:{position:`${position}`}})
    },
    deleteRole:async(id)=>{
        const del= await prisma.$queryRaw`delete from "role" where id=${id}`
    },
    ///////SOICIAL
    soicial:async()=>{
        const data= await prisma.$queryRaw`select * from "soicial" `
        return data;
    },
    pageEditSoicial:async(id)=>{
        const data= await prisma.$queryRaw`select * from "soicial" where id=${id} `
        return data;
    },
    editSoicial:async(id,name,link,img)=>{
        const update=await prisma.$queryRaw`UPDATE "soicial" SET name =${name},link=${link},img=${img} WHERE id=${id}` 

    },
    createSoicial:async(name,link,img)=>{
        const create= await prisma.soicial.create({data:{name:`${name}`,link:`${link}`,img:`${img}`}})
    },
    deleteSoicial:async(id)=>{
        const del= await prisma.$queryRaw`delete from "soicial" where id=${id}`
    },
    ///////COMMENT
    comment:async()=>{
        const data= await prisma.$queryRaw`select "comment".id ,"comment".content , "user".avata ,"user".name,"posts".name as namepost,"posts".id as idpost from "comment" 
        JOIN "posts" on "posts".id = "comment".postid
        JOIN "user" on "user".id = "comment".userid `
        return data;
    },
    commentpost:async(id)=>{
        const data= await prisma.$queryRaw`select "comment".id ,"comment".content as contentc, "user".avata ,"user".name as name ,"posts".name as namepost from "comment" 
        JOIN "posts" on "posts".id = "comment".postid
        JOIN "user" on "user".id = "comment".userid 
         where "comment".postid = ${id}`
        return data;
    },
    editComment:async(id)=>{
     const del= await prisma.$queryRaw`delete from "comment" where id=${id}`
    },
    createComment:async(req,res)=>{
    
    },
    deleteComment:async(req,res)=>{
    
    },
    ///////CATEGORI
    categori:async(req,res)=>{
        const data= await prisma.$queryRaw`select * from "categori"`
        return data
    },
    pageEditCategori:async(id)=>{
        const data= await prisma.$queryRaw`select * from "categori" where id=${id}`
        return data
    },
    editCategori:async(id,name)=>{
        const update=await prisma.$queryRaw`UPDATE "categori" SET name =${name} WHERE id=${id}` 
    },
    createCategori:async(name)=>{
        const create= await prisma.categori.create({data:{name:`${name}`}})
    },
    deleteCategori:async(id)=>{
        const del= await prisma.$queryRaw`delete from "categori" where id=${id}`
    },
    ///////CONTACTADMIN
    contactAdmin:async(req,res)=>{
        const data= await prisma.$queryRaw`select * from "contact"`
        return data;
    },
    createContact:async(req,res)=>{
    
    },
    deleteContactAdmin:async(id)=>{
    const del= await prisma.$queryRaw`delete from "contact" where id=${id}`
    },
    fullContactAdmin:async(id)=>{
        const data= await prisma.$queryRaw`select * from "contact" where id=${id}`
        return data;
    },
    img:async(anh,data)=>{
    var img='';
        if(anh == undefined){
           if( data.length=1){
            img = data[0].img || data[0].avata;
           }
        }else{
            img='/assets/upload/'+anh.filename;
        }
        return img;
    },
    newImg:async(anh)=>{
    var img = '';
    if (anh == undefined) {
      img = '/assets/img/daidien.jpg'
    } else {
      img = '/assets/upload/' + anh.filename;
    }
    return img;
    }

}