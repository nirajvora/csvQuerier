app.controller('PageController', [ '$scope', 'HTTPFactory', function ( $scope, HTTPFactory ) {
  $scope.sendQuery = function ( prod, empSize, score ) {
    var object = {
      product: prod,
      employeeSize: empSize,
      score: score
    }
    HTTPFactory.sendQuery(object);
  }


}]);