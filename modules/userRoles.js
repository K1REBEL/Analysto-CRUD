const { accessroles } = require("../middleware/auth");

const userAPI = {
   addOrg: [accessroles.admin],
   getDetails:[accessroles.admin, accessroles.user],
   deleteUser:[accessroles.admin, accessroles.user],
   softDelete:[accessroles.admin],
   updateEmail:[accessroles.admin, accessroles.user],
   addVehicle:[accessroles.admin],
   getVehicle:[accessroles.admin,accessroles.user],
   getEvent:[accessroles.admin, accessroles.user],
}

module.exports = userAPI; 