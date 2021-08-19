//Code colaborators Ani C, Ben Gallagher, Emily Necciai Mayeski, Dana Bottoni, Daniel Carazo, Shane Crisostomo
//Code sections also taken from https://www.tabnine.com/code/javascript/functions/express/Express/delete
//Code from Module 12 also referenced

const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');
const generateRequest = require('./utils/selections');

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
    SQL Tables
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
      db.end();
      break;    
    }
  }

  function viewDept() {
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
    const sql = `SELECT * FROM employees_tb`;
    db.query(sql, (err, rows) => {
      if (err) {
        throw err;
      }
      console.table(rows)
      start();
      }); 
  }

  const getInfo = async () => {
    let selection = await inquirer.prompt([{
      type: 'input',
      name: 'enterName',
      message: 'Please Enter First Name:',
      validate: input => {
        if (input) {
            return true;
        } else {
            console.log('Answer can not be left blank! \n');
            return false;
        }
        }
    }]);
  }

  function addDept() {
    //add inquirer code to get the body information
    
    }

    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected, party_id) VALUES (?,?,?,?)`;
    const params = [
      body.first_name,
      body.last_name,
      body.industry_connected,
      body.party_id
    ];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body
      });
    });

  


   