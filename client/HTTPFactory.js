app.factory('HTTPFactory', [ '$http', '$rootScope', function ( $http, $rootScope ) {

var sendQuery = function( dataObject ) {
  return $http({
    method: 'POST',
    url: '/query',
    data: dataObject
  }).then(function ( res ) {
    console.log(res.data);
    $rootScope.$broadcast( 'data', res.data);
  }).catch(function ( err ) {
    if(err) { throw err; };
  });
}

return {
  sendQuery: sendQuery
}

}]);