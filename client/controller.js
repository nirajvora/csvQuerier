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


  //rickshaw settings
  $scope.options = { renderer: 'scatterplot'}
  $scope.series = [{
                        name: 'Series 1',
                        color: 'steelblue',
                        data: [{x: 0, y: 23}, {x: 1, y: 15}, {x: 2, y: 79}, {x: 3, y: 31}, {x: 4, y: 60}]
                    }, {
                        name: 'Series 2',
                        color: 'lightblue',
                        data: [{x: 0, y: 30}, {x: 1, y: 20}, {x: 2, y: 64}, {x: 3, y: 50}, {x: 4, y: 15}]
                    }];
  $scope.features = {
                    palette: 'colorwheel'
                };

}]);