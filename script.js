let groceries = [];
let groceryHistory = [];

//add a new grocery item
function addGroceryItem(event) {
    event.preventDefault();
    let name = document.getElementById("grocery-name").value;
    let date = document.getElementById("grocery-date").value;
    let category = document.getElementById("grocery-category").value;

    if (name.trim() === "" || date === "" || category === "") {
        alert("Please fill out all fields.");
        return;
    }

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

    //used button:
    let usedButton = document.createElement("button");
    usedButton.textContent = "Used";
    usedButton.type = "button";
    usedButton.classList.add("action-button");

    usedButton.addEventListener("click", function() {
        markGrocery(index, "used");
    });

    //wasted button:
    let wastedButton = document.createElement("button");
    wastedButton.textContent = "Wasted";
    wastedButton.type = "button";
    wastedButton.classList.add("action-button");

    wastedButton.addEventListener("click", function() {
        markGrocery(index, "wasted");
    });

    //remove button:
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.type = "button";
    removeButton.classList.add("remove-button");

    removeButton.addEventListener("click", function() {
        removeGrocery(index);
    });

    item.appendChild(groceryText);
    item.appendChild(usedButton);
    item.appendChild(wastedButton);
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

function markGrocery(index, status) {
    let grocery = groceries[index];

    groceryHistory.push({
        name: grocery.name,
        expirationDate: grocery.expirationDate,
        category: grocery.category,
        status: status
    });

    groceries.splice(index, 1);

    saveGroceries();
    saveGroceryHistory();
    refreshGroceries();
    checkExpiringItems();
    updateChart();
    updateWasteChart();
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

//save used and wasted grocery history
function saveGroceryHistory() {
    localStorage.setItem("groceryHistory", JSON.stringify(groceryHistory));
}

function loadGroceryHistory() {
    let savedHistory = localStorage.getItem("groceryHistory");

    if (savedHistory) {
        groceryHistory = JSON.parse(savedHistory);
    }
}

function loadGroceries() {
    let savedGroceries = localStorage.getItem("groceries");
    if (savedGroceries) {
        groceries = JSON.parse(savedGroceries);
    }

    refreshGroceries();
}

console.log("Grocery Date Tracker is up and running! :0");

//calculate how many days are left until a grocery expires
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
let wasteChart;

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
            animation: false,
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });
}

 //update food waste chart
 function updateWasteChart() {
    if (typeof Chart === "undefined") {
        console.error("Chart.js failed to load and chart is unavailable.");
        return;
    }
    let used = groceryHistory.filter(item => item.status === "used").length;
    let wasted = groceryHistory.filter(item => item.status === "wasted").length;

    if (wasteChart) {
        wasteChart.destroy();
    }

    let chart = document.getElementById("waste-chart");
    wasteChart = new Chart(chart, {
        type: "doughnut",
        data: {
            labels: ["Used", "Wasted"],
            datasets: [{
                data: [used, wasted],
                backgroundColor: ["#82977B", "#C7AE91"]
            }]
        },
        options: {
            responsive: true,
            animation: false,
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });
}


loadGroceries();
loadGroceryHistory();
checkExpiringItems();
updateChart();
updateWasteChart();