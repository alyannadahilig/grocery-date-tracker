let groceries = [];

//add a new grocery item
function addGroceryItem(event) {
    event.preventDefault();
    let name = document.getElementById("grocery-name").value;
    let date = document.getElementById("grocery-date").value;
    let category = document.getElementById("grocery-category").value;

    let grocery = {
        name: name,
        expirationDate: date,
        category: category
    };

    groceries.push(grocery);
    saveGroceries();

    displayGroceries(grocery);

    document.getElementById("grocery-form").reset();
}

//display saved grocery items
function displayGroceries(grocery) {
    let groceryList = document.getElementById("grocery-list");
    let item = document.createElement("li");

    item.textContent = grocery.name + " | " +
                       grocery.expirationDate + " | " +
                       grocery.category;

    groceryList.appendChild(item);
}

//check which groceries are expiring soon
function checkExpiringItems() {
    console.log("Checks expiring items function");
}

//save grocery items to localStorage
function saveGroceries() {
    localStorage.setItem("groceries", JSON.stringify(groceries));
}

function loadGroceries() {
    let savedGroceries = localStorage.getItem("groceries");
    if (savedGroceries) {
        groceries = JSON.parse(savedGroceries);

        groceries.forEach(function(grocery) {
            displayGroceries(grocery);
        });
    }
}

console.log("Grocery Date Tracker is up and running! :0");

//tests for calculating expiration dates
function daysUntilExpiration(date) {
    let today = new Date();
    let expirationDate = new Date(date + "T00:00:00");

    today.setHours(0, 0, 0, 0);

    let difference = expirationDate - today;
    let daysLeft = Math.round(difference / (1000 * 60 * 60 * 24));

    return daysLeft;
}

//example expiration dates
console.log("Milk:", daysUntilExpiration("2026-10-21"));
console.log("Eggs:", daysUntilExpiration("2026-10-22"));
console.log("Cereal:", daysUntilExpiration("2026-12-16"));

//test for saving a grocery item
let grocery = {
    name: "Milk",
    expirationDate: "2026-10-21",
    category: "fridge"
};

localStorage.setItem("grocery", JSON.stringify(grocery));

let savedGrocery = JSON.parse(localStorage.getItem("grocery"));

console.log("Saved grocery:", savedGrocery);

document.getElementById("grocery-form").addEventListener("submit", addGroceryItem);
loadGroceries();