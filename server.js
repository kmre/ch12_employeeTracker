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
      console.log("one");
      break;
  
      case "View All Roles":
      console.log("2");
      break;
  
      case "View All Employees":
      console.log("3");
      break;    
  
      case "Add a Department":
      console.log("4");
      break;    
  
      case "Add a Role":
      console.log("5");
      break;    
  
      case "Add an Employee":
      console.log("6");
      break;    
  
      case "Update Employee Role":
      console.log("7");
      break;    
  
      case "Exit":
      console.log("8");
      db.end();
      break;    
    }
  }