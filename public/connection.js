var mysql=require("mysql");
var con=mysql.createConnection({
host:"localhost",
user:"root",
password:"",
database:"userinfo"
});

// // con.connect(function(error){
// // if (error) throw error;

// // con.query("select * from users", function (error,result) {
// //     if (error) throw error;
// // console.log(result[0])
// // console.log(result[0].name)
// // })

// // })
// module.exports=con;

