// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

/* Implements a rectangle for testing collisions.
 *
 * x: left side x position
 * y: top side y position
 * w: width of this Rectangle
 * h: height of this Rectangle
 */
function Rectangle(x, y, w, h, img) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.img = img;
}

// Check intersection with any other Rectangle object.
Rectangle.prototype.intersects = function(other) {
  return !(
    this.x + this.w  <= other.x            ||   //this is on the left
    this.x           >= other.x + other.w  ||   //this is on the right
    this.y + this.h  <= other.y            ||   //this is below
    this.y           >= other.y + other.h       //this is above
  );
}

// Moves this rectangle by the provided x and y distances.
Rectangle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
}

// Simple display of any rectangle
Rectangle.prototype.show = function() {
  // rect(this.x, this.y, this.w, this.h);
  this.img.resize(this.w, this.h);
  image(this.img, this.x, this.y);
}
