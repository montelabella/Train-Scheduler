

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBbmfKlPHG-SnZZLvmlqZiQcBGFf4pCLgc",
    authDomain: "montelabella-project.firebaseapp.com",
    databaseURL: "https://montelabella-project.firebaseio.com",
    projectId: "montelabella-project",
    storageBucket: "montelabella-project.appspot.com",
    messagingSenderId: "354671077570"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  //Grabs users input
  $("#addTrainBtn").on("click",function(event){
      event.preventDefault();
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destInput").val().trim();
      var firstTrain = $("#firstTrainInput").val().trim();
      var frequency = $("#freqInput").val().trim();

  //holds train data
  var newTrain = {
      name: trainName,
      dest: destination,
      first: firstTrain,
      freq: frequency
  }  
  //uploads data to database
  database.ref().push(newTrain);
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.first);
  console.log(newTrain.freq);
  
  //clears text boxes
  $("#trainNameInput").val("");
  $("#destInput").val("");
  $("#firstTrainInput").val("");
  $("#freqInput").val("");

  return false;
  });

  //creating firebase event for adding trains to database
  database.ref().on("child_added", function(childSnapshot){

    //variables to store in
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var firstTrain = childSnapshot.val().first;
    var frequency = childSnapshot.val().freq;

    //Train Data
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    //time (this code was given to me by tutor)
    var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1,"years");
    console.log(firstTimeConverted);

    //current time
    var currentTime = moment();
    console.log("CURRENT IME:" + moment(currentTime).format("HH:mm"));

    //difference in times
    var diffTime = moment().diff(moment(firstTimeConverted),"minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    //time apart
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    //min util train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    //next train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination 
     + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  });

