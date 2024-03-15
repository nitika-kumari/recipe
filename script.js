let inputText = document.querySelector('.inputText');
let button = document.querySelector('.btn');
let recepiContainer = document.querySelector('.recepi-container');
let recipeDetailsContent = document.querySelector('.recipe-details-content');
let recipeClose = document.querySelector('.recipe-close')

const getData = async (inputValue) =>{
    recepiContainer.innerHTML = " <h2> Fetching Recipes... </h2> "
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);
    let data = await response.json();
    console.log(data);
    recepiContainer.innerHTML = "";
    data.meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('recipe');
        div.innerHTML = `
          <img src = "${meal.strMealThumb}">
          <h3>${meal.strMeal}<span>Dish</span></h3>
          <p>${meal.strArea}</p>
          <p> Belongs to <span> ${meal.strCategory} </span> Category </p>
        `
        const button1 = document.createElement('button');
        button1.textContent = "View Recipe";
        div.appendChild(button1);

        button1.addEventListener( 'click', ()=>{
            openRecipePopUp(meal);
        })
        recepiContainer.appendChild(div)
    });
    } catch (error) {
        recepiContainer.innerHTML = " <h2> error in fetching </h2> "
    }
    
}

const fetchIngredians = (meal)=>{
    //  console.log(meal);
    let ingrediantsList = "";
    for(let i=1; i<=20; i++){
        const ingrediant = meal[`strIngredient${i}`];
        if(ingrediant){
            const measure = meal[`strMeasure${i}`];
            ingrediantsList += `<li> ${measure} ${ingrediant}</li>`
        }else{
            break;
        }
    }
    return ingrediantsList;
}

const openRecipePopUp = (meal) => {
    recipeDetailsContent.innerHTML = `
      <h2 class = "recipeName">${meal.strMeal}</h2>
      <h3> Ingredians :  </h3>
      <ul class = "ingredianList"> ${fetchIngredians(meal)} </ul>

      <div>
            <h3>Instructions : </h3>
            <p class = "recipeInstructions">${meal.strInstructions}</p>
      </div>
    `

   

    recipeDetailsContent.parentElement.style.display = "block";
}


recipeClose.addEventListener('click', ()=>{
    recipeDetailsContent.parentElement.style.display = "none";
})


button.addEventListener( 'click', (e) => {
    e.preventDefault();
    let inputValue = inputText.value
    if(inputValue === ""){
        alert("search anything");
    }else{
        getData(inputValue)
    }
})