const pool = require("../config/database");

module.exports = {
    create: (data, callback) =>{
        pool.query(
             `insert into registration(firstname, lastname, email, password, number )
             values(?,?,?,?,?)`,
             [
                data.first_name,
                data.last_name,
                data.email,
                data.password,
                data.number
             ],
             (error,result, fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null, result);
             }
        )
    },
    getUsers : callback=>{
        pool.query(
            `select id, firstname,lastname,email,number from registration`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results);
            }
        );

    },
    getUserByUserId: (id, callback)=>{
        pool.query(
            `select id, firstname,lastname,email,number from registration where id = ? `,
            [id],
            (error,results,fields)=>{
                if(error){
                    callback(error);
                } 
                return callback(null,results[0]);
            }
        );
    },

    updateUser: (data, callback)=>{
        pool.query(
            `update registration set firstname=?,lastname=?,email=?,password=?,number=? where id =?`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password,
                data.number,
                data.id
            ],
            (error,results,fields)=>{
                if (error){
                    callback(error);
                }
                return callback(null,results[0]);
            },
        );
    },

    deleteUser: (data,callback)=>{
        pool.query(
            `delete from registration where id = ?`,
            [data.id],
            (error,results,fields)=>{
                if(error){
                    callback(error);
                }
                return callback(null,results[0]);
            }
        );
    },
    getUserByUserEmail: (email, callback)=>{
        pool.query(
            `select * from registration where email =?`,
            [email],
            (error, results,fields)=>{
                if (error){
                    callback(error);
                }
                return callback(null, results[0]);
            }
        );
    }
};



