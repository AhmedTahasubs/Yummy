
// sidebarJS
let closeIcon = $("nav div i.open-close")
let sidebarInnerValue = $(".sidebar-inner").innerWidth();
let loader = $("div.loader")
$(".sidebar").animate({left:-sidebarInnerValue},0)
$("ul.links li").animate({top: 300},0)
closeIcon.click(function(){
    let sidebarValue = $(".sidebar").css("left");
    if(sidebarValue == "0px")
    {
        $(".sidebar").animate({left:-sidebarInnerValue},500)
        closeIcon.removeClass("fa-xmark").addClass("fa-align-justify")
        $("ul.links li").animate({top: 300}, 500)
    }
    else
    {
        $(".sidebar").animate({left:0},500) 
        closeIcon.addClass("fa-xmark").removeClass("fa-align-justify")
        for (let i = 0; i < 5; i++) {
            $("ul.links li").eq(i).animate({top: 0}, (i + 5) * 100)
        }
    }
})
window.addEventListener("keyup",(e)=>{
    if(e.code == "Escape")
    {
        $(".sidebar").animate({left:-sidebarInnerValue},500)
        closeIcon.removeClass("fa-xmark").addClass("fa-align-justify")
        $("ul.links li").animate({top: 300}, 500)
    }   
})
$("nav li#search").click(function(){
    $("div.home-data").addClass("d-none")
    $("div.contact-us").addClass("d-none")
    $("div#mealData").addClass("d-none")
    $(".sidebar").animate({left:-sidebarInnerValue},500)
    closeIcon.removeClass("fa-xmark").addClass("fa-align-justify")
    $("ul.links li").animate({top: 300}, 500)
    $("div.search").removeClass("d-none")
})
$("nav li#contact").click(function(){
    $("div.home-data").addClass("d-none")
    $("div.search").addClass("d-none")
    $("div#mealData").addClass("d-none")
    $(".sidebar").animate({left:-sidebarInnerValue},500)
    closeIcon.removeClass("fa-xmark").addClass("fa-align-justify")
    $("ul.links li").animate({top: 300}, 500)
    $("div.contact-us").removeClass("d-none")
})

// categories meals
let homeData = document.querySelector(".home-data")
let searchData = document.querySelector(".search-data")
let mealData = document.querySelector("#mealData")
let searchNameInput = document.querySelector("search-name")
let searchLetterInput = document.querySelector("search-letter")
function displayMeals(arr){
    let cartoona = ''
    for(let i =0; i<arr.length;i++)
    {
        cartoona += `<div class="col">
          <div onclick="detailsMealApi('${arr[i].idMeal}')" class="position-relative meal overflow-hidden rounded-2 cursor-pointer">
            <img src="${arr[i].strMealThumb}" class="w-100" alt="">
            <div class="image-layer position-absolute d-flex align-items-center text-black p-2">
              <h3 class="">${arr[i].strMeal}</h3>
            </div>
          </div>
        </div>`
    }
    homeData.innerHTML = cartoona 
}
function displayCategoryMeals(arr){
    let cartoona = ''
    for(let i =0; i<arr.length;i++)
    {
        cartoona += `<div class="col">
          <div onclick="categoryMealApi('${arr[i].strCategory}')" class="position-relative meal overflow-hidden rounded-2 cursor-pointer">
            <img src="${arr[i].strCategoryThumb}" class="w-100" alt="">
            <div class="image-layer position-absolute text-center text-black p-2">
              <h3>${arr[i].strCategory}</h3>
              <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
          </div>
        </div>`
    }
    homeData.innerHTML = cartoona
}
async function categoryApi(){
    loader.fadeIn(200)
    $("div.contact-us").addClass("d-none")
    $("div.search").addClass("d-none")
    $("div.home-data").removeClass("d-none")
    $("#mealData").addClass("d-none")
    $(".sidebar").animate({left:-sidebarInnerValue},500)
    $("ul.links li").animate({top: 300}, 500)
    closeIcon.removeClass("fa-xmark").addClass("fa-align-justify")
    const api = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    const response = await api.json()
    loader.fadeOut(200)
    displayCategoryMeals(response.categories)
}
$("#categories").click(function(){
    categoryApi()
})


