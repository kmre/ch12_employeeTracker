const express = require('express');
const router = express.Router();

router.use(require('./departmentsRoutes'));
router.use(require('./employeesRoutes'));
router.use(require('./rolesRoutes'));

console.log("API Routes")

module.exports = router;