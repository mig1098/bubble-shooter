function drawBubble(self) {
  self.context.beginPath();
  self.context.arc(self.x, self.y, self.radius, self.sAngle, self.eAngle);

  self.context.fillStyle = self.color;
  self.context.fill();
}

module.exports = drawBubble;
