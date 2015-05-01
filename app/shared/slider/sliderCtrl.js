'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:SliderCtrl
 * @description
 * # SliderCtrl
 * Controller of the webappApp
 */
angular.module('sliderModule').
  controller('SliderCtrl', ['$scope',
   function ($scope) {
    $scope.images = [{
      src: 'slide_two.png',
      link: 'leagues',
      title: 'Pic 1'
    }, {
      src: 'slide_one.png',
      link: 'about',
      title: 'Pic 2'
    }, {
      src: 'slide_three.png',
      link: 'contact',
      title: 'Pic 3'
    }];
  }]);
