Date.prototype.minusHours = function (h) {
  this.setHours(this.getHours() - h);
  return this;
};
