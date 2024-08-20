const express = require('express');
const app = express();
app.set('view engine', 'ejs')
const login = require('../model/login/login')
module.exports = {
  checkemaillogin: async (req, res, next) => {
    const name = req.body.name;
    const taikhoan = req.body.taikhoan;
    const pass0 = req.body.pass;
    const data = await login.taikhoan(taikhoan);
    const form = /^[a-zA-Z0-9]+@[a-z.]+\.com$/;
    var check = 0;
    if (taikhoan == '' || pass0 == '' || name == '') {
      res.render('dangki', { check })
    } else {
      if (form.test(taikhoan)) {
        if (data.length == 1) {
          check = 1
          res.render('dangki', { check })
        } else {
          next();
        }
      } else {
        check = 3
        res.render('dangki', { check })
      }
    }
  }
}