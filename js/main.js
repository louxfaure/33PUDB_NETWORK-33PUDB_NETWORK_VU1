import { prmSearchBarAfterConfig } from './prmSearchBarAfter/prmSearchBarAfter';
// import {  } from './prmTopbarAfter/prmTopbarAfter';

let app = angular.module('viewCustom',['angularLoad']);
console.log("Début de la personnalisation angular");
console.log("Modules AngularJS chargés : angularLoad");
if (app){
    app.component('prmSearchBarAfter', prmSearchBarAfterConfig);
}
