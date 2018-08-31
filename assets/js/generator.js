//jQuery on doc ready
$(document).ready(function() {

//create buttons array to store keyword input buttons
//put a few in to start
  var topics = ["penguins", "zebras", "cool cats", "good dogs", "flying pigs", "unladen swallows", "killer rabbits"];


  //take topics array and form into buttons - use a for loop - jquery .map!
  function genButtons() {
    $("#buttons").html(topics.map(function (btnItems) {
      return ("<button class='gifGen' data-topic='" + btnItems +"'>" + btnItems + '</button>');
    }).join(" "));
  }

  genButtons();

  //on click gif button, send ajax req, grab json data and get 10 static images from giphy API
  $("#buttons").on("click", ".gifGen", function() {
    //clear previous gif results
    $("#gif-dump").empty();

    var gifTopic = $(this).attr("data-topic");
    console.log(gifTopic);

    // giphy api url
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      gifTopic + "&limit=10&api_key=dc6zaTOxFJmzC&limit=10";

    // ajax request from giphy url
    $.ajax({
      url: queryURL,
      method: "GET"
    })
       //promise
      .then(function(response) {
        //dig into json data
        var results = response.data;

        //loop gif divs for length of results (forced to 10 with limit parameter)
        for (var i = 0; i < results.length; i++) {

          var div = $("<div>");

          var p = $("<p>").text("Rating: " + results[i].rating);

          var gifImg = $("<img class='gif' data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "' data-state='still'>");
          gifImg.attr("src", results[i].images.fixed_height_still.url);
          //jQuery html output
          div.append(gifImg);
          div.append(p);
          $("#gif-dump").append(div);
        }
      });
  });

  //on click toggle change data-state animate/still
  $("#gif-dump").on("click", "img", function() {


    var state = $(this).attr("data-state");

    //changes data-state and updates img src
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });


  //on click submit new gif button name into topics array and regen buttons
  $(".gif-form").on("click", "#submit-gif", function(e) {
    e.preventDefault();

    // get user input
    var gif = $("#gif-input").val().trim();

     //push user input to topics array
     topics.push(gif);

    //regen buttons
    genButtons();
  });

}); //end on doc ready


























//function to get text in textbox on submit to create buttons with that text

//need event listener for when the input button is clicked to add to array


//function to display 10 giphy clicks when certain button is clicked (get data from button)


//function to stop and start animation of gif on gif click, use data-state to tell if its animated or not




//remember to get gif ratings at some point

//query results i need are : topic = q , # of images to pull (10) = limit, and rating (to put underneath the gif)


