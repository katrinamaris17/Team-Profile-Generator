const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Global array to store all team members
const teamMembers = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function askManager() {
    inquirer.prompt([
        {
            name: "name",
            message: "Please provide manager's name.",
        },
        {
            name: "id",
            message: "Please provide manager's ID.",
            // using validation for ID to validate 
            validate: function(answer) {
                // console.log("I'm inside validate", answer.length);
                // return true;
                return answer.length > 2;
            }
        },
        {
            name: "email",
            message: "Please provide manager's email address.",
            validate: function (email) {
                // return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
                if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                    return (true)
                }
                return (false)
            }
        },
        {
            name: "officeNumber",
            type: "input",
            message: "Please provide manager's office phone number.",
        },
    ])
    // callback function
    .then(function(answers) {
        console.log(answers); 
        // instantiates a manager class and save to a manager var      
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        console.log(manager);
        teamMembers.push(manager);
        console.log(teamMembers);
        // call askEngineer function
        askEngineer()
    })
}

function askEngineer() {
    inquirer.prompt([
        {
            name: "name",
            message: "Please provide engineer's name.",
        },
        {
            name: "id",
            message: "Please provide engineer's id.",
        },
        {
            name: "email",
            type: "input",
            message: "Please provide engineer's email address.",
        },
        {
            name: "github",
            type: "input",
            message: "Please provide engineer's github.",
        },
        {
            name: "moreEngineers",
            type: "confirm",
            message: "Do you want to add more engineers?",
        },
    ])
    .then(function(answers) {
        console.log(answers); 
        // instantiate an engineer class and save to an engineer var      
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        teamMembers.push(engineer);
        console.log(teamMembers);
        if (answers.moreEngineers === true) {
            askEngineer()
        } 
        else {
            askIntern()
        }
    })
}

function askIntern() {
    inquirer.prompt([
        {
            name: "name",
            message: "Please provide intern's name.",
        },
        {
            name: "id",
            message: "Please provide intern's id.",
        },
        {
            name: "email",
            type: "input",
            message: "Please provide intern's email address.",
        },
        {
            name: "school",
            type: "input",
            message: "Please provide intern's school.",
        },
        {
            name: "moreInterns",
            type: "confirm",
            message: "Do you want to add more interns?",
        },
    ])
    .then(function(answers) {
        console.log(answers); 
        // instantiates an intern class and save to an intern var      
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        teamMembers.push(intern);
        console.log(teamMembers);
        if (answers.moreInterns === true) {
            askIntern()
        } 
        else {
            const result = render(teamMembers);
            fs.writeFileSync("result.html",result);
        }
    })
}

askManager()

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