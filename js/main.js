import { prmSearchBarAfterConfig } from './prmSearchBarAfter/prmSearchBarAfter';
import { prmTopbarAfterConfig } from './prmTopbarAfter/prmTopBarAfter';

let app = angular.module('viewCustom',['angularLoad']);
console.log("Début de la personnalisation angular");
console.log("Modules AngularJS chargés : angularLoad");
if (app){
    // app.component('prmSearchBarAfter', prmSearchBarAfterConfig);
    app.component('prmTopbarAfter', prmTopbarAfterConfig);
}
