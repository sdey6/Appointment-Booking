var express =require('express');
var router=express.Router();
const ObjectID=require('mongodb').ObjID;

router.get('/appointments',(req,res,next)=>{
	req.collection.find({})
	   .toArray()
	   .then(results=>res.json(results))
	   .catch(error=> res.send(error));
});

router.post('/appointments',(req,res,next)=>{
	const{name,appointmentDate,reason}=req.body;
	if(!name|| !appointmentDate|| !reason)
	{	return res.status(400).json({
			message: 'values required for name,appointmentDate,reason',
			})
	}
	
	const payload={name,appointmentDate,reason};
	req.collection.insertOne(payload)
	.then(results=>res.json(results))
	.catch(error=> res.send(error));
});

router.get('/appointments/:id',(req,res,next)=>{
	const{id}=req.params;
	const_id=ObjectID(id);
	req.collection.deleteOne({_id})
	   .then(results=>res.json(results))
	   .catch(error=> res.send(error));
});

module.exports= router;