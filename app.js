const inquirer = require('inquirer');
const chalk = require('chalk');
const boxen = require('boxen')
const fs = require('fs')
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generateHtml = require('./lib/generateHtml')
const managerArray = [];
const engineerArray = [];
const internArray = [];
let id = 0;
let exit = false;
const filename = './output/team.html'

const questionsStart = [{
    type: "list",
    message: ">>>>>>>Select team member's role:<<<<<<",
    name: "role",
    choices: ["Manager", "Engineer", "Intern", "Exit"]
}]

const baseQuestions = [{
        type: "input",
        message: "Enter team member's name:",
        name: "name",
        validate: function validateName(name) {
            return name !== '';
        }
    },
    {
        type: "input",
        message: "Enter team member's email:",
        name: "email",
        validate: function validateName(name) {
            return name !== '';
        }
    }
]

const managerQuestion = [{
    type: "input",
    message: "Enter Manager's Office Number:",
    name: "officeNumber",
    validate: function validateName(name) {
        return name !== '';
    }
}]

const engineerQuestion = [{
    type: "input",
    message: "Enter Engineer's GitHub username:",
    name: "github",
    validate: function validateName(name) {
        return name !== '';
    }
}]

const internQuestion = [{
    type: "input",
    message: "Enter Inter's School:",
    name: "school",
    validate: function validateName(name) {
        return name !== '';
    }
}]

const inputStart = async () => {
    const {
        role,
        ...answers
    } = await inquirer.prompt(questionsStart);
    return role;
};

const collectInputs = async (role) => {
    id = id + 1
    if (role === 'Manager') {
        console.log(boxen(chalk.white.bold(`Adding a new ${role} team member.`), {
            padding: 1,
            margin: 1,
            borderColor: 'green',
            backgroundColor: 'green'
        }))
        const questions = [...baseQuestions, ...managerQuestion];
        member = await inquirer.prompt(questions);
        const memberObj = new Manager(member.name, id, member.email, member.officeNumber);
        managerArray.push(memberObj);
    } else if (role === 'Engineer') {
        console.log(boxen(chalk.white.bold(`Adding a new ${role} team member.`), {
            padding: 1,
            margin: 1,
            borderColor: 'green',
            backgroundColor: 'green'
        }))
        const questions = [...baseQuestions, ...engineerQuestion];
        member = await inquirer.prompt(questions)
        const memberObj = new Engineer(member.name, id, member.email, member.github);
        engineerArray.push(memberObj);
    } else if (role === 'Intern') {
        console.log(boxen(chalk.white.bold(`Adding a new ${role} team member.`), {
            padding: 1,
            margin: 1,
            borderColor: 'green',
            backgroundColor: 'green'
        }))
        const questions = [...baseQuestions, ...internQuestion]
        member = await inquirer.prompt(questions)
        const memberObj = new Intern(member.name, id, member.email, member.school);
        internArray.push(memberObj);
    } else {
        console.log(boxen(chalk.black.bold(`Exiting the Add Memeber CLI`), {
            padding: 1,
            margin: 1,
            borderColor: 'yellow',
            backgroundColor: 'yellow'
        }))
        return exit = true;
    }
}

const writeHtml = (filename, data) => {
    fs.writeFile(filename, data, function (err) {
        if (err) console.log(err);
        console.log(chalk.green("File written successfully"));
    });
};

const init = async () => {
    while (!exit) {
        const role = await inputStart();
        await collectInputs(role);
    }
    const html = await generateHtml(managerArray, engineerArray, internArray);
    writeHtml(filename, html);
}

init();