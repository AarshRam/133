img = "";

status = "";

objects = [];

function setup() {
    canvas = createCanvas(640, 450);
    canvas.center();
    objectDetector = ml5.objectDetector('cocoSsd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function preload() {
    img = loadImage('dog_cat.jpg');
}

function modelLoaded() {
    console.log("Model is loaded");
    status = true;
    objectDetector.detect(img, gotresult);
}

function gotresult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;

}

function draw() {
    image(img, 0, 0, 640, 450);
    if (status != "") {
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detection";
            fill("#f20f6d");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("#f20f6d");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
        
    }
}