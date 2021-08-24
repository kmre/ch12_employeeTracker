//Code colaborators Ani C, Spencer Berkebile , Ben Gallagher, Emily Necciai Mayeski, Dana Bottoni, Daniel Carazo, Shane Crisostomo
//Code from Module 12 also referenced

const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected!');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    start();
  });
});

  const start = async () => {
    console.log(`
    ======================
    Main Menu
    ======================
    `);
    let selection = await inquirer.prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'choice',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role', 'Exit']
      }
    ]);
    switch (selection.choice) {
      case "View All Departments":
        viewDept();
      // console.log("one");
      break;
  
      case "View All Roles":
        viewRoles();
      console.log("2");
      break;
  
      case "View All Employees":
        viewEmployees();
      // console.log("3");
      break;    
  
      case "Add a Department":
        addDept();
      // console.log("4");
      break;    
  
      case "Add a Role":
      // console.log("5");
      addRole();
      break;    
  
      case "Add an Employee":
        addEmployee();
      // console.log("6");
      break;    
  
      case "Update Employee Role":
        updateEmployee();
      // console.log("7");
      break;    
  
      case "Exit":
      db.end()
      break;    
    }
  }

  function viewDept() {
    console.log(`
    ======================
    DEPARTMENTS
    ======================
    `);
      const sql = `SELECT * FROM departments_tb`;
      db.query(sql, (err, rows) => {
        if (err) {
          throw err;
        }
        console.table(rows)
        start();
        });   
  }
  function viewRoles() {
    console.log(`
    ======================
    ROLES
    ======================
    `);
    const sql = `SELECT * FROM roles_tb`;
    db.query(sql, (err, rows) => {
      if (err) {
        throw err;
      }
      console.table(rows)
      start();
      });  
  }  
  function viewEmployees() {
    console.log(`
    ======================
    EMPLOYEES
    ======================
    `);
    const sql = `SELECT * FROM employees_tb`;
    db.query(sql, (err, rows) => {
      if (err) {
        throw err;
      }
      console.table(rows)
      start();
      }); 
  }

  //Add a department
  async function addDept() {
    //add inquirer code to get the body information
    let addDeptInfo = await inquirer.prompt([
      {
        type: 'input',
        message: 'What is the Name of the Department?',
        name: 'nameDept',
        validate: input => {
        if (input) {
            return true;
        } else {
            console.log('Answer can not be left blank! \n');
            return false;
        }
        }
      }
    ]);
    const sql = `INSERT INTO departments_tb (department_name) VALUES (?)`;
    const params = [
      addDeptInfo.nameDept,
    ];
    db.query(sql, params, (err, rows) => {
        if (err) {
          throw err;
        }
        viewDept();
    }); 
}

//add a role
async function addRole() {
  //let deptInfo = new Object();
  let deptArray = [];

  const sqlDpt = `SELECT * FROM departments_tb`;
      db.query(sqlDpt, (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach(element => {
          //console.log(element.id)
          //deptInfo.id = element.id
          //deptInfo.dept = element.department_name
          deptArray.push(element.department_name)
        });
      }); 

  let addRoleInfo = await inquirer.prompt([
    {
      type: 'input',
      message: 'What is the new Role/Title?',
      name: 'nameRole',
      validate: input => {
      if (input) {
          return true;
      } else {
          console.log('Answer can not be left blank! \n');
          return false;
      }
      }
    },
    {
      type: 'input',
      message: 'What is the Salary for this Role?',
      name: 'salaryRole',
      validate: input => {
      if (input) {
          return true;
      } else {
          console.log('Answer can not be left blank! \n');
          return false;
      }
      }
    },
    {
      type: 'list',
      message: 'Choose the Department for this new Role',
      name: 'deptRole',
      choices: deptArray
    }
  ]);

  //Look up the department ID for the selected department from the array
  const deptID = await db.promise().query(`SELECT id FROM departments_tb WHERE department_name = ?`, addRoleInfo.deptRole)
  //console.log(deptID[0][0].id)
  const sql = `INSERT INTO roles_tb (title, salary, department_id) VALUES (?,?,?)`;

  const params = [
    addRoleInfo.nameRole,
    addRoleInfo.salaryRole,
    deptID[0][0].id,
  ];
  db.query(sql, params, (err, rows) => {
      if (err) {
        throw err;
      }
      viewRoles();
  }); 
}

