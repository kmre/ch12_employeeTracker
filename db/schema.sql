DROP TABLE IF EXISTS employees_tb;
DROP TABLE IF EXISTS roles_tb;
DROP TABLE IF EXISTS departments_tb;

CREATE TABLE departments_tb (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(50) NOT NULL
);

CREATE TABLE roles_tb (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  salary DECIMAL,
  title VARCHAR(30) NOT NULL,
  department_id INTEGER,
  CONSTRAINT fk_department
    FOREIGN KEY (department_id)
    REFERENCES departments_tb(id)
    ON DELETE SET NULL
);

CREATE TABLE employees_tb (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  CONSTRAINT fk_role
    FOREIGN KEY (role_id)
    REFERENCES roles_tb(id)
);