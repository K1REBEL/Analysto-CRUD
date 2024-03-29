var jwt = require("jsonwebtoken");
// const userModel = require("../DB/model/user");
const { getDatabase } = require("../DB/connect")
const { adminSearchByID, orgSearchByID, empSearchByID } = require("../modules/helpers/searchers")

const db = getDatabase();

const accessroles = {
   admin: "admin",
   org: "organization",
   emp: "employee"
}

const auth = (accessroles) => {
   return async (req, res, next) => {
      if(!req.headers || req.headers == undefined || req.headers == null || !req.headers["authorization"] || 
      !req.headers["authorization"].startsWith('Bearer')){
         res.status(400).json({message: "Bad authorization key"});
      }else{
         let authToken = req.headers["authorization"];
         let token = authToken.split(" ")[1]
         let verifiedkey = await jwt.verify(token, process.env.verifyTokenKey);
         // console.log(verifiedkey);
         if(verifiedkey){
            // console.log(verifiedkey, accessroles)
            if(accessroles.includes(verifiedkey.role)){
               if(verifiedkey.role == "admin"){
                  const adminResults = await adminSearchByID(verifiedkey.id);
                  // console.log(adminResults);
                  const admin = adminResults[0]
                  if(admin){
                     req.adminid = admin.id;
                     next()
                  }else{
                     // console.log("hello admin");
                     res.status(404).json({message: "No valid ID in sent token."});
                  }
               }else if(verifiedkey.role == "organization"){
                  const orgResults = await orgSearchByID(verifiedkey.id);
                  const org = orgResults[0]
                  console.log("hello organization", org);
                  if(org){
                     req.orgid = org.id;  
                     next()
                  }else{
                     res.status(404).json({message: "No valid ID in sent token."});
                  }
               }else if(verifiedkey.role == "employee"){
                  const empResults = await empSearchByID(verifiedkey.id);
                  const emp = empResults[0]
                  if(emp){
                     req.empid = emp.id;
                     next()
                  }else{
                     res.status(404).json({message: "No valid ID in sent token."});
                  }
               }
            }
            else{
               res.status(401).json({message: "You're not authorized."});
            }
         }
      }
   }
}

module.exports = { auth, accessroles };