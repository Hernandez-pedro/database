const {request, response} = require('express');
const usermodels = require('../models/users');
const pool=require('../db');
const { use } = require('../routes/users');

const listUsers = async (req = request, res = response) => {
    let conn; 

    try{
        conn = await pool.getConnection();

    const users = await conn.query (usermodels.getAll, (err)=>{
        if(err){
            throw err
        }
    });

    res.json(users);
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
    
}

const listUsersByID = async (req = request, res = response) => {
    const {id} = req.params;

    if (isNaN(id)) {
        res.status(400).json({msg: 'Invalid ID'});
        return;
    }


    let conn; 

    try{
        conn = await pool.getConnection();

    const [user] = await conn.query (usermodels.getByID, [id], (err)=>{
        if(err){
            throw err
        }
    });

    if (!user) {
        res.status(404).json({msg: 'User not foud'});
        return;
    }

    res.json(user);
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
}

const addUser = async (req = request, res =response)=>{
    const {
     username,
     email,
     password,
     name,
     lastname,
     phone_number ='',
     role_id,
     is_active = 1
    } = req.body;

   
  
    if(!username || !email || !password || !name || !lastname ||!role_id){
        res.status(400).json ({msg: 'Missing information'});
        return;
    }

    const user =[username, email, password, name, lastname, phone_number, role_id, is_active]

    let conn;

    try{
        conn= await pool.getConnection();

const userAdded = await conn.query(usermodels.addRow, [...user], (err) => {
  if (err)throw err;
});

console.log(userAdded);
res.json(userAdded);
    }catch(error){
      console.log(error);
      res.status(500).json(error);
    }finally{
    if (conn) conn.end();
}
}

module.exports={listUsers, listUsersByID, addUser};