const c = console;

function findGenres(obj) {

  var resArr = []
  var contagem = [];
  console.log(obj.items.length)

  for(var i = 0; i < obj.items.length; i++){
      for (var j = 0; j < obj.items[i].genres.length; j++){
          resArr.push(obj.items[i].genres[j]) }
      
  }

  var occurrences = resArr.reduce((acc, curr) => {
      return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {});

  var favoriteGenre = Object.keys(occurrences).filter(x => occurrences[x] === Math.max(...Object.values(occurrences)));

  return favoriteGenre[0]
}

export default { findGenres };