Welcome to the LAMBDATESTHyperExecute(https://github.com/ParthPatel2505/LAMBDATESTHyperExecute.git) repository! This project is hosted on Gitpod and integrates with LambdaTest for automated testing.

Table of Contents

Features
Getting Started
Usage
License
Contact

Features
-Automated cross-browser testing using LambdaTest
-Integrated Playwright testing
-Easily run your tests on a cloud platform

Getting Started
To get started with this project:
-Fork this repository (or clone it) to your GitHub account.
-Open the repository in Gitpod by navigating to Gitpod Workspace([https://parthpatel25-lambdatest-rmg454a4dvv.ws-us117.gitpod.io/](https://debug-parthpatel2-lambdatesth-4vl7lah5l2k.ws-us117.gitpod.io/)).

Prerequisites
Make sure you have the following installed:
-Gitpod (via the link above)
-Node.js and npm (if you want to run locally)

Installation
Clone the repository (if you are not using Gitpod):
-git clone https://github.com/yourusername/project-name.git
-cd project-name

Install the necessary dependencies:
-npm install

Install Playwright and its browsers:
-npx playwright install
-npx playwright install --with-deps

Install LambdaTest dependency (if applicable):
-npm install -g node-ovsx-sign

Usage
-Once everything is set up, you can run your automated tests:

Running Tests in Gitpod
-Open a terminal in Gitpod.

To run the Playwright tests:
-npx playwright test


For running all scenarios using .gitpod.yml
-Open the repository in Gitpod by navigating to Gitpod Workspace([https://parthpatel25-lambdatest-rmg454a4dvv.ws-us117.gitpod.io/](https://debug-parthpatel2-lambdatesth-4vl7lah5l2k.ws-us117.gitpod.io/)) and manually run the .gitpod.yml file

License
-This project is licensed under the ISC License.

set HYPEREXECUTE_PLATFORM=windows
set LT_USERNAME=parth.pateltntra
set LT_ACCESS_KEY=e5NcBKPoyQpKuhwZQZXnQgRnvGaEQkwhoklJPG54Y3VIqCz540

Execution with HyperExecute CLI
./hyperexecute --user="$LT_USERNAME" --key="$LT_ACCESS_KEY" --config ../win11/.hyperexecute_autosplits.yaml



