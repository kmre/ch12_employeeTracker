INSERT INTO departments_tb (department_name)
VALUES
    ("Sales"),
    ("Finance"),
    ("Engineering"),
    ("Legal");

INSERT INTO roles_tb (salary, title, department_id)
VALUES
    (100000, "Sales Lead", 1),
    (80000, "Salesperson", 1),
    (150000, "Lead Engineer", 3),
    (120000, "Software Engineer", 3),
    (125000, "Accountant", 2),
    (1900000, "Legal Team Lead", 4),
    (120000, "Lawyer", 4);

INSERT INTO employees_tb (first_name, last_name, role_id, manager_id)
VALUES
    ("Ronald", "McDonald", 4, 402),
    ("Dora", "Exp", 1, 101),
    ("Bob", "Fixer", 3, 304),
    ("Chad", "McBank", 2, 202);
