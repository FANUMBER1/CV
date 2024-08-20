const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const login = require('../../model/login/login');
app.set('view engine', 'ejs');
module.exports = {
  dangnhap: (req, res) => {
    check = 1;
    res.render('dangnhap')
  },
  checklogin: async (req, res) => {
    const tentaikhoan = req.body.username;
    const data = await login.taikhoan(tentaikhoan);
    const pass1 = req.body.password;
    var check = 0;
    if (data.length >= 1) {
      for (var i = 0; i < data.length; i++) {
        const match = await bcrypt.compare(pass1, data[i].pass);
        if (match) {
          check = 1;
          var id = data[i].id
        }
      }
    }
    if (check == 1) {
      req.session.userId = id;
      res.redirect('/')
    } else {
      res.render('dangnhap', { check });
    }
  },
  dangki: (req, res) => {
    var check = 2;
    res.render('dangki', { check })
  },
  createadmin: async (req, res) => {
    const name = req.body.name;
    const taikhoan = req.body.taikhoan;
    const pass0 = req.body.pass;
    const anh = req.file;
    const img = await login.newImg(anh);
    const role = 2;
    const describe = req.body.describe;
    const position = req.body.position;
    const pass = bcrypt.hashSync(pass0, 10);
    creat = await login.createadmin(name, taikhoan, pass, img, role, describe, position);
    res.redirect('/login');
  },
  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.clearCookie('connect.sid');
      res.redirect('/login');
    });
  }
}