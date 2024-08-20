const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const adminmodel=require('../model/admin/admin')
module.exports = {
  requireLogin: (req, res, next) => {
    if (!req.session.userId) {
      res.redirect('/login');
    } else {
      next();
    }
  },
  checkRole: async(req, res, next) => {
    const id = parseInt(req.session.userId);
    const data= await adminmodel.pageEditInforUser(id)
    if(data[0].position == 'User' || data[0].position == 'View') {
      req.flash('error', 'Tài khoản này không thể thực hiện chức năng này');
      res.redirect('/')
    } else {
      next();
    }
  }
  ,
  checkAdmin: async (req, res, next) => {
    const id = parseInt(req.session.userId);
    const data= await adminmodel.pageEditInforUser(id)
    if (data[0].position != 'Admin') {
      req.flash('error', 'Không phải tài khoản admin');
      res.redirect('/login')
    } else {
      next();
    }
  }
}