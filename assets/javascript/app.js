var APIKey = "TYdFsSj1Cf8l9pxOplfF9HNdWiN03wpo";
            var topics = ["turtles", "beaches", "cats", "margarita", "shopping", "cats", "swimming", "flirty", "rihanna", "puppies"];
            // displayTopicInfo function re-renders the HTML to display the appropriate content
            function displayTopicInfo() {
                var topic = $(this).attr("data-name");
                var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + (topic) + "&limit=10&offset=0&rating=G&lang=en";
                console.log(queryURL);
                // Creating an AJAX call for the specific topic button being clicked
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    for (var j = 0; j < 9; j++) {
                        console.log(response)
                        // Creating a div to hold the topic
                        var topicDiv = $("<div>");
                        topicDiv.addClass("col-md-4 img-responsive");
                        // Storing the rating data
                        var rating = response.data[j].rating;
                        console.log(rating)
                        // Creating an element to have the rating displayed
                        var pOne = $("<p>").text("Rating: " + rating);
                        // Displaying the rating
                        topicDiv.append(pOne);
                        // Retrieving the URL for the image

                        // var imgURL = response.data[j].images.downsized_still.url;
                        var imgURL = response.data[j].images.fixed_width_still.url;
                        
                        // Creating an element to hold the image
                        var image = $("<img>").attr("src", imgURL);
                        image.addClass("img-responsive topic");

                        // image.attr("data-still", response.data[j].images.downsized_still.url);
                        image.attr("data-still", response.data[j].images.fixed_width_still.url);

                        // image.attr("data-animate",response.data[j].images.downsized.url);
                        image.attr("data-animate",response.data[j].images.fixed_width.url);

                        image.attr("data-state","still")
                        // Appending the image
                        topicDiv.append(image);
                        // Putting the topic above the previous topics
                        $("#topics-view").prepend(topicDiv);
                    }
                });
            }
            // Function for displaying topics data
            function renderButtons() {
                // Deleting the topics prior to adding new topics
                // (this is necessary otherwise you will have repeat buttons)
                $("#buttons-view").empty();
                // Looping through the array of topics
                for (var i = 1; i < topics.length; i++) {
                    // Then dynamicaly generating buttons for each topic in the array
                    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
                    var a = $("<button>");
                    // Adding a class of topic-btn to our button
                    a.addClass("topic-btn");
                    // Adding a data-attribute
                    a.attr("data-name", topics[i]);
                    // Providing the initial button text
                    a.text(topics[i]);
                    // Adding the button to the buttons-view div
                    $("#buttons-view").append(a);
                }
            }
            // This function handles events where a topic button is clicked
            $("#add-topic").on("click", function (event) {
                event.preventDefault();
                // This line grabs the input from the textbox
                var topic = $("#topic-input").val().trim();
                // Adding topic from the textbox to our array
                topics.push(topic);
                // Calling renderButtons which handles the processing of our topic array
                renderButtons();
            });
            // Adding a click event listener to all elements with a class of "topic-btn"
            $(document).on("click", ".topic-btn", displayTopicInfo);
            // Calling renderButtons which handles the processing of our topics array
            renderButtons();

            $(document).on("click",".topic",function(){
                var state = $(this).attr("data-state");

                if(state==="animate"){
                    $(this).attr("src",$(this).data("still"));
                    $(this).attr("data-state","still");
                }
                if(state==="still"){
                    $(this).attr("src",$(this).data("animate"));
                    $(this).attr("data-state","animate");
                }
            })