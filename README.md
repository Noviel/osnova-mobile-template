#OSNOVA: Client+Server application template

###bI
Backbone for Client/Server application for Android/iOS and browsers and node.js with built-in ES6 syntax support.
Wow such ready-to-go much time to watch anime.

###Features
- Cordova for building Android/iOS mobile application.
- Cutting edge features of ES6 on any environment.
- Express.js as core of web server.
- Mongoose for working with database.
- Socket.IO for real-time client-server communication.
- Webpack for building client code for web and mobile.

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

####Common
- Go to `<your-application-name>` root directory.
- Delete `.git` directory.
- `npm run prepare` to install dependencies.
- Set in `package.json` information about your application.

####Mobile

You can skip this step, if you don't need mobile application.
Android/iOS SDKs must be installed in order to build it.

Install Cordova CLI if u don't have it yet:

    npm install -g cordova

Install Cordova's dependencies:
    
    npm run prepare-mobile
    
Put your application information in `/mobile/config.xml`.

###Workflow

- Write some cool code in `src/client` and `src/server` folders.

`index.js` in both directories are entry points for web-client/server.
`index.mobile.js` is an entry point for mobile application.

This system is server-first in some aspects.
Common code used at the server and at the client is treated as more server-side and should be located in `src/server/`.
On a client you can just write `require('../server/your-common-lib')` and it will be compiled by Webpack on the build step.

`/dev.tools/` - for development stage helpers (Webpack config, Gulp, etc).
`/private/`- for server-only compiled resources such as templates.
`/public/` - for public web client files.
`/server/` - for compiled server code.

`/mobile/` is location of the Cordova's project.
In `/mobile/www/` folder are placed compiled files that ready to be built by Cordova.

###Building

- `npm run build-server` to build server code.
`Babel` transpiles server's code and puts it into `/server/` directory.

- `npm run build-client` to build client code for web.
`Webpack` compiles from `/src/client/` to a single `index.js` transpiled to ES5 by `Babel` and puts it in `/public/js/`. 

- `npm run build-client-mobile` to build client code for mobile.
`Webpack` compiles from `/src/client/` to a single `index.js` transpiled to ES5 by `Babel` and puts it in `/mobile/www/js/`. 

- `npm run build` - build server and web client.


####Mobile
- `cd mobile`
- `cordova build <android|ios>`

See more at  [Cordova's documentation](http://cordova.apache.org/docs/en/latest/guide/cli/index.html#build-the-app).


###Testing
- Run some tests.

###Publishing
- Launch your application in production.