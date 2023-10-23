const {Router} = require ('express')
const{listUsers,listUsersByID, addUser, updateUser,deteleUsers}=require('../controllers/users');


const router =Router();

//http://localhost:3000/api/v1/users/
//http://localhost:3000/api/v1/users/1
//http://localhost:3000/api/v1/users/3
router.get('/', listUsers);
router.get('/:id', listUsersByID);
//router.post('/', listUsers);
router.put('/', addUser);
//mi modificacion
router.patch('/:id', updateUser);  ///MI MODIFCACION.
router.delete('/:id', deteleUsers);
module.exports = router;