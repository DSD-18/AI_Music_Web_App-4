song1 = "";
song2 = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreLeftWrist = 0;
song_status_1 = "";
song_status_2 = "";

function preload()
{
    song1 = loadSound("music.mp3");
	song2 = loadSound("music2.mp3");
}

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
  }

function draw() {
	image(video, 0, 0, 600, 500);

	song_status_1 = song1.isPlaying();

	fill("#FF0000");
	stroke("#FF0000");

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);

			song1.stop();

		if(song_status_2 == false)
		{
			song2.play();
			document.getElementById("song").innerHTML = "Playing - Peter Pan Song"
		}
	}

}
function gotPoses(results)
{
	if(results.length > 0)
  {
	scoreLeftWrist =  results[0].pose.keypoints[9].score;	

    rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
  }
}