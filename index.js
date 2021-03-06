const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const keys = require('./config/keys');
const User = require('./model/user')
const Task = require('./model/task')


mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true });

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())

app.post('/user', async (req,res)=>{
    const user = await new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    } catch(e){
        res.status(400).send(e)
    }
})

app.post('/task', async (req,res)=>{
    const task = await new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

app.patch('/user/:id', async (req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidators: true})
        if(!user){
            return res.status(404).send()
        }

    res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

app.listen( port, ()=>{
    console.log('Server is running on port :' + port)
})

