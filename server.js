
//////////////////////////////////////////////////////////////////////////////////

const express = require("express")
const server = express()
const{affab,ajoufab, deleteRdv, affrdv, ajourdv,deletePatient}=require('./bd')
server.use(express.json())
server.use(express.urlencoded({extended:false}))
server.use(express.static('PUBLIC'))
server.set("view engine","ejs")

const mysql = require("mysql2")
const { request } = require("express")

server.get("/Patients",(req,res)=>{
    res.status(200).render('Patients')
})

server.listen(5000,()=>{  
    console.log("server running")

})

 ///////////////////////




 // affichage 
 server.get("/",async(req,res)=>{
   const[patients,_]=await affab()
   res.status(200).render('patients',{patients})
 })

 server.get("/Rdvs",async(req,res)=>{
  const[Rdvs,_]=await affrdv()
  res.status(200).render('Rdvs',{Rdvs})
})

server.get("/formalade",async(req,res)=>{
  const[patients,_]=await affab()
  res.status(200).render('patients',{patients})
})


 // REMPLISSAGE FORMULAIRE
 
 server.post("/formalade",async (req,res)=>{
  // console.log (req.body)
   const{CODEP,NOMP,AGEP,GENREP,MOBP}=req.body
   await ajoufab(CODEP,NOMP,AGEP,GENREP,MOBP)
   res.status(201).redirect('/')
 })
 

 server.post("/formrdv",async (req,res)=>{
  // console.log (req.body)
   const{CODEP,NOMP,DATE_RDV,CRENEAU}=req.body
   await ajourdv(CODEP,NOMP,DATE_RDV,CRENEAU)
   res.status(201).redirect('/Rdvs')
 })



/////ROUTES////////



 server.get('/Rdvs', async function(request,response)
 {
  const [RDVS,_]= await affrdv()
    response.status(200).render('Rdvs', {RDVS});
 })

 
 server.get('/formrdv',function(request,response)
 {
    response.status(200).render('formrdv');
 })


 server.get('/formalade/ajouter',function(request,response)
 {
    response.status(200).render('formalade');
 })

 //// supprimer //////
 server.post("/deletepatient", async (req, res) => {
  const { codep } = req.body;
  await deletePatient(codep);
  res.status(200).redirect("/");
});

 server.post("/deleterdv", async (req, res) => {
  const { codep } = req.body;
  await deleteRdv(codep);
  res.status(200).redirect("/Rdvs");
});


server.get('/suprdv',function(request,response)
{
   response.status(200).render('suprdv');
})
server.get('/supmalade',function(request,response)
{
   response.status(200).render('supmalade');
})














server.use("/*",(_req,res)=>{
    res.status(404).send('NOT FOUND')

})

/*con.query("select * from patients", (err, results, fields) => {
    console.log(results)
})*/

/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});*/
