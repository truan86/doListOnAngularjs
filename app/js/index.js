import 'babel-polyfill';
import angular from 'angular';
import angularUiRouter from 'angular-ui-router';


import mainTemplate from './../partials/main/index.html';
import Main from '../js/name/name';

angular.module('doListApp', [angularUiRouter])
    .controller('MainController', Main)

    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                url: "/",
                template: mainTemplate,
                controller: 'MainController as main'
            });
    });

