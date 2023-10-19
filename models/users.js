const { end } = require("../db");

const usermodels = {
    getUsers: `
    SELECT 
    * 
    FROM 
    Users`,

    getByID: `
    SELECT
    *
    FROM
    USERS
    WHERE
    id= ?
    `,

    addRow:`
    INSERT INTO
    Users(
        username,
        email,
        password,
        name,
        lastname,
        phone_number,
        role_id,
        is_active
    )  VALUES(?,?,?,?,?,?,?,?)
    `,
   
    getByUserame: `
    SELECT id 
    FROM
    Users
    WHERE
    username = ?

    
    `,

    getByEmail: `
    SELECT
    id 
    FROM 
    Users
    WHERE
    email = ?
    `,
    //mi modificacion
    updateUser: `
         UPDATE Users
         SET 
             username = ?,
             email = ?,
             password = ?,
             name = ?,
             lastname = ?,
             phone_number = ?,
             is_active = ?
         WHERE
             id = ?
  `,
///delate 19-10-2023///
  deleteRow:`
     UPDATE
     Users
     SET
     is_active = 0
     WHERE
     id = ?
  `,
}

module.exports = usermodels;