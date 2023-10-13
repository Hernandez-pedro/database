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
}

module.exports = usermodels;