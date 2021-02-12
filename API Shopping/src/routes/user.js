const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/register',async(req,res)=>{
     const user = new User(req.body)
       // {
        // userName: req.body.name,
        // email: req.body.email,
        // password :req.body.password,
        // phone :req.body.age
    // }
    
    try {
     await user.save();
     const token = await user.generateToken()
     res.send({
        status:1,
        message:'added',
        data: {user, token}
    })
      } catch (e) {
        res.status(400).json({ message: e.message });
      }
    });

router.post('/login', async(req,res)=>{
        try{
            let user = await User.findUser(req.body.email, req.body.password)
            const token = await user.generateToken()
            res.send({user, token})
        }
        catch(e){
            res.send(e.message)
        }
})


router.get('/allUsers', async(req,res)=>{
        try{
            const users = await User.find()
            res.status(200).send({
                status:1,
                data:users,
                message:'all data retrieved'
            })
        }
        catch(e){
            res.status(400).send({
                status:0,
                data: e.message,
                message: 'error retreive  data'
            })
        }
    })
    router.get('/user/:id', async(req,res)=>{
        _id = req.params.id
        try{
            user = await User.findById(_id)
            res.status(200).send({
                status:1,
                data:product,
                message:'product retrived'
            })
        }
        catch(e){
            res.status(400).send({
                status:0,
                data: e.message,
                message: 'error retrive data'
            })
        }
    })
    
    router.patch('/product/:id', async(req,res)=>{
        availableUpdates = ['password']
        const reqKeys = Object.keys(req.body)
        flag = reqKeys.every(key=> availableUpdates.includes(key))
        try{
            if(!flag) throw new Error('updates not available')
            await User.findByIdAndUpdate(req.params.id, req.body, {runValidators:true})
            data = await User.findById(req.params.id)
            res.status(200).send({
                status:1,
                data:data,
                message: 'updated'
            })
        }
        catch(e){
            res.status(400).send({
                status:0,
                data: e.message,
                message: 'error update data'
            })
        }
    })
    
    router.delete('/product/:id', async(req,res)=>{
        const id = req.params.id
        try{
            await User.findByIdAndDelete(id)
            res.status(200).send({
                status:1,
                data:'',
                message:'deleted'
            })
        }
        catch(e){
            res.status(400).send({
                status:0,
                data: e.message,
                message: 'error inserting data'
            })
        }
    })
   
    module.exports = router
    
