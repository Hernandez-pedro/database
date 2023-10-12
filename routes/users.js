const {Router} = require ('express')
const{listUsers,listUsersByID, addUser}=require('../controllers/users')

const router =Router();

//http://localhost:3000/api/v1/users/
//http://localhost:3000/api/v1/users/1
//http://localhost:3000/api/v1/users/3
router.get('/', listUsers);
router.get('/:id', listUsersByID);
//router.post('/', listUsers);
router.put('/', addUser);
//router.patch('/', listUsers);
//router.delete('/', listUsers);
module.exports =router;