// areaMeals
function displayAreaMeals(arr){
    let cartoona = ''
    for(let i =0; i<arr.length;i++)
    {
        cartoona += `<div class="col">
          <div class="rounded-2 text-center cursor-pointer" onclick="areaMealApi('${arr[i].strArea}')">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${arr[i].strArea}</h3>
          </div>
        </div>`
    }
    homeData.innerHTML = cartoona
}
async function areaApi(){
    loader.fadeIn(200)
    $("div.contact-us").addClass("d-none")
    $("div.search").addClass("d-none")
    $("div.home-data").removeClass("d-none")
    $("#mealData").addClass("d-none")
    $(".sidebar").animate({left:-sidebarInnerValue},500)
    closeIcon.removeClass("fa-xmark").addClass("fa-align-justify")
    $("ul.links li").animate({top: 300}, 500)
    const api = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    const response = await api.json()
    loader.fadeOut(200)
    displayAreaMeals(response.meals);
}
$("#area").click(function(){
    areaApi()
})
// ingredientsApi
function displayIngredientsMeals(arr){
    let cartoona = ''
    for(let i =0; i<arr.length;i++)
    {
        cartoona += `<div class="col">
          <div class="rounded-2 text-center cursor-pointer" onclick="ingredientsMealApi('${arr[i].strIngredient}')">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${arr[i].strIngredient}</h3>
            <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
          </div>
        </div>`
    }
    homeData.innerHTML = cartoona
}
async function ingredientsApi(){
    loader.fadeIn(200)
    $("div.contact-us").addClass("d-none")
    $("div.search").addClass("d-none")
    $("div.home-data").removeClass("d-none")
    $("#mealData").addClass("d-none")
    $(".sidebar").animate({left:-sidebarInnerValue},500)
    closeIcon.removeClass("fa-xmark").addClass("fa-align-justify")
    $("ul.links li").animate({top: 300}, 500)
    const api = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    const response = await api.json()
    loader.fadeOut(200)
    displayIngredientsMeals(response.meals.slice(0, 20));
}
$("#ingredients").click(function(){
    ingredientsApi()
})
async function categoryMealApi(category){
    loader.fadeIn(200)
    $("div.contact-us").addClass("d-none")
    $("div.search").addClass("d-none")
    $("div.home-data").removeClass("d-none")
    $("#mealData").addClass("d-none")
    $(".sidebar").animate({left:-sidebarInnerValue},500)
    closeIcon.removeClass("fa-xmark").addClass("fa-align-justify")
    $("ul.links li").animate({top: 300}, 500)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    const response = await api.json()
    loader.fadeOut(200)
    displayMeals(response.meals);
}
async function areaMealApi(area){
    loader.fadeIn(200)
    $("div.contact-us").addClass("d-none")
    $("div.search").addClass("d-none")
    $("div.home-data").removeClass("d-none")
    $("#mealData").addClass("d-none")
    $(".sidebar").animate({left:-sidebarInnerValue},500)
    closeIcon.removeClass("fa-xmark").addClass("fa-align-justify")
    $("ul.links li").animate({top: 300}, 500)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    const response = await api.json()
    loader.fadeOut(200)
    displayMeals(response.meals);
}
async function ingredientsMealApi(area){
    loader.fadeIn(200)
    $("div.contact-us").addClass("d-none")
    $("div.search").addClass("d-none")
    $("div.home-data").removeClass("d-none")
    $("#mealData").addClass("d-none")
    $(".sidebar").animate({left:-sidebarInnerValue},500)
    closeIcon.removeClass("fa-xmark").addClass("fa-align-justify")
    $("ul.links li").animate({top: 300}, 500)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${area}`)
    const response = await api.json()
    loader.fadeOut(200)
    displayMeals(response.meals);
}
function displayMealsDetails(meal){
    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",")
    if (!tags) tags = []
    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let cartoona = `<div class="row py-5 g-4 " >
           <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>
                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
        </div>`
        mealData.innerHTML = cartoona
}
async function detailsMealApi(id){
    loader.fadeIn(200)
    $("div.contact-us").addClass("d-none")
    $("div.search").addClass("d-none")
    $("#mealData").removeClass("d-none")
    $("div.home-data").addClass("d-none")
    $(".sidebar").animate({left:-sidebarInnerValue},500)
    closeIcon.removeClass("fa-xmark").addClass("fa-align-justify")
    $("ul.links li").animate({top: 300}, 500)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const response = await api.json()
    loader.fadeOut(200)
    displayMealsDetails(response.meals[0]);
}
async function refreshApi(){
    loader.fadeIn(200)
    $("div.contact-us").addClass("d-none")
    $("div.search").addClass("d-none")
    $("div.home-data").removeClass("d-none")
    $("#mealData").addClass("d-none")
    $(".sidebar").animate({left:-sidebarInnerValue},500)
    $("ul.links li").animate({top: 300}, 500)
    closeIcon.removeClass("fa-xmark").addClass("fa-align-justify")
    const api = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    const response = await api.json()
    loader.fadeOut(200)
    displayMeals(response.meals)
}
refreshApi()
async function searchByName(name=""){
    loader.fadeIn(200)
    $("div.contact-us").addClass("d-none")
    $("div.search").removeClass("d-none")
    $("div.home-data").removeClass("d-none")
    $("#mealData").addClass("d-none")
    $(".sidebar").animate({left:-sidebarInnerValue},500)
    closeIcon.removeClass("fa-xmark").addClass("fa-align-justify")
    $("ul.links li").animate({top: 300}, 500)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    const response = await api.json()
    loader.fadeOut(200)
    displayMeals(response.meals);
}
async function searchByLetter(letter){
    loader.fadeIn(200)
    $("div.contact-us").addClass("d-none")
    $("div.search").removeClass("d-none")
    $("div.home-data").removeClass("d-none")
    $("#mealData").addClass("d-none")
    $(".sidebar").animate({left:-sidebarInnerValue},500)
    closeIcon.removeClass("fa-xmark").addClass("fa-align-justify")
    $("ul.links li").animate({top: 300}, 500)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter?letter:"a"}`)
    const response = await api.json()
    loader.fadeOut(200)
    displayMeals(response.meals);
}
// inputs

