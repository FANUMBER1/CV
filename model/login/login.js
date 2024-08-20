const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

module.exports={
    taikhoan: async (tentaikhoan) => {
        const data= await prisma.$queryRaw`select * from "user" where email=${tentaikhoan}`;
       return data;
    },
    createadmin:async(name,taikhoan,pass,img,role,describe,position)=>{
        const creat= await prisma.user.create({ data:{name:`${name}`,email:`${taikhoan}`,avata:`${img}`, pass:`${pass}`,roleid:role,describe:`${describe}`,position:`${position}`}});
    },
      newImg:async(anh)=>{
        var img = '';
        if (anh == undefined) {
          img = '/assets/img/daidien.jpg'
        } else {
          img = '/assets/upload/' + req.file.filename;
        }
        return img;
        }
}