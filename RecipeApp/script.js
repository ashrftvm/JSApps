const searchBarContainer = document.querySelector(".search-bar-container");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const recipesContainer = document.getElementById("recipesContainer");
const recipeDetailsModal = document.getElementById("recipeDetailsModal");
const recipeTitle = document.getElementById("recipeTitle");
const recipeImage = document.getElementById("recipeImage");
const recipeIngredients = document.getElementById("recipeIngredients");
const recipeInstructions = document.getElementById("recipeInstructions");
const closeButton = document.getElementById("closeButton");
const loader = document.getElementById("loader");
const notification = document.getElementById("notification");

let recipes = [];

// Event listener for the form submit in recipe search
searchForm.addEventListener('submit', async (event)=>{
    event.preventDefault();
    const searchTerm = searchInput.value.trim();
    if(searchTerm !== ""){
        await searchRecipes(searchTerm);
    }
})

// function for searching the recipes using themealdb API
async function searchRecipes(searchTerm){
    try{
        loader.classList.remove('hidden');
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        const data = await response.json();
        recipes = data.meals || [];
        renderRecipes(recipes);
    }catch (error){
        console.warn("Some error occured", error);
    }finally{
        loader.classList.add('hidden')
    }
}

// function for rendering the recipes
function renderRecipes(recipes){
    recipesContainer.innerHTML = "";
    if(recipes.length > 0){
        searchBarContainer.classList.replace("search-bar-center", "search-bar-top");
        recipes.forEach(recipe => {
            const recipeCard = `
            <div class="recipe-card bg-gray-800 rounded shadow p-4 cursor-pointer" data-recipe-id="${recipe.idMeal}">
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="w-full h-48 object-cover mb-4 rounded">
                <h2 class="text-lg font-semibold">${recipe.strMeal}</h2>
            </div>
            `;
            recipesContainer.innerHTML += recipeCard;
        });
        notification.classList.add('hidden');
    }else{
        searchBarContainer.classList.replace("search-bar-top", "search-bar-center");
        notification.classList.remove('hidden')
    }
}


// event listener for recipe card click
recipesContainer.addEventListener("click", event =>{
    const recipeCard = event.target.closest(".recipe-card");
    if(recipeCard){
        const recipeId = recipeCard.dataset.recipeId;
        const recipe = recipes.find(recipe => recipe.idMeal === recipeId);
        openRecipeDetailsModal(recipe);
    }
})

// function to open the recipeModal
function openRecipeDetailsModal(recipe){
    // console.log(recipe)
    recipeTitle.textContent = recipe.strMeal;
    recipeImage.src = recipe.strMealThumb;
    recipeImage.alt = recipe.strMeal;

    recipeIngredients.innerHTML = "";
    recipeInstructions.textContent = "";

    // render ingredients
    for(let i = 1; i <= 20; i++){
        const ingredient = recipe[`strIngredient${i}`]
        const measure = recipe[`strMeasure${i}`];
        if(ingredient && measure){
            const listItem = document.createElement('li');
            listItem.textContent = `${ingredient} - ${measure}`;
            recipeIngredients.appendChild(listItem);
        }
    }

    recipeInstructions.innerHTML = recipe.strInstructions.replace(/[\r\n]+/g, '<br><br>');

    recipeDetailsModal.classList.remove('hidden');
}

closeButton.addEventListener('click', () => {
    recipeDetailsModal.classList.add('hidden');
})