let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let nameRegex = /^[a-zA-Z ]+$/;
let passRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
let ageRegex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
let nameInput = document.getElementById("nameInput")
let emailInput = document.getElementById("emailInput")
let phoneInput = document.getElementById("phoneInput")
let ageInput = document.getElementById("ageInput")
let passwordInput = document.getElementById("passwordInput")
let rePasswordInput = document.getElementById("repasswordInput")
let submitBtn = document.getElementById("submitBtn")
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let rePasswordInputTouched = false;

nameInput.addEventListener("focus", () => {
    nameInputTouched = true
})

emailInput.addEventListener("focus", () => {
    emailInputTouched = true
})

phoneInput.addEventListener("focus", () => {
    phoneInputTouched = true
})

ageInput.addEventListener("focus", () => {
    ageInputTouched = true
})

passwordInput.addEventListener("focus", () => {
    passwordInputTouched = true
})

rePasswordInput.addEventListener("focus", () => {
    rePasswordInputTouched = true
})

function isValidInputs(regex,element)
{
    return (regex.test(element.value))
}
function rePasswordValidation(){
    return rePasswordInput.value==passwordInput.value}
function inputsValidation() {
    if (nameInputTouched) {
        if (isValidInputs(nameRegex,nameInput)) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (isValidInputs(emailRegex,emailInput)) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (isValidInputs(phoneRegex,phoneInput)) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (isValidInputs(ageRegex,ageInput)) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (isValidInputs(passRegex,passwordInput)) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (rePasswordInputTouched) {
        if (rePasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }
    if(// email
        isValidInputs(emailRegex,emailInput)&&
        // name
        isValidInputs(nameRegex,nameInput)&&
        // pass
        isValidInputs(passRegex,passwordInput)&&
        // repass
        function rePasswordValidation(){
        return rePasswordInput.value==passwordInput.value}&&
        // phone 
        isValidInputs(phoneRegex,phoneInput)&&
        // age 
        isValidInputs(ageRegex,ageInput))
    {
        submitBtn.removeAttribute("disabled")
    }
    else
    {
        submitBtn.setAttribute("disabled", true)
    }
}





