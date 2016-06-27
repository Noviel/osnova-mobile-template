#OSNOVA: Client+Server application template

###bI
Backbone for Client+Server application for node.js and browsers with built-in ES6 syntax support.
Wow such ready-to-go much time to watch anime.

###Philosophy
Repetition of exact the same actions is boring. Using this template you can
start creation of your new application in a few minutes.
Cutting edge features of ES6, Express.js as core of web server and Mongoose for work with database
are ready-to-use. You can deploy and launch your application on old environments because of built-in transpiling ES6 to ES5.

###Install

####via git (preferable)

    git clone git@github.com:Noviel/osnova-application-template.git <your-application-name>

####or via download

    https://github.com/Noviel/osnova-application-template/archive/master.zip
  and uznip to new project directory.

####or via npm

    npm install osnova-application-template
  and then cut'n'paste content of `/node_modules/osnova-application-template` to the root of your project.

###Prepare
- Go to `<your-application-name>` root directory.
- Delete `.git` directory.
- `npm install` for dependencies.
- Set in `package.json` information about your application.

###Coding
- Write some cool code in `src/code` folder.

Client-side code is located in `src/code/client`, server-side in `src/code/server`.
`index.js` in both directories are entry points for client/server.
This system is server-first in some aspects.
Common code used at server and at client is treated as more server-side and located in `src/code/server/common`.

###Building

- Run `npm run build` to build your revolutionary changes in code.

This will put transpiled to ES5 code to `client` and `server` directories.
`Webpack`+`Babel` build and transpile client code to ES5 and produce a single `client/js/main.js` file,
and `Babel` transpiles server's code and put it into `server` directory.

###Testing
- Run some tests.

###Publishing
- Launch your application in production.

###Bugs

Babel es-2015 `export default` feature is not working :() I am investigating the situation!