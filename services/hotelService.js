class hotelService {
    constructor(connection) {
      this.connection = connection;
    }
  
    createHotel(hotelData, imageData, callback) {
      this.connection.beginTransaction(err => {
        if (err) {
          callback(err, null);
          return;
        }
  
        this.connection.query('INSERT INTO hotel SET ?', hotelData, (err, hotelResult) => {
          if (err) {
            this.connection.rollback(() => {
              callback(err, null);
            });
            return;
          }
  
          const hotelId = hotelResult.insertId;
  
          const insertPromises = [];
          imageData.forEach(image => {
            image.hotel_id = hotelId;
            const insertPromise = new Promise((resolve, reject) => {
              this.connection.query('INSERT INTO hotel_images SET ?', image, (err, imageResult) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve(imageResult.insertId);
              });
            });
            insertPromises.push(insertPromise);
          });
  
          Promise.all(insertPromises)
            .then(imageIds => {
              this.connection.commit(err => {
                if (err) {
                  this.connection.rollback(() => {
                    callback(err, null);
                  });
                  return;
                }
                callback(null, { hotelId, imageIds });
              });
            })
            .catch(err => {
              this.connection.rollback(() => {
                callback(err, null);
              });
            });
        });
      });
    }
  
    getHotels(callback) {
      const query = `
        SELECT h.*, hi.id AS image_id, hi.image_path, hi.image_extension
        FROM hotel h
        LEFT JOIN hotel_images hi ON h.id = hi.hotel_id
        WHERE h.status = 1
        ORDER BY h.id;
      `;
      this.connection.query(query, (err, results) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, results);
      });
    }
  
    getHotelsWithImages(callback) {
      const query = `
        SELECT h.*, hi.id AS image_id, hi.image_path, hi.image_extension
        FROM hotel h
        LEFT JOIN hotel_images hi ON h.id = hi.hotel_id
        WHERE h.status = 1
        ORDER BY h.id;
      `;
      this.connection.query(query, (err, results) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, results);
      });
    }
  
    updateHotel(hotelId, hotelData, imageData, callback) {
      this.connection.beginTransaction(err => {
        if (err) {
          callback(err, null);
          return;
        }
  
        this.connection.query('UPDATE hotel SET ? WHERE id = ?', [hotelData, hotelId], (err, hotelResult) => {
          if (err) {
            this.connection.rollback(() => {
              callback(err, null);
            });
            return;
          }
  
          const updatePromises = [];
          imageData.forEach(image => {
            const updatePromise = new Promise((resolve, reject) => {
              this.connection.query('UPDATE hotel_images SET ? WHERE id = ?', [image, image.id], (err, imageResult) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve(imageResult);
              });
            });
            updatePromises.push(updatePromise);
          });
  
          Promise.all(updatePromises)
            .then(() => {
              this.connection.commit(err => {
                if (err) {
                  this.connection.rollback(() => {
                    callback(err, null);
                  });
                  return;
                }
                callback(null, { message: 'Hotel updated successfully' });
              });
            })
            .catch(err => {
              this.connection.rollback(() => {
                callback(err, null);
              });
            });
        });
      });
    }
  
    deleteHotel(hotelId, callback) {
      this.connection.beginTransaction(err => {
        if (err) {
          callback(err, null);
          return;
        }
  
        this.connection.query('DELETE FROM hotel WHERE id = ?', hotelId, (err, result) => {
          if (err) {
            this.connection.rollback(() => {
              callback(err, null);
            });
            return;
          }
  
          this.connection.query('DELETE FROM hotel_images WHERE hotel_id = ?', hotelId, (err, imageResult) => {
            if (err) {
              this.connection.rollback(() => {
                callback(err, null);
              });
              return;
            }
  
            this.connection.commit(err => {
              if (err) {
                this.connection.rollback(() => {
                  callback(err, null);
                });
                return;
              }
              callback(null, { message: 'Hotel deleted successfully' });
            });
          });
        });
      });
    }
  }
  
  module.exports = hotelService;
  