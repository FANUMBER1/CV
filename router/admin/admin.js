const express=require('express');
const multer = require('multer');
const adminControler=require('../../controler/admin/admin')
const router=express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/upload/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
const upload = multer({ storage: storage });
/////////PROFILE
router.get('/',adminControler.profile)
router.get('/edit-profile',adminControler.editprofile)
router.post('/edit-profile/:ID',upload.single("img"),adminControler.editInforProfile)
////////FOUNDER
router.get('/FOUNDER',adminControler.fouder)
router.get('/edit-founder/:ID',adminControler.pageEditFouder)
router.post('/edit-founder/:ID',upload.single("img"),adminControler.editFounder)
router.get('/create-founder',adminControler.pageCreateFouder)
router.post('/create-founder',upload.single("img"),adminControler.createFounder)
router.get('/delete-founder/:ID',adminControler.deleteFounder)
///////PURPOSE
router.get('/PURPOSE',adminControler.purpose)
router.get('/edit-purpose/:ID',adminControler.pageEditPurpose)
router.post('/edit-purpose/:ID',upload.single("img"),adminControler.editPurpose)
router.get('/create-purpose',adminControler.pageCreatePurpose)
router.post('/create-purpose',upload.single("img"),adminControler.createPurpose)
router.get('/delete-purpose/:ID',adminControler.deletePurpose)
////////POST
router.get('/POST',adminControler.post)
router.get('/edit-post/:IDPost',adminControler.pageEditPost)
router.post('/edit-post/:ID',upload.single("img"),adminControler.editPost)
router.get('/create-post',adminControler.pageCreatePost)
router.post('/create-post',upload.single("img"),adminControler.createPost)
router.get('/delete-post/:ID',adminControler.deletePost)

////////USER
router.get('/INFORUSER',adminControler.user)
router.get('/edit-inforuser/:ID',adminControler.pageEditInforUser)
router.post('/edit-inforuser/:ID',upload.single("img"),adminControler.editInforUser)
router.get('/create-inforuser',adminControler.pageCreateInforUser)
router.post('/create-inforuser/:ID',adminControler.createInforUser)
router.get('/delete-inforuser/:ID',adminControler.deleteInforUser)

////////ROLE
router.get('/ROLE',adminControler.role)
router.get('/edit-role/:ID',adminControler.pageEditRole)
router.post('/edit-role/:ID',adminControler.editRole)
router.post('/create-role',adminControler.createRole)
router.get('/delete-role/:ID',adminControler.deleteRole)

////////SOICIAL
router.get('/SOICIAL',adminControler.soicial)
router.get('/edit-soicial/:ID',adminControler.pageEditSoicial)
router.post('/edit-soicial/:ID',upload.single("img"),adminControler.editSoicial)
router.post('/create-soicial',upload.single("img"),adminControler.createSoicial)
router.get('/delete-soicial/:ID',adminControler.deleteSoicial)

/////////COMMMENT
router.get('/COMMENT',adminControler.comment)
router.get('/edit-comment/:ID',adminControler.pageEditComment)
router.post('/edit-comment/:ID',adminControler.editComment)
router.get('/delete-comment/:ID',adminControler.deleteComment)

////////CATEGORI
router.get('/CATEGORI',adminControler.categori)
router.get('/edit-categori/:ID',adminControler.pageEditCategori)
router.post('/edit-categori/:ID',adminControler.editCategori)
router.post('/create-categori',adminControler.createCategori)
router.get('/delete-categori/:ID',adminControler.deleteCategori)

////////CONTACT
router.get('/CONTACT',adminControler.contactAdmin)
router.get('/full-contact/:ID',adminControler.fullContactAdmin)
router.get('/delete-contact/:ID',adminControler.deleteContactAdmin)

module.exports=router;