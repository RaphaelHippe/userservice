angular.module('sliderModule').controller('SliderCtrl', function ($scope) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [{
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
angular.module('sliderModule').directive('disableAnimation', function($animate){
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs){
            $attrs.$observe('disableAnimation', function(value){
                $animate.enabled(!value, $element);
            });
        }
    }
});
