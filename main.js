objects = [];
status = "";


function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380)
    video.hide();
}

function draw(){
    image(video, 0, 0, 480, 380);
if(status != ""){
    objectDetector.detect(video, gotResult);
    for(i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status : objects Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are : "+objects.length;

        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y);
        noFill();
        stroke("FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    if(objects[i].label == object_name){
       video.stop();
       objectDetector.detect(gotResult);
       document.getElementById("status").innerHTML = object_name + " found ";
       synth = window.speechSynthesis;
       utterthis = new SpeechSynthesisUterrance(object_name + " found ");
       synth.speak(utterthis);
    } else{
        document.getElementById("status").innerHTML = object_name + "not found";
    }
    }
}

}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("text_input").value;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results){
if(error){
    console.log(error);
}
console.log(results);
objects = results;
}