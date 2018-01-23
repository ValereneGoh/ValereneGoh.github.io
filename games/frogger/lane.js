// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

/* Implements a Lane of the game
 *
 * y: represents the y-position of this Lane
 * count: The number of obstacles on this Lane
 * speed: How fast the obstacles move
 * obs_width: The width of the obstacles
 * spacing: The gap between the obstacles. This is measured from the left
 *          of the first obstacle to the left of the next.
 * offset: The x-coordinate of the first obstacle on the Lane
 * inverted: Represents if the frog dies when hit by an obstacle (false)  - car
 *           or if the frog dies when not hit by an obstacle (true)   -log / pavement
 */
function Lane(y, count, speed, obs_width, spacing, offset, inverted, img) {
  Rectangle.call(this, 0, y, width, grid_size);
  this.obstacles = [];
  this.inverted = inverted;
  for(var i = 0; i < count; i++) {
    var x = i * spacing + offset;
    this.obstacles.push(new Obstacle(x, y, obs_width, grid_size, speed, img));
  }
}

// Extend Rectangle.
Lane.prototype = Object.create(Rectangle.prototype);

// Shows this Lane, showing all obstacles on it.
Lane.prototype.show = function() {
  for(var i = 0; i < this.obstacles.length; i++) {
    this.obstacles[i].show();
  }
}

// Update all obstacles on this Lane.
Lane.prototype.update = function() {
  for(var i = 0; i < this.obstacles.length; i++) {
    this.obstacles[i].update();
  }
}

// Handle a collision with another Rectangle, collider (the frog).
// Calculates which obstacle, if any, the collider has intersected.
Lane.prototype.hits = function(collider) {
  var obstacle = null;
  //for every obstacle in that lane
  for(var i = 0; i < this.obstacles.length; i++) {
    if(collider.intersects(this.obstacles[i])) {
      obstacle = this.obstacles[i];
    }
  }
  return obstacle;
}