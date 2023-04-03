# Inventory Tracker

Work in progress code for tracking inventory at a restaurant, recording staff members who make changes and recording all actions for report generation in the future.

## Stucture

### Database

Available internally (to Backend) via port 5432.

PostgreSQL, which will allow us to use triggers to keep 'cached' stock values in the ingredients table. The database stores only data for this specific location.

#### Tables:

1. ingredients: Stores a list of ingredients, units and the total stock count (not currently functional).
2. recipes: Stores a list of all the items on the menu with their prices. Currency is not currently supported and is assumed to be GBP in the frontend.
3. recipe_ingredients: Supports a many-to-many relationship between recipes and ingredients with the quanity of each ingredient required for each recipe.
4. staff: A simple table with one row for each staff member with their role the location
5. stock_change: The core of the functionality. Entries in this table should not be updated or deleted. Any change to stock levels is logged in this table with a new row. It is linked to a staff member and recipe optionally (used on menu item sale). The current stock level comes from summing the stock changes for a given ingredient. Automated timestamp allows us to support reports later on. Should trigger a PostgreSQL function to update the cached stock value and throw an error if it will be less than 0. Run in a transaction to combat race conditions.

#### Interface

Postgres admin running on port 80 & exposed on 5050.

When running, visit [localhost:5050](http://localhost:5050).

Login with these details:
- Email: `admin@admin.com`
- Password: `password`

Then click 'Add new server'
- Name: `database`
- Connection: `postgres`
- Maintenance Database: `db`
- Username: `user`
- Password: `password`

### Backend

Run internally on port 3000 & exposed on port 3000.

Node, NestJS backend using TypeORM to define entities, automatically propogated to database.

Three controllers: `staff`, `inventory` and `recipes`

### Frontend

Run internally on port 4200 and exposed on port 4200.

Angular frontend with Material design library for quick prototyping. Does not currently handle any authentication as user needs access to secure WiFi network to access it running locally. However, there are no accounts for staff members and everyone can do everything.

Missing some simple quality-of-life features like local text-matching search on lists. Selling menu item works, accepting delivery works too. Other buttons are currently not functional.

## Setup

In `/docker-compose.yaml` set LOCATION_ID in API environment to match the ID of the location in the locations sheet in spreadsheet.

For example: `LOCATION_ID: 1`

### Loading data from spreadsheets.

Fill `/api/data_exports` folder with CSV exports of spreadsheet. Four files required (as per sheets in the spreadsheet):

- recipes.csv
- ingredients.csv
- staff.csv
- menus.csv

These are loaded into the database on API launch. They require a specific format provided in task. Changes to this format require changes to code.

## Clearing

Sometimes it's necessary to completely clear your docker images (if database changes are not propogated cleanly from entity to database for example).

Note: The commands below clear **all** images and containers. Consider using [docker desktop](https://www.docker.com/products/docker-desktop/) for an interactive, specific experience.

`docker rmi -f $(docker images -a -q)`

`docker rm -vf $(docker ps -a -q)`

## Running locally

Follow these instructions to run the application locally on any machine type.

1. [Install docker](https://docs.docker.com/get-docker/)
2. Run `docker compose up` in repository root
3. Visit [localhost:4200](http://localhost:4200)
4. Other devices on your local network can connect via your local IP address on port `4200`

## Current State Testing

By default, stock levels start at 0 for all ingredients, so testing selling a menu item is difficult. To combat this, you can uncomment some code that artificially adds 10 to all stock levels by inserting changes into the stock_changes table.

To do this, visit the API `/api/src/app.service.ts` and uncomment final stage of launch code to add stock artificially.

Search for:

```
// NOTE: Uncomment this to test selling recipes quickly.
```

### The app

Load the app and select your staff member. This is stored locally and the staff member ID is sent with all requests to edit stock levels (sales, delivery, waste etc).

This relies on trusting the staff to choose their own profile. In future, accounts with authentication using a provider like Firebase should be implemented, or a custom authentication system should be implemented.

Sell an item on the menu page. Continue to sell until you see a message saying the recipe is out of stock. This is all handled in the backend currently, but there should be indications in the frontend in the future (relies on the trigger and data syncing).

Go to inventory page and log a delivery by clicking the van icon next to an ingredient.

## TODOs

- Create, Update, Delete endpoints for inventory, recipes (menu items)
- Authentication and permissions for different roles
- Search in frontend
- 'Waste ingredients' and 'edit stock levels' need connection from Frontend to Backend
- Trigger in Postgres on insert into stock change table to calculate inventory count
- Refreshing data on change in FE
- Show in depth ingredients in menu list. Show which are out of stock. Disable menu items that cannot be sold (currently handled with a race condition in backend).
- Handle modifications on recipes (sheet in the spreadsheet, which is a bit ambiguous)
- Deleting a recipe will delete all logs, but it might be off the menu. This should be supported with a status boolean or enum.
- Reports. These are all possible (although recipe sales is more difficult and may need some additional data stored) through the stock_changes table.
- Tests! There has not been any spare time whilst building this to implement any testing or verification. Manual testing is fine for now for such a simple app, but this will be necessary at some point.
- Stock always reads 0 in the inventory because the Postgres trigger has not been set up yet. This value is read from the cached value in the ingredients table.
- There are a number of comments marked `TODO` in code too.

## Some Noticed Issues

- Would have been better to use something like Firebase, which connects clients together to ensure all data is exactly the same at the same time. Alternatively, should use web sockets to ensure data is automatically updated rather than periodic polling.
- Description of the app 'running locally' is ambigious, or at least undersirable. This task lends itself to a multi-tenancy cloud-based app.
- Perpetuating database after close - need to handle this elegantly with export and import for example. (disappears if we need to delete docker image).
- Updates to this code will need a git pull, not elegant.
- The cost model is very simple. There may need to be support for adjustments in prices, discounts, additional ingredients in recipes etc. There must be a balance between ease of use, reporting accuracy and flexibility.
