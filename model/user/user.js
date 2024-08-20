const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

module.exports={
  creatContact:async(name,email,Subject,Message)=>{
    const creat= await prisma.contact.create({data:{name:`${name}`,email:`${email}`,Subject:`${Subject}`,Message:`${Message}`}})
  },
  comment: async(iduser,idpost,content) =>{
    const creat = await prisma.comment.create({data:{users:{connect:{id:iduser}},post:{connect:{id:idpost}},content:`${content}`}})
  } 
}