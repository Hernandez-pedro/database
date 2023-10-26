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
    SELECT 
    * 
    FROM
    Users
    WHERE username = ?
    `,

    getByEmail: `
    SELECT
    id 
    FROM 
    Users
    WHERE
    email = ?
    `,
    //mi modificacion 18-10-2023
    /*/updateUser: `
         UPDATE 
         Users
         SET 
             username = ?,
             email = ?,
             password = ?,
             name = ?,
             lastname = ?,
             phone_number = ?,
             role_id = ?,
             is_active = ?
         WHERE
             id = ?
  `,*/


  updateUser: `
  UPDATE 
     Users
  SET 
      username = ?,
      email = ?,
      password = ?,
      name = ?,
      lastname = ?,
      phone_number = ?,
      role_id = ?,
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