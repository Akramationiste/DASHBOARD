// import mysql from 'mysql2';

const { promiseImpl } = require("ejs");

var mysql = require ("mysql2")
var con = mysql.createConnection({
    host: "localhost",
    user: "akram",
    password: "akram44244",
    database: "cabinet"
  }).promise();

exports.affab = async()=>{
    const sql='SELECT * FROM patients';
    const result=await con.execute(sql)
    return result
}

exports.affrdv=async()=>{
    const sql='SELECT * FROM rdvs';
    const result = await con.execute(sql)
    return result
}

exports.ajoufab=async (Codep,_Nomp,_Agep,genrep,mobp)=>{
    const sql = `INSERT INTO patients (CodeP,Nomp,agep,genrep,mobp)values('${Codep}','${_Nomp}','${_Agep}','${genrep}','${mobp}')`;
    await con.execute(sql)
}

exports.ajourdv=async(Codep,_Nomp,date_rdv,_creneau)=>{
    const sql = `INSERT INTO rdvs (CodeP,Nomp,date_rdv,creneau)values('${Codep}','${_Nomp}','${date_rdv}','${_creneau}')`;
    await con.execute(sql)
}

exports.deletePatient = async (codep) => {
    const sql = `DELETE FROM patients WHERE CodeP = '${codep}'`;
    await con.execute(sql);
  };

exports.deleteRdv = async (codep) => {
    const sql = `DELETE FROM rdvs WHERE CodeP = '${codep}'`;
    await con.execute(sql);
  };
  
  

