import chalk from 'chalk';
import boxen from 'boxen';
import { createSpinner } from 'nanospinner'
import figlet from 'figlet'
import inquirer from 'inquirer';
import branchName from 'current-git-branch'

const someAsyncFunction = async () => {
    console.log(branchName()); 
  }
  
// someAsyncFunction()
const askUser = async() => {
    const answer = await inquirer.prompt({
        name: 'yes_or_no',
        type: 'confirm',
        message: "Do you want to continue?",
    })
    answer.yes_or_no === true ? null : process.exit(0)
}

const pause = async (ms = 1000) => new Promise((res, rec) => setTimeout(res, ms))

const starting = async() => {
    const spinner = createSpinner(chalk.cyanBright('Starting Automator...')).start({margin: 50}) 
    await pause()
    spinner.success()
}

const gitCommands = async() => {
    const gitAdd = createSpinner(chalk.cyanBright("git add -A")).start() 
    await pause()
    gitAdd.success()
    const gitCommit = createSpinner(chalk.cyanBright("git commit -m 'branchname'")).start() 
    await pause()
    gitCommit.success()
    const gitPull = createSpinner(chalk.cyanBright("git pull --rebase origin")).start() 
    await pause()
    gitPull.success()
    const gitPush = createSpinner(chalk.cyanBright("git push origin HEAD:refs/for/develop")).start() 
    await pause()
    gitPush.success()
    console.log("\n")
    await pause()
}

const name = 'GIT  2  BIRGIT'


const boxing = async() => {
    console.log(boxen(chalk.cyanBright(figlet.textSync(name), '\nversion 0.0.0-a.1'), {title: 'BIRGIT CHANGE AUTOMATOR', titleAlignment: 'center', textAlignment: 'center', padding: 1, margin: 2, borderStyle: 'single', borderColor:'cyanBright'}));
}
console.log("\n")
await askUser()
await starting()
await boxing()
await gitCommands()