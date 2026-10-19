//add a new grocery item
function addGroceryItem() {
    //collect the item name, expiration date, and category
    console.log("Adds grocery item function");
}

//display saved grocery items
function displayGroceries() {
    console.log("Displays groceries function");
}

//check which groceries are expiring soon
function checkExpiringItems() {
    console.log("Checks expiring items function");
}

//save grocery items to localStorage
function saveGroceries() {
    console.log("Savess groceries function");
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