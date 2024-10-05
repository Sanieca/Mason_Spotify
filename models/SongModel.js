const db = require('../config/db');

const SongModel = {
    getAllSongs: (callback) => {
        db.query('SELECT * FROM spotify', callback);
    },
    addSong: (newSong, callback) => {
        db.query('INSERT INTO spotify SET ?', newSong, callback);
    },
    deleteSong: (id, callback) => {
        db.query('DELETE FROM spotify WHERE id = ?', [id], callback);
    },
    getSongById: (id, callback) => {
      db.query('SELECT * FROM spotify WHERE id = ?', [id], (err, results) => {
          if (err) {
              return callback(err, null);
          } 
          return callback(null, results[0]);  
      });
  },  
    updateSong: (id, updatedSong, callback) => {
        db.query('UPDATE spotify SET ? WHERE id = ?', [updatedSong, id], callback);
    },
    searchSongs:(title, artist, callback) => {
        db.query('SELECT * FROM spotify WHERE artist LIKE %?% OR title LIKE %?% ', [artist], [title], callback);
    }
};

module.exports = SongModel;
