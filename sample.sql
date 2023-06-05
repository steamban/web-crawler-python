-- Creating tables

CREATE TABLE students (
       roll INTEGER,
       fname VARCHAR(50),
       lname VARCHAR(50),
       age INTEGER,
       address TEXT, 
       contact VARCHAR(15)
       
);

-- Inserting data
        
INSERT INTO students
        (roll, fname, lname, age, address, contact) 
VALUES 
       (1, 'John', 'Smith', 14, 'something street', '+91999999'),
       (2, 'Jane', 'Doe', 14, 'other street', '+01888888');

-- Querying

SELECT * from students;
