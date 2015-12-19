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
    chartData = [];

    $scope.data.forEach(function(company, index) {
      chartData.push({x: company.EmployeeCount, y: company.Scored})
    });
    console.log(chartData);

  $scope.series = [{
                        name: 'Series 2',
                        data: chartData
                    }];


  });
  $scope.data = [];
  var chartData = [];

  $scope.predicate = 'Company';
  $scope.reverse = false;
  $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };


  //rickshaw settings
  $scope.options = { renderer: 'scatterplot'}
  $scope.series = [{
                        name: 'Series 2',
                        data: chartData
                    }];
  $scope.features = {
                    yAxis: {
                        tickFormat: 'formatKMBT'
                    },
                    xAxis: {
                        tickFormate: 'numeric'
                      }
                };

}]);