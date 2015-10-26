function getRandomColor(self, context) {
  var colors = ['deeppink', 'navy', 'mediumslateblue', 'darkgreen', 'darkorange']
  return colors[Math.floor(Math.random()*colors.length)];
}

module.exports = getRandomColor;
