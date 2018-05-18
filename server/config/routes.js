const mongoose = require('mongoose'),
    pets = require('./../controllers/petsController.js')
    path = require('path');
module.exports = function(app){

    app.get('/pets/:sorted', function (req, res) {
        pets.all(req,res);
    })
    app.post('/pets', function(req,res) {
        console.log(req.body);
        pets.new(req,res);
    })

    app.put('/pets/:id', function(req,res){
        pets.editPet(req,res);
    })
    app.get('/pets/like/:id', function(req,res){
        pets.likePet(req,res);
    })
    app.delete('/pets/:id', function(req, res) {
        pets.removePet(req,res);
    })
    
    app.get('/pets/details/:id', function(req,res){
        pets.one(req,res);
    })

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, './../../AngularApp/dist/AngularApp', 'index.html'));
    })
} 