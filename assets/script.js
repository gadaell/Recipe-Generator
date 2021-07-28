//Global Variables:
var apiKey = "apiKey=6e8a92552104438f980149e4f5829086";
var apiKey2 = "apiKey=c3283e8f374c4709a08d9c074a13d89f";
var ingTextInput = document.getElementById("ing-input");
//Variable for saved recipe button
var savedButtonEl = document.getElementById("saved-btn");
//Event listener to go to saved recipe page.
//savedButtonEl.addEventListener("click");
var saveRecButtonEl = document.getElementById("sav-rec-btn");
//variable for the quote element.
var quoteOfTheDayEl = document.getElementById("quote-of-the-day");

//Variable for Submit Button Element.
var submitButtonEl = document.getElementById("submit-btn");
//Event Listener for submitButtonEl variable to call getIngTextInput Function.
submitButtonEl.addEventListener("click", getIngTextInput);
// submitButtonEl.addEventListener("click", getRecipe);

//Event Listener for saveRecButtonEl.
saveRecButtonEl.addEventListener("click", saveRecipe);

//Function to capture the searchedIngs as the "ingredients" argument for the
//Function to capture Text Input and save that to a local variable searchedIngs
function getIngTextInput(e) {
  e.preventDefault();
  var searchedIngs = ingTextInput.value.trim();
  //capturing the searchedIngs and passing that as the argument
  //for the getRecipe function.
  getRecipe(searchedIngs);
}

// api fetch to get the recipe for the ingredients list.
function getRecipe(ings) {
  console.log("Test " + ings);
  fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?${apiKey2}&ingredients=${ings}&number=1`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data);
      // drilled down the data to get the recipe name (title) and saved that to the local var recName.
      var recName = data[0].title;
      //console.log(data);
      console.log(data[0].title);
      console.log(recName);
      //console.log(recName);
      //writes the recName to the HTML:
      document.getElementById("recipe-name").innerHTML = recName;
      // drilled down the data to get the recipe id (id) and saved that to the local var recId.
      var recId = data[0].id;
      console.log(recId);
      //pushing the recId to the getRecipeCard function as the argument.
      getRecipeCard(recId);
      //Call the getRecipeCard Function
    });
}

function getRecipeCard(recId) {
  // api call to get the recipe card URL
  fetch(`https://api.spoonacular.com/recipes/${recId}/card?${apiKey2}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data);
      //console.log(data.url);
      var recCardURL = data.url;
      //created variable html elment to get the recCardPicEl
      var recCardPicEl = document.getElementById("recImg");
      //set the img source as the recCardURL.
      recCardPicEl.src = recCardURL;
      //  removed the "hide" class so that the image will show when the recipe is searched.
      recCardPicEl.removeAttribute("class", "hide");
      saveRecButtonEl.removeAttribute("class", "hide");
    });
}
// Second API (function to get the data from the api (quotes)).
function getQuotes() {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data);
      var apiQuotes = data;
      //created for loop to loop over the array of objects and get the text from them.
      var randomQuoteArray = [];
      for (var i = 0; i < apiQuotes.length; i++) {
        // combined the quote (data.text) and the author (data.author) and saved that as a variable.
        var quotesAndAuthors = JSON.stringify(
          data[i].text + " - " + data[i].author
        );
        // This pushes the quotesAndAuthors into an array called randomQuoteArray
        randomQuoteArray.push(quotesAndAuthors);
      }
      //created randomQuote variable using the randomQuoteArray and the Math.random array method
      //to pull out a random quote of the array.
      var randomQuote =
        randomQuoteArray[Math.floor(Math.random() * randomQuoteArray.length)];
      //the pushes the randomQuote variable as the argument for the displayRandomQuote Function.
      displayRandomQuote(randomQuote);
    });
}
// This function takes the random quote and writes it to the page.
function displayRandomQuote(randomQuoteData) {
  console.log(randomQuoteData);
  quoteOfTheDayEl.innerHTML = randomQuoteData;
}

//functions that run when the page is loaded.
window.onload = function () {
  getQuotes();
  displayRandomQuote();
};

//function to save the recipe.
function saveRecipe() {
  console.log("You clicked a button");
}