//add an employee
async function addEmployee() {
  //let deptInfo = new Object();
  let rolesArray = [];

  const sqlRoles = `SELECT * FROM roles_tb`;
      db.query(sqlRoles, (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach(element => {
          //console.log(element.id)
          //console.log(element.salary)
          //deptInfo.id = element.id
          //deptInfo.dept = element.department_name
          rolesArray.push(element.title)
        });
      }); 

  let addEmployeeInfo = await inquirer.prompt([
    {
      type: 'input',
      message: "What is the employee's First Name",
      name: 'firstName',
      validate: input => {
      if (input) {
          return true;
      } else {
          console.log('Answer can not be left blank! \n');
          return false;
      }
      }
    },
    {
      type: 'input',
      message: "What is the employee's Last Name",
      name: 'lastName',
      validate: input => {
      if (input) {
          return true;
      } else {
          console.log('Answer can not be left blank! \n');
          return false;
      }
      }
    },
    {
      type: 'list',
      message: 'Choose the Role for this new Employee',
      name: 'roleEmployee',
      choices: rolesArray
    },
    {
      type: 'input',
      message: "What is the Manager's ID for this employee",
      name: 'managerID'
    },
  ]);

  //Look up the role ID for the selected role from the array
  const roleID = await db.promise().query(`SELECT id FROM roles_tb WHERE title = ?`, addEmployeeInfo.roleEmployee)
  console.log(roleID[0][0].id)
  const sql = `INSERT INTO employees_tb (first_name, last_name, manager_id, role_id) VALUES (?,?,?,?)`;
  const params = [
    addEmployeeInfo.firstName,
    addEmployeeInfo.lastName,
    addEmployeeInfo.managerID,
    roleID[0][0].id,
  ];
  db.query(sql, params, (err, rows) => {
      if (err) {
        throw err;
      }
      viewEmployees();
  }); 
}

//update employee information
async function updateEmployee() {
 //let deptInfo = new Object();
 var employeesArray = [];
 var roleArray = [];

 const sqlEmployee = `SELECT * FROM employees_tb`;
      db.query(sqlEmployee, async (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach(element => {
        //console.log(element.id)
        //console.log(element.salary)
        //deptInfo.id = element.id
        //deptInfo.dept = element.department_name
        employeesArray.push(element.first_name + " " + element.last_name);
      });
      // console.log("1 " + employeesArray)

      const sqlEmployee = `SELECT * FROM roles_tb`;
      db.query(sqlEmployee, async (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach(element => {
          //console.log(element.id)
          //console.log(element.salary)
          //deptInfo.id = element.id
          //deptInfo.dept = element.department_name
          roleArray.push(element.title);
        });
        //console.log("1 " + roleArray)
      })
      //console.log("2 " + roleArray)

 let updateEmployeeInfo = await inquirer.prompt([
   {
     type: 'list',
     message: 'Choose the Employee to Update',
     name: 'updateEmployee',
     choices: employeesArray
   },
   {
     type: 'list',
     message: "What is the Employee's new Role",
     name: 'updateRole',
     choices: roleArray
   },
 ]);
 console.log("name: " + updateEmployeeInfo.updateEmployee)
 console.log("role: " + updateEmployeeInfo.updateRole)
 let name = updateEmployeeInfo.updateEmployee.split(" ")
 //console.log(name[0])
 //console.log(name[1])
 
 //Look up the role ID for the selected role from the array
 const employeeID = await db.promise().query(`SELECT id FROM employees_tb WHERE first_name = ? AND last_name = ?`, [name[0], name[1]]);
 console.log(employeeID[0][0].id)
 const newRoleID = await db.promise().query(`SELECT id FROM roles_tb WHERE title = ?`, updateEmployeeInfo.updateRole);
 console.log(newRoleID[0][0].id)

 const sql = `UPDATE employees_tb SET role_id = ? WHERE id = ?`;
 const params = [
  newRoleID[0][0].id,
  employeeID[0][0].id
 ];
 db.query(sql, params, (err, rows) => {
     if (err) {
       throw err;
     }
     viewEmployees();
 }); 
 }); 
}

//Need code for adding managers




   