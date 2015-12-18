app.controller('PageController', [ '$scope', 'HTTPFactory', function ( $scope, HTTPFactory ) {

  $scope.sendQuery = function ( prod, empSize, score ) {
    var object = {
      product: prod,
      employeeSize: empSize,
      score: score
    }
    HTTPFactory.sendQuery(object);
  }

  $scope.$on('data', function ( event, data ) {
    $scope.data = data;
  });
  $scope.data = [];

  $scope.predicate = 'Company';
  $scope.reverse = false;
  $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };

}]);