const {request, response} = require('express');
const bcrypt = require ('bcrypt');
const usermodels = require('../models/users');
const pool=require('../db');


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
/* 3 endponit*/
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
///24-10-2023//

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password,saltRounds);



    const user =[username, email, passwordHash, name, lastname, phone_number, role_id, is_active];
//24-10-2023 hasta aqui//
    let conn;

    try{
        conn= await pool.getConnection();

        const [usernameUsers] = await conn.query(
            usermodels.getByUserame,
            [username],
            (err)=>{if (err) throw err;}
        );
        if (usernameUsers) {
            res.status(409).json({msg: `USER WHTH USERNAME ${username} already exists`});
            return;
        }

            

        const [emailUsers] = await conn.query(
            usermodels.getByEmail,
            [email],
            (err)=>{if (err) throw err;}
        );
        if (emailUsers) {
            res.status(409).json({msg: `USER WHTH EMAIL ${email} already exists`});
            return;
        }



const userAdded = await conn.query(usermodels.addRow, [...user], (err) => {
  if (err)throw err;
});


if (userAdded.affectedRows === 0 ) throw new Error ({message:'FAILED TO ADD USER'});

res.json({msg: 'User added successfully'});

    }catch(error){
      console.log(error);
      res.status(500).json(error);
    }finally{
    if (conn) conn.end();
}
}


/*/Mi modificacion//18-10-2023

const updateUser = async (req, res) => {
    const { id } = req.params;
    const userData = req.body; // actualizacion de datos
  
    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json({ msg: 'No data provided for update' });
    }
  
    let conn;
    try {
      conn = await pool.getConnection();
  
      // Verificacion
      const [existingUser] = await conn.query(usermodels.getByID, [id]);
      if (!existingUser) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Realiza las validaciones
      
      if (userData.username) {
        const [existingUserByUsername] = await conn.query(
          usermodels.getByUserame,
          [userData.username]
        );
        if (existingUserByUsername && existingUserByUsername.id !== id) {
          return res.status(409).json({ msg: 'Username already in use' });
        }
      }
      if (userData.email) {
        const [existingUserByEmail] = await conn.query(
          usermodels.getByEmail,
          [userData.email]
        );
        if (existingUserByEmail && existingUserByEmail.id !== id) {
          return res.status(409).json({ msg: 'Email already in use' });
        }
      }
  
      // Realizacion de cambios
      const allowedFields = ['username', 'email', 'password', 'name', 'lastname', 'phone_number', 'role_id','is_active'];
      const updateData = {};
  
      allowedFields.forEach((field) => {
        if (userData[field] !== undefined) {
          updateData[field] = userData[field];
        }
      });
  
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ msg: 'No valid fields to update' });
      }
  
      // utiliza la consultas
      const result = await conn.query(
        usermodels.updateUser,
        [
          updateData.username,
          updateData.email,
          updateData.password, // Actualizar contraseña
          updateData.name,
          updateData.lastname,
          updateData.phone_number,
          updateData.role_id,
          updateData.is_active,
          id
        ]
      );
  
      if (result.affectedRows === 0) {
        return res.status(500).json({ msg: 'Failed to update user' });
      }
  
      return res.json({ msg: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    } finally {
      if (conn) conn.end();
    }
  };
  
  //HASTA AQUI MI TERMINACION./*/

//UPDATEUSERS//
const updateUser=async(req, res)=>{
  const {
      username,
      email,
      password,
      name,
      lastname,
      phone_number,
      role_id,
      is_active ,
  } = req.body;

const {id} = req.params;
let newUserData=[
  username,
  email,
  password,
  name,
  lastname,
  phone_number,
  role_id,
  is_active   
];
let conn;
try{
  conn = await pool.getConnection();
const [userExists]=await conn.query(
  usermodels.getByID,
  [id],
  (err) => {if (err) throw err;}
);
if (!userExists || userExists.id_active === 0){
  res.status(404).json({msg:'User not found'});
  return;
}
//24-10-2023//
const [usernameUser] = await conn.query(
  usermodels.getByUserame,
  [username],
  (err) => {if (err) throw err;}
);
if (usernameUser){
  res.status(409).json({msg:`User with username ${username} already exists`});
  return;
}

const [emailUsers] = await conn.query(
  usermodels.getByEmail,
  [email],
  (err)=>{if (err) throw err;}
);
if (emailUsers) {
  res.status(409).json({msg: `USER WHTH EMAIL ${email} already exists`});
  return;
}
//24-10-2023/hasta qui/

const oldUserData = [
  userExists.username,
  userExists.email,
  userExists.password,
  userExists.name,
  userExists.lastname,
  userExists.phone_number,
  userExists.role_id,
  userExists.is_active  
];

newUserData.forEach((userData, index)=> {
  if (!userData){
      newUserData[index] = oldUserData[index];
  }
})

const userUpdate = await conn.query(
  usermodels.updateUser,
  [...newUserData, id],
  (err) => {if (err) throw err;}
);
if(userUpdate.affecteRows === 0){
  throw new Error ('User not updated');
}
res.json({msg:'User updated successfully'})
}catch (error){
      console.log(error);
      res.status(500).json(error);
  } finally{
      if (conn) conn.end();
  }
};

//detele usuario 19-100203//
const deteleUsers = async (req = request, res = response) => {
  let conn;
  const {id} = req.params;

  try {
    conn = await pool.getConnection();

    const [userExists] = await conn.query(
      usermodels.getByID,
      [id],
      (err) => {throw err;}
  
    )
     if(!userExists || userExists.is_active == 0) {
      res.status(404).json({msg: 'USER NOT FOUND'});
      return;
     }
  
  
     const userDelete = await conn.query (
      usermodels.deleteRow,
      [id],
      (err) => {if (err) throw err;}
     )
  
     if (userDelete.affectedRows ===0) {
      throw new Error({message : 'FAILED TO DELETE USER'})
     };
     
     res.json ({msg: 'USER DELETED SUCCESSFULLY'});

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    if (conn) conn.end();
  }
}

//26-10-2023 iniciar sesion///
const signinUser = async (req = request, res = response) =>{
  const {username, password} = req.body;

  let conn;

  if (!username || !password){
    res.status(400).json({msg: 'username and password are required'});
    return;
  }

  try{
    conn = await pool.getConnection();

    const [user] = await  conn.query(
      usermodels.getByUserame,
      [username],
      (err) => {throw err;}
    );
    if (!user || user.is_active == 0){
      res.status(404).json({msg: 'wrong username or password'});
      return;
    }

    const passwordOk = bcrypt.compare(password, user.password);
    if (!passwordOk){
      res.status(404).json({msg: 'wrong username or password'});
      return;
    }
    delete user.password;
    delete user.created_at;
    delete user.updated_at;
    res.json(user);


  }catch(error){
    console.log(error);
    res.status(500).json(error);
  }finally{
    if (conn) conn.end();
  }
}

module.exports={
  listUsers, 
  listUsersByID, 
  addUser, 
  updateUser, 
  deteleUsers,
  signinUser
};