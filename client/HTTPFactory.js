app.factory('HTTPFactory', [ '$http', function ( $http ) {

var sendQuery = function( dataObject ) {
  return $http({
    method: 'POST',
    url: '/query',
    data: dataObject
  }).then(function ( res ) {
    console.log(res);
  });
}

return {
  sendQuery: sendQuery
}

}]);