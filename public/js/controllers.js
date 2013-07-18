'use strict';
function ListCtrl($scope, $http, $route, $routeParams) {
  $scope.headers = ["name", "phone", "email", ""];
  $scope.form = {};
  $scope.columnSort = { sortColumn: 'name', reverse: false };

  $http.get('/api/contacts').
    success(function(data, status, headers, config) {
        $scope.contacts = data;
  });

  //Add contact
  $scope.add = function() {
    $scope.contactAdd = true;
  };
  
  $scope.closeAdd = function() {
    $scope.contactAdd = false;
  };

  $scope.addContact = function() {
    $http.post('/api/contact', $scope.form.add).success(function(data) {
      $scope.contactAdd = false;
      window.location.href = "/";
    })
  };
  //Edit Contact
  $scope.edit = function(id, name) {
    $scope.contactEdit = true;
    $scope.id = id;
    $scope.name = name;
    $http.get('/api/contact/' + id).
      success(function(data) {
        $scope.form.edit = data.contact;
        //$scope.contact = data.contact;
        
      });
      
  }

  $scope.closeEdit = function() {
    $scope.contactEdit = false;
  }

  $scope.editContact = function() {
    $http.put('/api/contact/' + $scope.id, $scope.form.edit).
      success(function(data) {
        $scope.contactEdit = false;
        window.location.href = "/";
      });
  };

  $scope.delete = function(id, name) {
    $scope.name = name;
    $scope.id = id;
    $scope.contactDelete = true;
  }

  $scope.closeDelete = function() {
    $scope.contactDelete = false;
  }


  $scope.deleteContact = function() {
    $http.delete('/api/contact/' + $scope.id).
      success(function(data) {
        $scope.contactDelete = false;
          window.location.href = "/";
      });
  };


  //View contact
  $scope.view = function(id) {
    $scope.allheaders = ["name", "phone", "email", "facebook", "twitter", "skype"];
    $scope.contactView = true;
    $http.get('/api/contact/' + id).
      success(function(data, status, headers, config) {
        if (data.status) {
          $scope.contact = data.contact;
        } else {
          $location.path('/');
        }
      });
  };

  $scope.closeView = function() {
    $scope.contactView = false;
  };
    
  $scope.opts = {
    backdropFade: true,
    dialogFade: true
  };
}