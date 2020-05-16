const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];

function askManager() {
    return inquirer
        .prompt([{
            type: "input",
            name: "name",
            message: "What is the Manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the Manager ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Manager's email?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the office phone number?"
        }



    ]).then(function(answers){
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        employees.push(manager);
        addEmployee();
    });
    
};

function askEngineer() {
    return inquirer
        .prompt ([{
            type: "input",
            name: "name",
            message: "What is the Engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the Engineer's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Engineer's email?"
        },
        {
            type: "input",
            name: "github",
            message: "What is your Github user name?"
        },
        
    ]).then(function(answers){
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        employees.push(engineer);
        addEmployee();
    });
};

function askIntern() {
    return inquirer
        .prompt ([{
            type: "input",
            name: "name",
            message: "What is the Intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the Intern's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the Intern's email address?"
        },
        {
            type: "input",
            name: "school",
            message: "What is the name of the school the Intern attended?"
        }
    ]).then(function(answers) {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        employees.push(intern);
        addEmployee();
    });
};

async function addEmployee() {
    console.log("Adding new Employee");
    return await inquirer
        .prompt([{
            type: "list",
            name: "role",
            message: "Which type of employee are you adding?",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "None"
            ]
        }
    ]).then(function(answers) {
        switch (answers.role) {
            case "Manager":
                askManager();
                break;
            case "Engineer":
                askEngineer();
                break;
            case "Intern":
                askIntern();
                break;
            default:
                createTeam();
        };

    })
    
};

async function createTeam() {
    const outputHTML = render(employees);
    await fs.writeFile(outputPath, outputHTML, function(err) {
        if (err) throw err;
        console.log("Team Created Successfully!");
    });
};

addEmployee();


