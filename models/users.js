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

}

module.exports = usermodels;