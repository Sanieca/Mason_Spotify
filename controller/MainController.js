const SongModel = require('../models/SongModel');

const main = {
    getAllSongs: (req, res) => {
        const searchQuery = req.query.search;
        if (searchQuery) {
          
            SongModel.searchSongs(searchQuery, (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Server Error');
                }
                res.render('index', { songs: results, search: searchQuery });
            });
        } else {
           
            SongModel.getAllSongs((err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Server Error');
                }
                res.render('index', { songs: results });
            });
        }
    },

    getSong: (req, res) => {
        const songId = req.params.id;
        SongModel.getSongById(songId, (err, song) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server Error');
            }
            if (!song) {
                return res.status(404).send('Song not found');
            }
            res.render('songDetails', { song });
        });
    },

    addSong: (req, res) => {
        const { title, artist, lyrics } = req.body;
        const imageFile = req.files['imageFile'][0];
        const songFile = req.files['songFile'][0];

        const newSong = {
            title: title,
            artist: artist,
            lyrics: lyrics,
            image: `/uploads/${imageFile.filename}`,
            file_path: `/uploads/${songFile.filename}`
        };

        SongModel.addSong(newSong, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server Error');
            }
            res.redirect('/');
        });
    },

    deleteSong: (req, res) => {
        const songId = req.params.id;
        SongModel.deleteSong(songId, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server Error');
            }
            res.redirect('/');
        });
    },

    getEditSong: (req, res) => {
        const songId = req.params.id;
        SongModel.getSongById(songId, (err, song) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server Error');
            }
            if (!song) {
                return res.status(404).send('Song not found');
            }
            res.render('edit', { song });
        });
    },

    editSong: (req, res) => {
        const songId = req.params.id;
        const { title, artist, lyrics } = req.body;
        const imageFile = req.files['imageFile'] ? req.files['imageFile'][0] : null;
        const songFile = req.files['songFile'] ? req.files['songFile'][0] : null;

        let updatedSong = {
            title: title,
            artist: artist,
            lyrics: lyrics
        };

        if (imageFile) {
            updatedSong.image = `/uploads/${imageFile.filename}`;
        }

        if (songFile) {
            updatedSong.file_path = `/uploads/${songFile.filename}`;
        }

        SongModel.updateSong(songId, updatedSong, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server Error');
            }
            res.redirect('/');
        });
    }
};

module.exports = main;
