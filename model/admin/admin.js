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
        const data= await prisma.blog.findMany()
        return data;
    },
    editprofile:async(id,name,address,phone,email,describe,content,img)=>{
        const edit= await prisma.blog.update({
            where:{id:id},
            data:{
                name:`${name}`,address:`${address}`,phone:`${phone}`,email:`${email}`,describe:`${describe}`,content:`${content}`,img:`${img}` 
            }
        })
    },
    //////////FOUNDER
    fouder:async(req,res)=>{
        const data= await prisma.user.findMany({
            select:{
                id:true,
                name:true,
                position:true,
                describe:true,
                avata:true
            },
            where:{
                roles:{
                    position:"Bloger"
                }
            }
        })
        return data; 
    },
    pageEditFouder:async(id)=>{
        const data= await prisma.user.findUnique({
            where:{
                id:id,
                roleid:4
            }
        })
        return data;
    },
    editFounder:async(id,name,position,describe,img)=>{
        const update=await prisma.user.update({
            where:{id:id},
            data:{
                name :`${name}`,position:`${position}`,describe:`${describe}`,avata:`${img}`
            }
        })
    },
    pageCreateFouder:async(req,res)=>{
        res.render('./create/member')
    },
    createFounder:async(name,position,describe,img)=>{
        const creat= await prisma.member.create({data:{name:`${name}`,position:`${position}`,describe:`${describe}`,img:`${img}`}})    },
    deleteFounder:async(id)=>{
        const del= await prisma.user.deleteMany({
             where:{id:id}
        })
    },
    /////////PURPOSE
    purpose:async()=>{
        const data= await prisma.purpose.findMany()
        return data;
    },
    pageEditPurpose:async(id)=>{
        const data= await prisma.purpose.findUnique({
            where:{id:id}
        })
        return data;
    },
    editPurpose:async(id,name,describe,img)=>{
        const update=await prisma.purpose.update({
            where:{id:id},
            data:{
                name :`${name}`,describe:`${describe}`,img:`${img}`
            }
        })
    },
    pageCreatePurpose:async(req,res)=>{
        res.render('./create/purpose')
    },
    createPurpose:async(name,describe,img)=>{
        const create= await prisma.purpose.create({data:{name:`${name}`,describe:`${describe}`,img:`${img}`}})
    },
    deletePurpose:async(id)=>{
        const del= await prisma.purpose.deleteMany({
            where:{id:id}
        })
    },
    ////////POST
    post:async(req,res)=>{
        const data = await prisma.posts.findMany({
            select:{
                id:true,
                name:true,
                img:true,
                content:true,
                describe:true,
                time:true,
                user:{
                    select:{
                        id:true,
                        name:true,
                        position:true
                    }
                }
            }
        })
       return data;
    },
    pageEditPost:async(id)=>{
        console.log(2)
        const data = await prisma.posts.findUnique({
            where:{id:id},
            select:{
                id:true,
                name:true,
                img:true,
                content:true,
                describe:true,
                time:true,
                user:{
                    select:{
                        name:true,
                        position:true
                    }
                }
            }
        })      
        console.log(4)  
         return data;
    },
    datacategori:async(id)=>{
        console.log(5)
        const data = await prisma.posts.findUnique({
            where:{id:id},
            select:{
                id:true,
                categoriss:{
                    select:{
                        categori:{
                            select:{
                                name:true
                            }
                        }
                    }
                }
            }
        })
         return data;
    },
    editPost:async(id,author,name,img,content,describe,categori,time)=>{
        console.log(3)
        console.log(id)
        const data= await prisma.posts.update({
            where:{id:id},
            data:{
                userid:author,name:`${name}`,img:`${img}`, content:`${content}`, describe:`${describe}`, time:`${time}`
            }
        })
         const delete1 = await prisma.post_categori.deleteMany({
            where:{postid:id}
         })
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
        const post = await prisma.posts.findFirst({
            where: {
              name: name,
              content: content,
              img: img,
            },
            orderBy: {
              id: 'desc',
            },
            select: {
              id: true,
            },
          });
        const postId = post.id;
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
        const delcomment = await prisma.comment.deleteMany({
            where:{postid:id}
        })
        const delecategori= await prisma.post_categori.deleteMany({
            where:{postid:id}
        })
        const delepost= await prisma.posts.deleteMany({
            where:{id:id}
        })
    },
    ////////USER
    user:async()=>{
        const data= await prisma.user.findMany({
            select:{
                id:true,
                name:true,
                avata:true,
                email:true,
                pass:true,
                roles:{
                    select:{
                        id:true,
                        position:true
                    }
                }
            }
        })       
         return data;
    },
    pageEditInforUser:async(id)=>{
        const data= await prisma.user.findUnique({
            where:{id:id},
            select:{
                id:true,
                name:true,
                avata:true,
                email:true,
                pass:true,
                roles:{
                    select:{
                        id:true,
                        position:true
                    }
                }
            }
        })               
        return data;
    },
    editInforUser:async(id,name,taikhoan,pass,img,role)=>{
        const creat= await prisma.user.update({
            where:{id:id},
            data:{
                name:`${name}`,email:`${taikhoan}`,avata:`${img}`, pass:`${pass}`,roleid:role
            }
        })

    },
    pageCreateInforUser:async(req,res)=>{
        res.render('./create/post')
    },
    createInforUser:async(req,res)=>{
    
    },
    deleteInforUser:async(id)=>{
        const delcomment= await prisma.comment.deleteMany({
            where:{userid:id}
        })
        const del= await prisma.user.deleteMany({
            where:{id:id}
        })
    },
    ////////ROLE
    role:async(req,res)=>{
        const data= await prisma.role.findMany()
        return data;
    },
    pageEditRole:async(id)=>{
        const data= await prisma.role.findUnique({
            where:{id:id}
        })
        return data;
    },
    editRole:async(id,position,)=>{
        const update=await prisma.role.update({
            where:{id:id},
            data:{
                position:`${position}`
            }
        }) 
    },
    createRole:async(position)=>{
        const create= await prisma.role.create({data:{position:`${position}`}})
    },
    deleteRole:async(id)=>{
        const del= await prisma.role.deleteMany({
            where:{id:id}
        })
    },
    ///////SOICIAL
    soicial:async()=>{
        const data= await prisma.soicial.findMany() 
        return data;
    },
    pageEditSoicial:async(id)=>{
        const data= await prisma.soicial.findUnique({
            where:{id:id}
        })       
         return data;
    },
    editSoicial:async(id,name,link,img)=>{
        const update=await prisma.soicial.update({
            where:{id:id},
            data:{
                name :`${name}`,link:`${link}`,img:`${img}`
            }
        }) 

    },
    createSoicial:async(name,link,img)=>{
        const create= await prisma.soicial.create({data:{name:`${name}`,link:`${link}`,img:`${img}`}})
    },
    deleteSoicial:async(id)=>{
        const data= await prisma.soicial.deleteMany({
            where:{id:id}
        })
        },
    ///////COMMENT
    comment:async()=>{
        const data= await prisma.comment.findMany({
            select:{
                id:true,
                content:true,
                users:{
                    select:{
                        avata:true,
                        name:true,
                    }
                },
                post:{
                   select:{
                    name:true,
                    id:true
                   }
                }
            }
        })
        return data;
    },
    commentpost:async(id)=>{
        const data= await prisma.comment.findMany({
            where:{postid:id},
            select:{
                id:true,
                content:true,
                users:{
                    select:{
                        avata:true,
                        name:true,
                    }
                },
                post:{
                   select:{
                    name:true,
                    id:true
                   }
                }
            },
        })
        return data;
    },
    pagepost:async(id)=>{
        const data= await prisma.comment.findMany({
            where:{id:id},
            select:{
                id:true,
                content:true,
                users:{
                    select:{
                        avata:true,
                        name:true,
                    }
                },
                post:{
                   select:{
                    name:true,
                    id:true
                   }
                }
            },
        })
        return data;
    },
    editComment:async(id)=>{
     const del= await prisma.comment.deleteMany({
        where:{id:id}
     })
    },
    createComment:async(req,res)=>{
    
    },
    deleteComment:async(req,res)=>{
    
    },
    ///////CATEGORI
    categori:async(req,res)=>{
        const data= await prisma.categori.findMany()
        return data
    },
    pageEditCategori:async(id)=>{
        const data= await prisma.categori.findUnique({
            where:{id:id}
        })
        return data
    },
    editCategori:async(id,name)=>{
        const update=await prisma.categori.update({
            where:{id:id},
            data:{
                name :`${name}`
            }
        })
    },
    createCategori:async(name)=>{
        const create= await prisma.categori.create({data:{name:`${name}`}})
    },
    deleteCategori:async(id)=>{
        const del= await prisma.categori.deleteMany({
            where:{id:id}
        })
    },
    ///////CONTACTADMIN
    contactAdmin:async(req,res)=>{
        const data= await prisma.contact.findMany()
        return data;
    },
    createContact:async(req,res)=>{
    
    },
    deleteContactAdmin:async(id)=>{
    const del= await prisma.contact.deleteMany({
        where:{id:id}
    })
    },
    fullContactAdmin:async(id)=>{
        const data= await prisma.contact.findUnique({
            where:{id:id}
        })
        return data;
    },
    img:async(anh,data)=>{
    var img='';
        if(anh == undefined){
           if( data.length=1){
            img = data.img || data.avata;
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