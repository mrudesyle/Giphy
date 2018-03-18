// create an of strings (star wars characters)
var arrWars = ["Luke Skywalker", "Rey", "Hans Solo", "Princess Leia", "Kylo Ren", "Darth Vader", "Jabba the Hutt", "R2-D2"];

// create a loop that appends a button for each string in the array.
function renderButtons() {
    $("#buttons-view").empty();
    // $("#giphy-view").empty();
    for (var i = 0; i < arrWars.length; i++) {
        var b = $("<button>");
        b.addClass("sw-btn btn btn btn-primary");
        b.attr("data-name", arrWars[i]);
        b.text(arrWars[i]);
        $("#buttons-view").append(b);
    }
}

//define button click for each button created from the array
// Grab the data attribute of the instance (this) when the user clicks on a button
$("#buttons-view").on("click", ".sw-btn", function () {
    // $("#giphy-view").empty();
    var btnDataName = $(this).attr("data-name");
    //define variables for giphy API string
    var query = "https://api.giphy.com/v1/gifs/search?q=";
    var apiKey = "&api_key=FkxfMBLOlHdrFsHyijGqcKxV9X5Enjwp";
    //define Giphiy api with key:
    var queryURL = query + btnDataName + apiKey;

    // Create an AJAX call for the specific button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // create variable to hold response data from AJAX call
        var queryResults = response.data;
        // console.log(queryResults);

        //loop through the results and fetch 10 rows only
        for (i = 0; i < 10; i++) {
            //set the rating to a variable
            var rating = "Rating: " + queryResults[i].rating;
            // console.log(rating)
            //add rating to a paragraph tag
            var heading = $("<h5>").text(rating);
            //define image tag
            var useTheForceImage = $("<img>");

            //set variables for gifs
            var animated = queryResults[i].images.fixed_height.url;
            var still = queryResults[i].images.fixed_height_still.url;


            //attach attributes for the gif
            useTheForceImage.attr("src", still);
            useTheForceImage.attr("data-state", "still");
            useTheForceImage.attr("data-animate", animated);
            useTheForceImage.attr("data-still", still);


            // Under every gif, display its rating (PG, G, so on).
            $("#giphy-view").prepend(heading);
            //finally, append the image to our div
            $("#giphy-view").prepend(useTheForceImage);

        }
    });
})

//Animate the gif on user click
//If the user clicks the gif again, it should stop playing.
$("#giphy-view").on("click", "img", function () {
    //get state of the current instance of image
    var imgState = $(this).attr("data-state");

    if (imgState === "still") {

        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

    } else {
        $(this).attr("src", $(this).attr("data-still"));

        $(this).attr("data-state", "still");

    }
})

// Function to add a new character on Use The Force Button click
$("#add-a-nerd").on("click", function (event) {
    // prevent the form from trying to submit itself.
    event.preventDefault();
    //get the user input value
    var beamMeUp = $("#nerd-input").val().trim();
    //push new character string to the array
    arrWars.push(beamMeUp);
    // Call render button function to re-load buttons from array
    renderButtons();
});

// Calling the renderButtons function to display the intial buttons
renderButtons();