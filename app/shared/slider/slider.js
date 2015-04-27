var module = angular.module('sliderModule', ['ui.bootstrap']);

module.controller('SliderCtrl', function ($scope) {
  $scope.myInterval = 5000;
  $scope.counter = 0;
  $scope.slides = [{
      image: "assets/images/slider/slide_one.png",
      link: 'about',
      text: "About"
    },
    {
      image: "assets/images/slider/slide_two.png",
      link: 'leagues',
      text: "Leagues"
    },
    {
      image: "assets/images/slider/slide_three.png",
      link: 'contact',
      text: "Contact"
    }
  ];
});

//needed for the imcompatiblity with ngAnimate
module.directive('disableAnimation', function($animate){
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs){
            $attrs.$observe('disableAnimation', function(value){
                $animate.enabled(!value, $element);
            });
        }
    }
});

module.directive('carouselControllerProvider', function($timeout){
  return {
        scope: {
          counter: "=",
          slides: "="
        },
       link:function(scope, elem, attr){
         $timeout(function(){
           var carousel = elem.find('div')[1];
           var carouselCtrl = angular.element(carousel).isolateScope();
           var origNext = carouselCtrl.next;
           carouselCtrl.next = function(){
             origNext();
             scope.$parent.counter++;
             if(scope.$parent.counter == 12){
               scope.$parent.slides = [{
                   image: "assets/images/slider/slide_four.png",
                   link: 'about',
                   text: "About"
                 },
                 {
                   image: "assets/images/slider/slide_four.png",
                   link: 'leagues',
                   text: "Leagues"
                 },
                 {
                   image: "assets/images/slider/slide_four.png",
                   link: 'contact',
                   text: "Contact"
                 }
               ];
             }
           };
         });
       }
    };
});
