const path= require('path')
const express = require('express')
const hbs = require('hbs')
const { MongoClient, ObjectID} = require('mongodb')

const app = express()
const PORT = 3000

const myPublicFiles = path.join(__dirname, '../public')
const myViewsFiles = path.join(__dirname, '../frontend/views')
const myPartialsFiles = path.join(__dirname, '../frontend/layouts')


app.set('view engine', 'hbs')
app.set('views', myViewsFiles)
hbs.registerPartials(myPartialsFiles)
app.use(express.static(myPublicFiles))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


function MDBConnection(callback){
    const myDBUrl = 'mongodb://127.0.0.1:27017'
     const dbName = "myTasks"
     MongoClient.connect(
        myDBUrl,
        {useNewUrlParser:true, useUnifiedTopology:true},
        (error, client)=>{
            if(error) return console.log('db error')
            
            const db = client.db(dbName)
            /*insert data */
    
            callback(db)
              
            })
}

app.get('' ,(req,res)=>{
    res.render('home')
})


app.post('/addTask', (req, res)=>{
    data = req.body
    db = MDBConnection((db)=>{
        db.collection('newCollection').insertOne(data, (err, result)=>{
            if(err)  return console.log(err)
            console.log(`data inserted succesfully ${result.insertedCount} inserted`)
    })
  })
    res.redirect('/showAll')
})

app.get('/addTask' ,(req, res)=>{
    res.redirect('/showAll')

})
app.get('/showAll',(req, res)=>
{
    db= MDBConnection((db)=>{
        db.collection('newCollection').find().toArray((err ,result)=>{
            if(err) res.render('error')
            else res.render('alltask' ,{data :result})
        })

    })

})

app.get('/deletetask/:_id' , (req, res) => {
    db= MDBConnection((db)=>{
        db.collection('newCollection').deleteOne({ _id:{$exists:true}},((err, result)=>{
                if(err)  console.log(error)
                else console.log('delete')
                res.redirect('/showAll')
   
            })
        )
    })
})

app.get('/edittask/:_id' , (req, res) => {
        db= MDBConnection((db)=>{
            db.collection('newCollection').findOne({id:{$exists:true}},((err, result)=>{
                if(err)  console.log(error)
                else console.log('Edit task', result)
                  res.render('home',{data:result})
            })
        )
    })
})
 

app.post('/editTask/:id', (req,res)=>{

    db= MDBConnection((db)=>{
       var newvalues = { $set: {title:req.body.title,select:req.body.select ,content:req.body.content } };
       db.collection('newCollection').updateOne({_id:{$exists:true}},newvalues,((err, result)=>{
              if(err) { console.log(error)}
              else{ console.log("edited sucess")
                 res.redirect('/showAll')}
          })
    )
    })
})

app.listen(PORT)