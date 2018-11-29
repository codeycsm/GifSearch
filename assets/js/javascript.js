let topics = ["popular", "fails", "trending", "science", "technology", "lol"];
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
    } else {
      topic = $(this).text();
    }
    rating = $("#rating").val();
    gifQuantity = parseInt($("#quantity").val());
    $("#input").val("");
    gifSearch(topic);
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
          title: data.data[i].title,
          rating: data.data[i].rating
        });
        $("#results").append(
          "<div class='card mx-auto mb-2'>" +
            "<img class='card-img-top' src='" +
            gifArray[i].stillImage +
            "'/>" +
            "<div class='card-body p-0 bg-dark text-white'>" +
            "<p class='card-text py-2 pl-1'>Rating: " +
            gifArray[i].rating.toUpperCase() +
            "<a href='" +
            gifArray[i].gif +
            "' download target='_blank'>" +
            "<i class='fas fa-download float-right mr-2 mt-1 text-white'></i>" +
            "</a>" +
            "</p>" +
            "</div>" +
            "</div>"
        );
      }
    }
    playGif();
    downloadGif();
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

// function downloadGif() {
//   $("i").on("click", function() {
//     for (let i = 0; i < gifArray.length; i++) {
//       if (
//         $(this)
//           .parents(".card")
//           .children()
//           .attr("src") === gifArray[i].stillImage ||
//         $(this)
//           .parents(".card")
//           .children()
//           .attr("src") === gifArray[i].gif
//       ) {
//         console.log("index: " + i);
//         window.open(gifArray[i].gif, "_blank");
//       }
//     }
//   });

//   console.log(
//     $(this)
//       .parents(".card")
//       .children()
//       .attr("src")
//   );
// }
