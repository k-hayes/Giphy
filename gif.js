 $("button").on("click", function() {
      var rickMorty = ["Rick Sanchez", "Morty Smith", "Summer Smith", "Mr. Poopybutthole"];
      var addRickMorty = $(this).attr("data-name");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        rickAndMorty + "&api_key157eecb59ed94ead98fd9c0546b96222";

function renderButtons() {
   $("#buttons-view").empty();
    for (var i = 0; i < rickAndMorty.length; i++) {
        // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
      // Adding a class of movie to our button
      a.addClass("movie");
        // Adding a data-attribute
        a.attr("data-name", rickAndMorty[i]);
        // Providing the initial button text
      a.text(movies[i]);
      // Adding the button to the buttons-view div
         $("#buttons-view").append(a);
    }
  }

        // This function handles events where a movie button is clicked
      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var movie = $("#movie-input").val().trim();
        // Adding movie from the textbox to our array
        movies.push(movie);
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });
      // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".movie", displayMovieInfo);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var rickAndMorty = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
    });