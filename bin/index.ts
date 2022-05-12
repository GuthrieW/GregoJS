import simpleGit, { SimpleGit } from "simple-git";
import { Command } from "commander";
import { getAllFiles } from "../src/files";
import { doBadStuffToFiles } from "../src/conflicts";

const program = new Command();

const packageInformation = require("../package.json");

program
  .name(packageInformation.name)
  .description(packageInformation.description)
  .version(packageInformation.version);

program
  .command("create-conflicts")
  .description("Create merge conflicts")
  .action(() => {
    // checkout 'develop'
    const git: SimpleGit = simpleGit(process.cwd());
    git.checkout("develop");
    git.pull();

    // get all files
    const repositoryFiles: string[] = getAllFiles({
      dirPath: __dirname,
      arrayOfFiles: [],
    });

    // write new code
    doBadStuffToFiles(repositoryFiles);

    // commit to 'develop' without pushing
    git.add(".");
    git.commit("Added code that should create merge conflicts");

    // checkout new branch
    git.checkoutBranch("conflict-maker", "develop");

    // write more code
    doBadStuffToFiles(repositoryFiles);

    // try to merge develop
    git.mergeFromTo("develop", "conflict-maker");
  });
