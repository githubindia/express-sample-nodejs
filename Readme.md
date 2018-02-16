# Express NodeJS Template

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

Express nodeJS template is ready to go for projects by which you can do API calls and access the data from the database. This template handles database fatal errors and also logs it in a file.

### Download and Installation
To begin using this framework, choose one of the following options to get started:

- Clone the repo: `https://github.com/githubindia/express-sample-nodejs.git`
- [Fork clone or download on Github.](https://github.com/githubindia/express-sample-nodejs)

### Usage

After downloading, simply edit `mysql.js` file included with the framework for re-usability in your favorite text editor to make changes or if you are using any other database so configure it in that file. In `routes.js` file you need to define routes if you want to, otherwise basic routes are already defined with the same endpoint. These are the only files you need to worry about, you can ignore everything else! To preview the changes you make to the code, you can run the `index.js` file in console.

You need to configure `.env` file and give databas credentials to it.

### Tech

Web Summarizer uses a number of open source projects to work properly. The following tools were used:

- [node.js](https://nodejs.org/) - evented I/O for the backend
- [Express](https://www.npmjs.com/package/express) - fast node.js network app framework
- [winston](https://www.npmjs.com/package/winston) - A multi-transport async logging library for node.js.
- [MySQL](https://www.npmjs.com/package/mysql) - A relational database management system (RDBMS) for storing data and retreiving data. 

## Installation

Web Summarizer requires Node.js v6+ to run.
Install the dependencies and devDependencies and start the server.

```sh
$ cd express-sample-nodejs
$ npm install -d
$ node index.js
```

For production environments...

```sh
$ NODE_ENV=production node index.js
```