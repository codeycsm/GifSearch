$(document).ready(function() {
  displayTopics();

  $("#submit").on("click", function() {
    gifArray = [];
    topic = $("#input").val();
    topics.push(topic);
    displayTopics();
    gifSearch();
  });
  $(".topic").on("click", function() {
    gifArray = [];
    topic = $(this).text();
    gifSearch();
  });

  // $("button").on("click", function() {
  //   gifArray = [];
  //   if ($(this).attr("id") === "submit") {
  //     topic = $("#input").val();
  //     topics.push(topic);
  //     displayTopics();
  //     gifSearch(topic);
  //   } else {
  //     topic = $(this).text();
  //     gifSearch();
  //   }
  // });
});

let topics = ["cats", "kids", "dogs", "bears", "science", "technology"];
let topic = "";
let gifApi;
let gifArray = [];

function displayTopics() {
  $("#topics").empty();
  for (let i = 0; i < topics.length; i++) {
    let button =
      "<button class='btn btn-outline-info mx-1 my-2 topic'>" +
      topics[i] +
      "</button>";
    $("#topics").append(button);
  }
}

function gifSearch() {
  $("#results").empty();
  gifApi = $.get(
    "https://api.giphy.com/v1/gifs/search?q=" +
      topic +
      "&api_key=UhZuFiLPyyuHkohtSQksy7fnPCmN6Fdb&limit=10"
  );
  gifApi.done(function(data, status) {
    if (!status) {
      $("#results").html(
        "<h1>There was a problem connecting to the server</h1>"
      );
    } else {
      //console.log("Data Object:", data);
      // console.log("Status: ", status);
      for (let i = 0; i <= data.data.length - 1; i++) {
        gifArray.push({
          stillImage: data.data[i].images.fixed_width_small_still.url,
          gif: data.data[i].images.fixed_width_small.url
        });
        $("#results").append(
          "<img class='img-responsive mx-2 my-2' src='" +
            gifArray[i].stillImage +
            "'/>"
        );
      }
    }
    playGif();
  });
}

function playGif() {
  $("img").on("click", function() {
    for (let i = 0; i < gifArray.length; i++) {
      if ($(this).attr("src") === gifArray[i].stillImage) {
        $(this).attr("src", gifArray[i].gif);
      } else if ($(this).attr("src") === gifArray[i].gif) {
        $(this).attr("src", gifArray[i].stillImage);
      }
    }
  });
}
