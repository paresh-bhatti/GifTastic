
 //Initial array of cocktails

var cocktails = ['Margarita', 'Bloody Mary', 'Cosmopolitan'];

// Function for displaying cocktail data 
function renderButtons() {

    // Deletes the cocktails prior to adding new cocktails (this is necessary otherwise you will have repeat buttons)
    $('#cocktailButtons').empty();

    // Loops through the array of cocktails
    for (var i = 0; i < cocktails.length; i++) {

        // Dynamicaly generates buttons for each cocktail in the array

        var a = $('<button>'); // jQuery needs to create the beginning and end tag. (<button></button>)
        a.addClass('cocktail'); // Added a class 
        a.addClass('btn btn-primary btn-xs');
        a.attr('data-name', cocktails[i]); // Added a data-attribute
        a.text(cocktails[i]); // Provided the initial button text
        $('#cocktailButtons').append(a); // Added the button to the HTML
        
    }
}

// This function handles events where one button is clicked
$('#addButton').on('click', function () {

    // This line of code will grab the input from the textbox
    var cocktail = $('#gif-input').val().trim();

    // The cocktail from the textbox is then added to our array
    cocktails.push(cocktail);

    // Our array then runs which handles the processing of our cocktail array
    renderButtons();
    
})

// The next section performs the search and returns the GIFs

// function to display gifs
function displayGifs() {

    var cocktail = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cocktail + "&api_key=DqlYmNkN90K2wrMyd7HS406fNfcNJP3E&limit=10";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (response) {

            console.log(queryURL);

            console.log(response.data); 

            var results = response.data; // saves results as a variable

			$('#gifView').empty();
			
            for (var i = 0; i < results.length; i++) {

                var cocktailDiv = $('<div class=gifs>');

                var rating = results[i].rating;
                var p = $('<p>').text("Rating: " + results[i].rating);
                cocktailDiv.append(p);

                var cocktailImage = $('<img>');

                cocktailImage.attr('src', results[i].images.fixed_height_still.url);
                cocktailImage.attr('title', 'Rating: ' + results[i].rating);
                cocktailImage.attr('data-still', results[i].images.fixed_height_still.url);
                cocktailImage.attr('data-state', 'still'); 
                cocktailImage.addClass('gif');
                cocktailImage.attr('data-animate', results[i].images.fixed_height.url);
                
                cocktailDiv.append(cocktailImage);

                $('#gifView').prepend(cocktailDiv);

            }

        });
    }
// The next section should allow for pausing and unpausing of the GIFs

$(document).on('click', '.gif', function () {
 

        var state = $(this).attr('data-state');
    
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        };
    
    });

    $(document).on("click", ".cocktail", displayGifs); 
//initially calls the makeButtons function
        renderButtons();
