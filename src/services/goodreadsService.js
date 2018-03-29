 function goodreadsService() {
  function getBookById() {
    return new Promise(function(resolve, reject){
      resolve({description: 'our description'});
    });
  }

  return {getBookById: getBookById}; 
}

module.exports = goodreadsService();