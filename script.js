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

    refreshGroceries();
    checkExpiringItems();
    updateChart();

    document.getElementById("grocery-form").reset();
}

//display saved grocery items
function displayGroceries(grocery, index) {
    let groceryList = document.getElementById(grocery.category + "-list");
    let item = document.createElement("li");

    let groceryText = document.createElement("span");
    groceryText.textContent = grocery.name + " | " + grocery.expirationDate;

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.type = "button";
    removeButton.classList.add("remove-button");

    removeButton.addEventListener("click", function() {
        removeGrocery(index);
    });

    item.appendChild(groceryText);
    item.appendChild(removeButton);

    groceryList.appendChild(item);
}

function removeGrocery(index) {
    groceries.splice(index, 1);
    saveGroceries();
    refreshGroceries();
    checkExpiringItems();
    updateChart();
}

function refreshGroceries() {
    document.getElementById("fridge-list").innerHTML = "";
    document.getElementById("freezer-list").innerHTML = "";
    document.getElementById("pantry-list").innerHTML = "";

    groceries.forEach(function(grocery, index) {
        displayGroceries(grocery, index);
    });
}

//check which groceries are expiring soon
function checkExpiringItems() {
    let expiringList = document.getElementById("expiring-list");

    expiringList.innerHTML = "";

    groceries.forEach(function(grocery) {
        let daysLeft = daysUntilExpiration(grocery.expirationDate);
        if (daysLeft >= 0 && daysLeft <= 3) {
            let item = document.createElement("li");

            if (daysLeft === 0) {
                item.textContent = grocery.name + " | Expires today! Use immediately";
            } else if (daysLeft === 1) {
                item.textContent = grocery.name + " | Expires tomorrow!";
            } else {
                item.textContent = grocery.name + " | " + daysLeft + " days left";
            }

            expiringList.appendChild(item);
        }
    });
}

//save grocery items to localStorage
function saveGroceries() {
    localStorage.setItem("groceries", JSON.stringify(groceries));
}

function loadGroceries() {
    let savedGroceries = localStorage.getItem("groceries");
    if (savedGroceries) {
        groceries = JSON.parse(savedGroceries);

        refreshGroceries();
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



document.getElementById("grocery-form").addEventListener("submit", addGroceryItem);

let groceryChart;

function updateChart() {

    if (typeof Chart === "undefined") {
        console.error("Chart.js failed to load and chart is unavailable.");
        return;
    }

    let fridge = groceries.filter(item => item.category === "fridge").length;
    let freezer = groceries.filter(item => item.category === "freezer").length;
    let pantry = groceries.filter(item => item.category === "pantry").length;

    if (groceryChart) {
        groceryChart.destroy();
    }

    let chart = document.getElementById("grocery-chart");

    groceryChart = new Chart(chart, {
        type: "doughnut",
        data: {
            labels: ["Fridge", "Freezer", "Pantry"],
            datasets: [{
                data: [fridge, freezer, pantry],
                backgroundColor: ["#82977B", "#F7E8AC", "#C7AE91"]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });
}

loadGroceries();
checkExpiringItems();
updateChart();