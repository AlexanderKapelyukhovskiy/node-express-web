var axios = require('axios');
var xml2js = require('xml2js');

var parser = xml2js.Parser({explicitArray: false});

function goodreadsService() {
  function getBookById(bookId) {
    return new Promise(function(resolve, reject){
      var url = `https://www.goodreads.com/book/show/${bookId}.xml?key=sgidlTrK0Ou4aW1mJeo3pQ`;
      axios.get(url)
      .then(function(response){
        parser.parseString(response.data, function(error, result) {
          resolve(result.GoodreadsResponse.book);
        });
      })
      .catch(function(e){
        reject(e);
      });
    });
  }

  return {getBookById: getBookById}; 
}

module.exports = goodreadsService();