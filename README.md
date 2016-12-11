# TradeLink

TradeLink is a web application that allows Stevens members to buy and sell
items through an exclusive marketplace with other Stevens members.

# Code structure

The primary directories are:

- config: MongoDB connectors.
- data: Data modules for products and users, including backend API functionality.
- node_modules: Required node modules.
- public: CSS, JS, and product and profile images.
- routes: Login, user, and product route definitions.
- static: Error page (404).
- tasks: Seed script used to populate database.
- views: Handlebars templates and HTML.

# Seeding the database

To drop the current database and populate the user and products collection with
several users and products, execute:

```
node tasks/seed.js
```

Please note that no product or user profile images are included for these
samples, as these images are stored locally but images are not maintained in
source control.

# Starting the application

The application can be run by executing:

```
npm start
```

This will then start a local server on port 3000.

# Logging in

You can use an email/password combination defined in tasks/seed.js to log in,
or sign up with a new user (especially if you want to test uploading a profile
picture) and then log in.

If you forgot your password, you will need to enter your email and then respond
to the security question/answer pair correctly to rest your password.

# Navbar

The navbar has a link to all routes, including logging out, in the dropdown
menu on the right. The About page is also accessible in the navbar.

# User profile

The /updateProfile route can be used to edit your user information. Please be
sure to enter the same or a new password when making changes.

# Products

There are several routes related to managing and viewing products:

- /sell/sellProduct: List a new product for sale, including any relevant
details such as description and condition. Product image is optional.
- /browse: Browse all other users' products (your products will not show up in
this view). The search box supports search against title, year, price, and
description. Partial word matches are not yet supported.
- /products/:productId: View a specific product's information. If this is
another users' product, their contact information will be shown. If this is
your product, the option to Edit or Delete the listing will be available.
