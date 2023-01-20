import chalk from "chalk";
import boxen from "boxen";
import { createSpinner } from "nanospinner";
import figlet from "figlet";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";

const getCurrentBranchName = (p = process.cwd()) => {
  const gitHeadPath = `${p}/.git/HEAD`;

  return fs.existsSync(gitHeadPath)
    ? fs.readFileSync(gitHeadPath, "utf-8").trim().split("/").pop()
    : "not a git repo";
};

import { simpleGit, CleanOptions } from "simple-git";

const options = {
  baseDir: process.cwd(),
  binary: "git",
  maxConcurrentProcesses: 6,
  trimmed: false,
};

// when setting all options in a single object
const git = simpleGit(options);

const currentBranch = getCurrentBranchName();

// someAsyncFunction()
const askUser = async () => {
  const answer = await inquirer.prompt({
    name: "yes_or_no",
    type: "confirm",
    message: `Ready to commit branch: (${currentBranch})?`,
  });
  answer.yes_or_no === true ? null : process.exit(0);
};

const pause = async (ms = 1000) =>
  new Promise((res, rec) => setTimeout(res, ms));

const starting = async () => {
  const spinner = createSpinner(
    chalk.cyanBright("Starting Automator...")
  ).start({ margin: 50 });
  await pause();
  spinner.success();
};

const gitCommands = async () => {
  const gitAdd = createSpinner(chalk.cyanBright("git add -A")).start();
  await git.add("-A");
  await pause(500);
  gitAdd.success();
  const gitCommit = createSpinner(
    chalk.cyanBright("git commit -m 'branchnamee'")
  ).start();
  await git.commit(currentBranch);
  await pause(500);
  gitCommit.success();
  const gitPull = createSpinner(
    chalk.cyanBright("git pull --rebase origin")
  ).start();
  await git.pull('origin', "--rebase");
  await pause(500);
  gitPull.success();
  const gitPush = createSpinner(
    chalk.cyanBright("git push origin HEAD:refs/for/develop")
  ).start();
  await pause();
  gitPush.success();
  console.log("\n");
  await pause();
};

const name = "GIT  2  BIRGIT";

const boxing = async () => {
  console.log(
    boxen(chalk.cyanBright(figlet.textSync(name), "\nversion 0.0.0-a.1"), {
      title: "BIRGIT CHANGE AUTOMATOR",
      titleAlignment: "center",
      textAlignment: "center",
      padding: 1,
      margin: 1,
      borderStyle: "single",
      borderColor: "cyanBright",
    })
  );
};
console.log("\n");
await askUser();
await starting();
await boxing();
await gitCommands();
