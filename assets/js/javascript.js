let topics = [
  "cats",
  "kids",
  "dogs",
  "Popular",
  "science",
  "technology",
  "LOL"
];
let topic = "";
let gifQuantity = 10;
let rating;
let gifApi;
let gifArray = [];

$(document).ready(function() {
  displayTopics();

  $("#buttonContainer").on("click", "button", function() {
    if ($(this).attr("id") === "submit") {
      topic = $("#input").val();
      topics.push(topic);
      displayTopics();
      console.log("custom search");
    } else {
      console.log("button clicked not search");
      topic = $(this).text();
    }
    rating = $("#rating").val();
    gifQuantity = parseInt($("#quantity").val());
    $("#input").val("");
    gifSearch(topic);
    console.log(topic);
  });
});

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

function gifSearch(topic) {
  gifArray = [];
  $("#results").empty();
  gifApi = $.get(
    "https://api.giphy.com/v1/gifs/search?q=" +
      topic +
      "&api_key=UhZuFiLPyyuHkohtSQksy7fnPCmN6Fdb&limit=" +
      gifQuantity +
      "&rating=" +
      rating
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
          stillImage: data.data[i].images.original_still.url,
          gif: data.data[i].images.original.url,
          rating: data.data[i].rating
        });
        $("#results").append(
          "<div class='card mx-2 mb-2'>" +
            "<img class='card-img-top' src='" +
            gifArray[i].stillImage +
            "'/>" +
            "<div class='card-body p-0 bg-dark text-white'>" +
            "<p class='card-text py-1 pl-1'>Rating: " +
            gifArray[i].rating.toUpperCase() +
            "</p>" +
            "</div>" +
            "</div>"
        );
      }
    }
    console.log(gifArray);
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
