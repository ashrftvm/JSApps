const searchBarContainer = document.querySelector(".search-bar-container");
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const recipesContainer = document.getElementById('recipesContainer');
const recipeDetailsModal = document.getElementById('recipeDetailsModal');
const recipeTitle = document.getElementById('recipeTitle');
const recipeImage = document.getElementById('recipeImage');
const recipeIngredients = document.getElementById('recipeIngredients');
const recipeInstructions = document.getElementById('recipeInstructions');
const closeButton = document.getElementById('closeButton');
const loader = document.getElementById('loader');
const notification = document.getElementById('notification');

let recipes = []; // Store the retrieved recipes

// Event listener for form submit
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
        await searchRecipes(searchTerm);
    }
});

// Event listener for recipe card click using event delegation
recipesContainer.addEventListener('click', (event) => {
    const recipeCard = event.target.closest('.recipe-card');
    if (recipeCard) {
        const recipeId = recipeCard.dataset.recipeId;
        const recipe = recipes.find((recipe) => recipe.idMeal === recipeId);
        openRecipeDetailsModal(recipe);
    }
});

// Event listener for close button click
closeButton.addEventListener('click', () => {
    closeRecipeDetailsModal();
});

// Function to search recipes using TheMealDB API
const searchRecipes = async (searchTerm) => {
    try {
        loader.classList.remove('hidden');
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await response.json();
        recipes = data.meals || []; // Store the retrieved recipes
        renderRecipes(recipes);
    } catch (error) {
        console.log(error);
    } finally {
        loader.classList.add('hidden');
    }
};

// Function to render recipes in the UI
const renderRecipes = (recipes) => {
    recipesContainer.innerHTML = '';

    if (recipes.length > 0) {
        // update the search bar position
        searchBarContainer.classList.replace("search-bar-center", "search-bar-top");
        recipes.forEach((recipe) => {
            const limitedTitle = recipe.strMeal.substring(0, 30) + (recipe.strMeal.length > 30 ? '...' : '');
            const recipeCard = `
                        <div class="recipe-card bg-gray-800 rounded shadow p-4 cursor-pointer" data-recipe-id="${recipe.idMeal}">
                            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="w-full h-48 object-cover mb-4 rounded">
                            <h2 class="text-lg font-semibold">${limitedTitle}</h2>
                        </div>
                    `;

            recipesContainer.innerHTML += recipeCard;
        });

        notification.classList.add('hidden');
    } else {
        // update the search bar position
        searchBarContainer.classList.replace("search-bar-top", "search-bar-center");
        notification.classList.remove('hidden');
    }
};

// Function to open recipe details modal
const openRecipeDetailsModal = (recipe) => {
    recipeTitle.textContent = recipe.strMeal;
    recipeImage.src = recipe.strMealThumb;
    recipeImage.alt = recipe.strMeal;

    // Clear previous ingredients and instructions
    recipeIngredients.innerHTML = '';
    recipeInstructions.textContent = '';

    // Render ingredients
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && measure) {
            const listItem = document.createElement('li');
            listItem.textContent = `${ingredient} - ${measure}`;
            recipeIngredients.appendChild(listItem);
        }
    }

    // Render instructions
    recipeInstructions.innerHTML = recipe.strInstructions.replace(/[\r\n]+/g, '<br>');

    recipeDetailsModal.classList.remove('hidden');
};

// Function to close recipe details modal
const closeRecipeDetailsModal = () => {
    recipeDetailsModal.classList.add('hidden');
};