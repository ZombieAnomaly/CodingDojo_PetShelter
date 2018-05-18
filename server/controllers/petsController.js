
const mongoose = require('mongoose'),
    Pet = mongoose.model('Pet');

module.exports = {
    all(req,res){
        console.log(req.params.sorted)
        if(req.params.sorted == 'true'){
           Pet.find({}).sort('-type').exec(function(err, docs){
               res.json({'pets':docs});
           })
        }else{
            Pet.find({}, function(err,pets){
                res.json({'pets':pets});
            })
        }
    },
    one(req,res){
        var id = mongoose.Types.ObjectId(req.params.id);
        Pet.findOne({_id:id}, function(err, pet){
            if(err || pet == null){
                res.json({'error':err});
            }else{
                res.json({'pet':pet});
            }
        })
    },
    new(req,res){
        console.log(req.body);
        var pet = new Pet({
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            skills: [req.body.skills[0], req.body.skills[1], req.body.skills[2]]
        });
    
        pet.save(function(err) {
            // if there is an error console.log that something went wrong!
            if(err) {
              res.json({'error':err});
            } else { // else console.log that we did well and then redirect to the root route
              res.json({'success':true});
            }
          })
    },
    editPet(req,res){
        var id = mongoose.Types.ObjectId(req.params.id);
        Pet.update({_id:id},{$set: {
            name:req.body.name,
            type: req.body.type,
            description: req.body.description,
            skills: [req.body.skills[0], req.body.skills[1], req.body.skills[2]]
        }}, {runValidators:true}, function(err,doc){
            if(doc.nModified == 1){
                res.json({'updated': doc})
            }else{
                res.json({'error': err})
            }            
        })
    },
    likePet(req,res){
        var id = mongoose.Types.ObjectId(req.params.id);
        Pet.update({_id:id},{$inc: {
            likes:1
        }}, function(err,doc){
            if(doc.nModified == 1){
                res.json({'updated': doc})
            }else{
                res.json({'error': err})
            }            
        })
    },
    removePet(req,res){
        var id = mongoose.Types.ObjectId(req.params.id);
        Pet.deleteOne( {_id:id},function(err) {
            // if there is an error console.log that something went wrong!
            if(err) {
              res.json({'error':err});
            } else { // else console.log that we did well and then redirect to the root route
              res.json({'success':true});
            }
          })
        // This is where we would add the user from req.body to the database.
    }, 
}