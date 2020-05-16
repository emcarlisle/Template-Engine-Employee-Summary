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

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
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
                "Intern"
            ]
        }
        //{
        //    type: "list",
        //    name: "newEmp",
        //    message: "Would you like to add more members?",
        //    choices: [
        //        "Yes",
        //        "No"
        //    ]
        //}
    ]).then(function(answers) {
        switch (answers.role) {
            case "Manager":
                askManager();
            case "Engineer":
                askEngineer();
            case "Intern":
                askIntern();
                break;
            default:
                break;
        };
    })
    
};    
    
   
    //{
    //    //const employee = new Employee(answers.name, answers.id, answers.email);
    //    const outputHTML = render(employees);
    //    fs.writeFile(outputPath, outputHTML, function() {
    //        console.log("Successfully added!");
    //    });
    //
    //    

        
    //});
    
    


addEmployee();



// NEXT:
// finish writing out prompts for engineer and intern
// include a function with inquirer(choices) to determine what role using if/else, or switch statements
// if answers.role = "manager" then run askManager




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
