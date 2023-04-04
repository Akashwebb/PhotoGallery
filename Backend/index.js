const express=require("express")
const app=express()
const mongoose=require("mongoose")
app.use(express.json())
const schema3=require("./schema/schema3")
const cors=require("cors")
app.use(cors())

const db="mongodb+srv://admin:admin@cluster0.064h0s0.mongodb.net/?retryWrites=true&w=majority"
mongoose.set('strictQuery',true)
mongoose.connect(db,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("connected to database")
    }
})

app.post("/photos", async (req,res)=>{
    const {label,url}=req.body
    
         try{
         const data=  await schema3.create({
            label:label,
            url:url
         })
        
         res.status(200).json({
         status:"success",
         data
     })
     }
     catch(e){
         res.status(401).json({
             status:"fail",
             message:e.message
         })
     }
 }
     )


  app.get("/photos", async (req,res)=>{
    try{
        const data=await schema3.find().sort({createdAt:-1})
        res.status(200).json({
            status:"got data",
            data
        })
        
    }catch(e){
        res.status(400).json({
            status:"No data",
            message: e.message
        })
    }
  })
  app.delete("/delete/:id",async(req,res)=>{
    try{
        const data=await user.deleteOne({_id:req.params.id})
        res.status(200).json({
            status:"success",
            data
        })
    }
    catch(e){
        res.status(404).json({
            status:"success",
            message:e.message
        })
    }
})
 app.get("/demo",(req,res)=>{
    res.send("this is for demo")
})
app.listen("3001",()=>{console.log("server is up")})