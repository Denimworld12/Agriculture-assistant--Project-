var express=require("express")
var app=express()

var bodyparser=require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}));


app.get('/',function(req,res){
    res.sendFile(__dirname+'/register.html')
    
})

app.post('/',function(req,res){
console.log(req.body);

})
 app.listen(3000)