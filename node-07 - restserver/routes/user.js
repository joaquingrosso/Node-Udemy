

const { Router } = require('express');

const { userGet, userPost, userPut, userDelete } = require('../controllers/user_controller');

const router = new Router();

router.get('/', userGet);

router.post('/', userPost);

router.put('/:id', userPut);

router.delete('/', userDelete);


module.exports = router;