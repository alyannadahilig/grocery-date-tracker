# Grocery Expiration Date Tracker

This project is a simple web application that helps users keep track of their groceries and expiration dates. The goal is to make it easier to see what groceries are still available at home and which ones should be used soon to help reduce food waste.

## Demo Path

1. Enter a grocery item's name, expiration date, and storage category (Fridge, Freezer, or Pantry).
2. Click "Add Item" to add the grocery to the list.
3. View all saved grocery items and their expiration dates under "My Groceries."
4. Check the "Expiring Soon" section to see which groceries will expire within the next 3 days.
5. View the Grocery Overview chart to see how many groceries are stored in each category.

## Current Features

- Add grocery items with a name, expiration date, and storage category.
- Display all added grocery items under "My Groceries."
- Save grocery items using localStorage so they remain available even after refreshing the webpage.
- Automatically display groceries that are expiring within the next 3 days.
- Show how many days are left before a grocery expires.
- Display a doughnut chart showing the number of groceries stored in the Fridge, Freezer, and Pantry.

## Tech Stack

- **HTML**: For the structure and layout of the webpage.
- **CSS**: For styling and making the application easy to navigate.
- **JavaScript**: For handling user input, adding grocery items, checking expiration dates, and updating the chart.
- **localStorage**: For saving grocery items in the browser so they don't disappear when the page is refreshed.
- **Chart.js**: For creating the Grocery Overview chart that displays the number of items in each storage category.

I chose to use HTML, CSS, and JavaScript to keep the project simple and manageable while still being able to build the features I have planned. Using localStorage also allows me to save grocery information without needing to set up a separate database.

## How to Run

1. Download or clone the repository.
2. Open the project folder in VS Code.
3. Open `index.html` in a web browser with an internet connection to load Chart.js.
4. Enter a grocery item's name, expiration date, and storage category.
5. Click "Add Item" to save the grocery and display it on the webpage.

The grocery list, Expiring Soon section, and Grocery Overview chart will update automatically as new groceries are added.

## Sample Data

The `sample-data.json` file contains four example grocery items: Tomato, Sourdough Bread, Caesar Salad, and Frozen Gyoza.

This file is included for reference only and does not automatically load into the application. Users can refer to the sample data and manually enter the same information into the grocery tracker if they would like to test its features.

## Project Status

The project has completed its second build sprint. The main features are now working, including adding and saving grocery items, checking which groceries are close to expiring, and displaying a chart that organizes groceries by storage category.

There are still additional features that can be added in future sprints, but the application currently has a working demo path that allows users to enter grocery information and view the results.