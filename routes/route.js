const express = require('express');
const multer = require('multer');
const path = require('path'); 
const router = express.Router();
const main = require('../controller/MainController');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Routes
router.get('/', main.getAllSongs);
router.get('/song/:id', main.getSong);
router.get('/add', (req, res) => res.render('add'));
router.post('/add', upload.fields([{ name: 'songFile' }, { name: 'imageFile' }]), main.addSong);
router.post('/delete/:id', main.deleteSong);
router.get('/edit/:id', main.getEditSong);
router.post('/edit/:id', upload.fields([{ name: 'songFile' }, { name: 'imageFile' }]), main.editSong);

module.exports = router;
