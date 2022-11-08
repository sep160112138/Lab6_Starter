// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.
  let rcps = localStorage.getItem('recipes');
  //console.log(typeof(rcps));
  let arr = [];
  
  
  if (!rcps) {
    return arr;
  }
  let strarr = [];
  rcps = rcps.slice(1, rcps.length - 2);
  //console.log(rcps);
  //console.log(`${rcps}`);
  strarr = rcps.split('}');
  arr = strarr;
  for (let i = 0; i < arr.length; i++) {
    //console.log(arr[i]);
    strarr[i] = arr[i] + '}';
    if (i != 0) {
      strarr[i] = arr[i].slice(1);
    }
    if (i != arr.length - 1) {
      strarr[i] = arr[i].slice(0, rcps.length - 1);
    }
    //console.log('i = ' + `${i}`+ ', ' + `${arr[i]}\n`);
    arr[i] = JSON.parse(strarr[i]);
    //console.log(typeof(arr[i]));
  }
  return arr;
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. TODO - Get a reference to the <main> element
  let ref = document.querySelector('main');
  // A11. TODO - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>
  for (let i = 0; i < recipes.length; i++) {
    let newEl = document.createElement('recipe-card');
    newEl.data = recipes[i];
    ref.append(newEl);
  }
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  let finalStr = JSON.stringify(recipes);
  console.log(finalStr);
  localStorage.setItem('recipes', finalStr);
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  // B2. TODO - Get a reference to the <form> element
  let form = document.getElementById('new-recipe');
  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  form.addEventListener('submit', function () {
  // Steps B4-B9 will occur inside the event listener from step B3
  // B4. TODO - Create a new FormData object from the <form> element reference above
    let formData = new FormData(form);
  // B5. TODO - Create an empty object (I'll refer to this object as recipeObject to
  //            make this easier to read), and then extract the keys and corresponding
  //            values from the FormData object and insert them into recipeObject
    let recipeObject = {};
    formData.forEach(function(value, key){
      recipeObject[key] = value;
    });
  // B6. TODO - Create a new <recipe-card> element
    let newEl = document.createElement('recipe-card');
  // B7. TODO - Add the recipeObject data to <recipe-card> using element.data
    console.log(recipeObject);
    newEl.data = recipeObject;
  // B8. TODO - Append this new <recipe-card> to <main>
    document.querySelector('main').append(newEl);
  // B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
  //            then save the recipes array back to localStorage
    let recipes = getRecipesFromStorage();
    //console.log(typeof(recipes));
    recipes.push(recipeObject);
    console.log(recipes);
    saveRecipesToStorage(recipes);
  });
  // B10. TODO - Get a reference to the "Clear Local Storage" button
  //let but = document.querySelectorAll('button[type="button"]');
  let but = document.querySelector('button[type="button"]');
  //console.log(but);
  // B11. TODO - Add a click event listener to clear local storage button
  but.addEventListener('click', function () {
  // Steps B12 & B13 will occur inside the event listener from step B11
  // B12. TODO - Clear the local storage
    localStorage.clear();
  // B13. TODO - Delete the contents of <main>
    document.querySelector('main').innerHTML = "";
  });
}
