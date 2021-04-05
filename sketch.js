var dog;
var happyDogImage, hungryDogImage;
var foodS, foodStock;

var database;

function preload() {
	happyDogImage = loadImage("images/dogImg1.png");
  hungryDogImage = loadImage("images/dogImg.png");
  BowlImage = loadImage("images/milk.png")
}

function setup() {
	createCanvas(650, 600);
  database = firebase.database();

  dog = createSprite(325,400,20,20);
  dog.addImage(hungryDogImage);
  dog.scale = 0.25;
  

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(20);

}


function draw() {  
  background(46, 139, 87);
  if(foodS > 0){
  fill(0);
  textSize(24);
  text("Note: Long press up arrow key to feed the puppy Milk! ",50,50);
  text("Food remaining: "+foodS,225,150);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
    Bowl = createSprite(220,450,20,20);
    Bowl.addImage(BowlImage);
    Bowl.scale = 0.25;
  }
  if(keyWentUp(UP_ARROW)){
    dog.addImage(hungryDogImage);
    Bowl.visible = false;
  } 
}
if(foodS === 0 ){
  background(46, 139, 87);
  fill(0);
  textSize(24);
  text("Good job on feeding the puppy!",150,150);
  dog.addImage(happyDogImage);
}
  drawSprites();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
if(x<=0){
    x = 0;
}else{
    x = x-1
}

  database.ref("/").update({
    Food: x
  })
}
