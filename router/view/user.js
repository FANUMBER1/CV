const express=require('express');
const multer = require('multer');
const router=express.Router();
var cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const userControler=require('../../controler/view/user')
const logincontroler=require('../../controler/login/login')
const middlewea=require('../../middlewea/middlewea');
const middleweaComment=require('../../middlewea/commentMiddlewea');
const contact=require('../../middlewea/contact')
const middlewealogin=require('../../middlewea/login');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/upload/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
const upload = multer({ storage: storage });
app.use(cookieParser());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));
//////////////////
router.get('/',userControler.postuserIndex)
router.get('/post/:idpost',userControler.postPost)
router.post('/comment/:idpost',middlewea.requireLogin,middleweaComment.checkComment,userControler.userComment)
router.get('/about',userControler.postAbout)
router.get('/contact',userControler.postContact)
router.post('/creat-contact',contact.checkEmail,userControler.creatContact)
router.get('/writepost',middlewea.requireLogin,middlewea.checkRole,userControler.postAuthor)
router.post('/writerpost',upload.single('img'),userControler.creatPost)
/////////////////
router.get('/login',logincontroler.dangnhap);
router.post('/login',logincontroler.checklogin);
router.get('/dangki',logincontroler.dangki);
router.post('/dangki1',upload.single('img'),middlewealogin.checkemaillogin,logincontroler.createadmin);
router.get('/logout',logincontroler.logout)


module.exports=router;