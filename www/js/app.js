// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html'
    })
    .state('toto', {
      url: '/toto',
      templateUrl: 'toto.html'
    });
});

app.directive('headerShrink', function($document) {
  var fadeAmt;

  var shrink = function(header, content, amt, max) {
    amt = Math.min(44, amt);
    fadeAmt = 1 - amt / 44;
    ionic.requestAnimationFrame(function() {
      header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
      for(var i = 0, j = header.children.length; i < j; i++) {
        header.children[i].style.opacity = fadeAmt;
      }
    });
  };

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var starty = $scope.$eval($attr.headerShrink) || 0;
      var shrinkAmt;

      var header = $document[0].body.querySelector('.bar-header');
      var headerHeight = header.offsetHeight;

      $element.bind('scroll', function(e) {
        var scrollTop = null;
        if(e.detail){
          scrollTop = e.detail.scrollTop;
        }else if(e.target){
          scrollTop = e.target.scrollTop;
        }
        if(scrollTop > starty){
          // Start shrinking
          shrinkAmt = headerHeight - Math.max(0, (starty + headerHeight) - scrollTop);
          shrink(header, $element[0], shrinkAmt, headerHeight);
        } else {
          shrink(header, $element[0], 0, headerHeight);
        }
      });
    }
  }
});

app.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $ionicHistory, $ionicGesture, $window, $interval) {

  // OPEN & CLOSE MENU
  $ionicModal.fromTemplateUrl('menu.html', {
    scope: $scope,
    animation: 'slide-in-left'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openMenu = function() {
    $scope.modal.show();
  };

  $scope.closeMenu = function() {
    $scope.modal.hide();
  };

  var element = angular.element(document.querySelector('#eventPlaceholder'));
  $ionicGesture.on('swiperight', function() {
    $scope.modal.show();
  }, element);

  // $scope.lastEventCalled = 'Try to Drag the content up, down, left or rigth';
  // var element = angular.element(document.querySelector('#eventPlaceholder'));
  // var events = [{
  //   event: 'dragup',
  //   text: 'You dragged me UP!'
  // },{
  //   event: 'dragdown',
  //   text: 'You dragged me Down!'
  // },{
  //   event: 'dragleft',
  //   text: 'You dragged me Left!'
  // },{
  //   event: 'dragright',
  //   text: 'You dragged me Right!'
  // }];

  // angular.forEach(events, function(obj){
  //   $ionicGesture.on(obj.event, function (event) {
  //     $scope.$apply(function () {
  //       $scope.lastEventCalled = obj.text;
  //     });
  //   }, element);
  // });

  // HISTORY BACK
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  // POPUP AJOUT AU CARNET DE VOYAGE
  $scope.add = function() {
     var alertPopup = $ionicPopup.alert({
       // title: 'Don\'t eat that!',
       template: 'Cet élément a bien été ajouté à votre carnet de voyage'
     });
     alertPopup.then(function(res) {
       console.log('action after closing alert');
     });
   };

});
