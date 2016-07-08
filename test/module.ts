module test {

    'use strict';

    export let inject: at.IInjectAnnotation = at.inject;
    export let service: at.IServiceAnnotation = at.service;
    export let controller: at.IControllerAnnotation = at.controller;
    export let directive: at.IDirectiveAnnotation = at.directive;
    export let classFactory: at.IClassFactoryAnnotation = at.classFactory;
    export let resource: at.IResourceAnnotation = at.resource;

    angular.module('test', ['ngResource']);
}
