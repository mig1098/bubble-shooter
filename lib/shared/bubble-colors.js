function getRandomColor(self, context) {
  var colors = ['deeppink', 'navy', 'mediumslateblue', 'darkgreen', 'darkorange']

  var gradient = context.createRadialGradient(self.x, self.y, self.iRadius, self.x, self.y, self.oRadius);
  gradient.addColorStop(0, 'ivory');
  gradient.addColorStop(1, colors[Math.floor(Math.random()*colors.length)]);

  return gradient;
}

module.exports = getRandomColor;
