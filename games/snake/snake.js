function Snake(head_img, body_img, tail_img){
  this.head_img = head_img;
  this.body_img = body_img;
  this.tail_img = tail_img;
  this.headangle = 0;
  this.tailangle = 0;
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 2;
  this.tail = [];    //stores all vector (xy position) of snake's tail
  //create snake tip
  this.tail[0] = createVector(this.x - 2 * grid_size, this.y);
  //create a tail body
  this.tail[1] = createVector(this.x - grid_size, this.y);

  this.move = function(x, y){
    this.xspeed = x;
    this.yspeed = y;
    if(y === -1){             //up
      this.headangle = -90;
    } else if(y === 1){       //down
      this.headangle = 90;
    } else if(x === -1){      //left
      this.headangle = 180;
    } else if(x === 1){       //right
      this.headangle = 0;
    }
  }
  
  this.eat = function(food){
    var d = dist(this.x, this.y, food.x, food.y);
    if(d === 0){
      this.total++;
      return true;
    } else{
      return false;
    }
  }

  this.dies = function(){
    for(var i = 0; i < this.tail.length; i++){
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if(d === 0){
        // this.total = 0;
        // this.tail = [];
        return true;
      }
    }
    return false;
  }

  this.update = function(){
    //if snake is not growing
    if(this.total === this.tail.length){
      //shift all tail elements of snake forward by one step
      for(var i = 0; i < this.tail.length - 1; i++){
        this.tail[i] = this.tail[i + 1];
      }
    }
    //create a new snake head
    this.tail[this.total - 1] = createVector(this.x, this.y);

    //move the snake
    this.x = this.x + this.xspeed * grid_size;
    this.y = this.y + this.yspeed * grid_size;

    //keep snake within boundary
    this.x = constrain(this.x, 20, width - 20 - grid_size);
    this.y = constrain(this.y, 20, height - 20 - grid_size);
  }

  this.show = function(){
    // fill('rgb(0,255,0)');
    
    //draw snake body
    for(var i = 1; i < this.tail.length; i++){
      // rect(this.tail[i].x, this.tail[i].y, grid_size, grid_size);
      this.body_img.resize(grid_size, grid_size);
      image(this.body_img, this.tail[i].x + grid_size/2, this.tail[i].y + grid_size/2);
    }

    //check position of second last tail relative to tail tip
    if((this.tail[1].y - this.tail[0].y) === -grid_size){           //up
      this.tailangle = -90;
    } else if((this.tail[1].y - this.tail[0].y) === grid_size){    //down
      this.tailangle = 90;
    } else if((this.tail[1].x - this.tail[0].x) === -grid_size){    //left
      this.tailangle = 180;
    } else if((this.tail[1].x - this.tail[0].x) === grid_size){    //right
      this.tailangle = 0;
    }
    //draw snake tail
    push();
    translate(this.tail[0].x + grid_size/2, this.tail[0].y + grid_size/2);
    rotate(this.tailangle);
    this.tail_img.resize(grid_size, grid_size);
    image(this.tail_img, 0, 0);
    pop();

    //draw snake head
    // rect(this.x, this.y, grid_size, grid_size);
    push();
    translate(this.x + grid_size/2, this.y + grid_size/2);
    rotate(this.headangle);
    this.head_img.resize(grid_size, grid_size);
    image(this.head_img, 0, 0);
    pop();
  }
}