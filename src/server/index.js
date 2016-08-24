// Created by snov on 22.06.2016.

import OSNOVA from './osnova';

function myApp(osnova) {
  osnova.myApp = 'WOWOWOW';
}

const osnova = new OSNOVA(myApp);

osnova.start();