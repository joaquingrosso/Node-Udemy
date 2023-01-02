
const { response, request } = require('express');

const userGet = (req = request, res = response) => {
    const  { q, nombre='no name' }  = req.query;

    res.json({
        msg: 'get API',
        q,
        nombre
    })
}

const userPost = (req, res = response) => {
    //const body = req.body;
    const { nombre, año } = req.body;

    res.json({
        msg: 'post API',
        nombre: nombre,
        año: año
    })
}

const userPut = (req, res = response) => {
    const { id } = req.params;

    res.json({
        msg: 'put API',
        id: id
    })
}

const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete API'
    })
}



module.exports = {
    userGet, userPost, userPut, userDelete
}