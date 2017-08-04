angular.module('CommitApp').controller('RepoCtrl', function($scope, $http) {
  $http({
    method: 'GET',
    url: 'http://localhost:8000/repos'
  }).then(function (response) {
    console.log(response.data.data);
    $scope.repos = response.data.data;
  });

  $scope.selectRepo = function(repo) {
    $http({
      method: 'POST',
      url: 'http://localhost:8000/repos',
      data: repo
    }).then(function (response) {
      console.log(response.data.data);
      $scope.repos = response.data.data;
    });
  };
});
