const pool = require("../config/database");

module.exports = {
    createHotel(hotelData, imageData, callback) {
      pool.beginTransaction(err => {  // Begin Transaction
          if (err) {
            callback(err, null);
            return;
          }
          pool.query('INSERT INTO hotel SET ?', hotelData, (err, hotelResult) => {
            if (err) {
              pool.rollback(() => {   // RollBack Transaction
                callback(err, null);
              });
              return;
            }
          });
        
          const hotelId = hotelResult.insertId;
          const insertPromises = [];
          imageData.forEach(image => {
            image.hotel_id = hotelId;
            const insertPromise = new Promise((resolve, reject) => {
              pool.query('INSERT INTO hotel_images SET ?', image, (err, imageResult) => {
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
              pool.commit(err => {
                if (err) {
                  pool.rollback(() => {
                    callback(err, null);
                  });
                  return;
                }
                var returnResponse = {    // Return Response
                    "status" : "1",
                    "message" : "Hotel Added successfully",
                    "data" : {
                      "hotel_id" : hotelId,
                      "image_id"  : imageIds
                    }
                };
                callback(null, returnResponse);
              });
            })
            .catch(err => {
              pool.rollback(() => {
                callback(err, null);
              });
          });
      });
    },
    getHotelsWithImages : callback=>{
      pool.query(
          `SELECT h.*, hi.id AS image_id, hi.image_path, hi.image_extension
          FROM hotel h
          LEFT JOIN hotel_images hi ON h.id = hi.hotel_id
          WHERE h.status = 1
          ORDER BY h.id;`,
          [],
          (error,results,fields)=>{
              if(error){
                  return callback(error);
              }
              return callback(null,results);
          }
      );

  },
  updateHotel(hotelId, hotelData, imageData, callback) {
    pool.beginTransaction(err => {
      if (err) {
        callback(err, null);
        return;
      }

      pool.query('UPDATE hotel SET ? WHERE id = ?', [hotelData, hotelId], (err, hotelResult) => {
        if (err) {
          pool.rollback(() => {
            callback(err, null);
          });
          return;
        }

        const updatePromises = [];
        imageData.forEach(image => {
          const updatePromise = new Promise((resolve, reject) => {
            pool.query('UPDATE hotel_images SET ? WHERE id = ?', [image, image.id], (err, imageResult) => {
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
            pool.commit(err => {
              if (err) {
                pool.rollback(() => {
                  callback(err, null);
                });
                return;
              }
              var returnResponse = {    // Return Response
                  "status" : "1",
                  "message" : "Hotel Updated successfully",
                  "data" : {
                    "hotel_id" : hotelId,
                    "imageResult"  : imageResult
                  }
              };
              callback(null, returnResponse);
            });
          })
          .catch(err => {
            pool.rollback(() => {
              callback(err, null);
            });
          });
      });
    });
  },
  deleteHotel: (data,callback)=>{
    pool.beginTransaction(err => {  // Begin Transaction
        if (err) {
          callback(err, null);
          return;
        }
        pool.query( // Hotel entry delete in hotel table  
          `DELETE FROM hotel WHERE id = ?`,
          [data.id],
          (error,results,fields)=>{
              if(error){
                pool.rollback(() => { //Rollback Transaction
                  callback(err, null);
                });
                return;
              }
          }
        );
        pool.query( // Hotel entry delete in hotel image table
          `DELETE FROM hotel_images WHERE hotel_id = ?`,
          [data.id],
          (error,imgresults,fields)=>{
              if(error){
                pool.rollback(() => {  //Rollback Transaction
                  callback(err, null);
                });
                return;
              }
          }
        );
        pool.commit(err => { // Commit Transaction
          if (err) {
            pool.rollback(() => { //Rollback Transaction
              callback(err, null);  
            });
            return;
          }
          var returnResponse = {    // Return Response
              "status" : "1",
              "message" : "Hotel deleted successfully",
              "data" : {
                "result" : results[0],
                "image_result"  : imgresults[0] 
              }
          };
          callback(null, returnResponse);
        });
    }); 
  }
};

  

  
