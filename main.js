//https://teachablemachine.withgoogle.com/models/r2AKRKU9J/

prediction = "";

Webcam.set({
    width:350,
    height: 300,
    image_format: "png",
    png_quality: 90
})

Webcam.attach("#camera");

function TakeImage(){
    Webcam.snap(function(data_uri){
        document.getElementById("picture").innerHTML = "<img id = 'result' src = '"+data_uri+"'>"
    })
}

console.log("ml5.version",ml5.version);


classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/r2AKRKU9J/model.json", modelLoaded);

function modelLoaded(){
    console.log("model ready");
}

function TakeAGuess(){
    img = document.getElementById("result");
    classifier.classify(img,gotResult);
}

function gotResult(error,result){
    if(error){
        console.log(error);
    }

    else{
        console.log(result);
        document.getElementById('emotion1').innerHTML = result[0].label;
        document.getElementById('emotion2').innerHTML = result[1].label;
        prediction = result[0].label;
        if(result[0].label == "Sad"){
            document.getElementById("emoji1").innerHTML = "&#128532;"

        }

        if(result[1].label == "Sad"){
            document.getElementById("emoji2").innerHTML = "&#128532;"
        }

        if(result[0].label == "Angry"){
            document.getElementById("emoji1").innerHTML = "&#128548;"
        }

        if(result[1].label == "Angry"){
            document.getElementById("emoji2").innerHTML = "&#128548;"
        }

        if(result[0].label == "Happy"){
            document.getElementById("emoji1").innerHTML = "&#x1F603;"
        }

        if(result[1].label == "Happy"){
            document.getElementById("emoji2").innerHTML = "&#x1F603;"
        }
        speak();
    }
}

function speak(){

    var synth = window.speechSynthesis;
    if(prediction == "Sad"){
        speakData = "Happiness can be found in the darkest of times, if one only remembers to turn on the light. From: Harry Potter and the Prisoner of Azkaban"
        

    }

    else if(prediction == "Angry"){
        speakData = "Here's a good question to ask you're self, why are you mad, right it down, on a piece of paper, look at it and think about it";
    }

    else{
        speakData = "Must feel good to be happy";
    }
    var utterThis = new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis);
}