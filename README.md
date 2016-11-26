# webProgramming

## Todo List

------
Routes/ Pages
----
### /main 
	1. {{{body}}} handlebar
	2. header top right "sign-out" button. (this would be displayed on each page)
	
### /home 
	The first page of our application 
	1. Login form section with two input fields "username" and "Password", submit button
	2. a link to /sign_up page
	3. footer -- > "around the web" --> includes links to fb page/twitter account/git/ email us link
	4. about --> little description
	
### /sign_up
	sign_up form with following fields
	1. Firstname
	2. Last name
	3. Email address --> this would be stevens email id --> can use as an username
	4. Password
		show Tip: Use uppercase, lowercase and numbers for stronger password.
	5. contact info (phone number, address)
  6. Upon submit automatically redirect to /profile page  


### /profile
	1. Display User's name
	2. div section --"My Products"-- to display his latest uploaded products (/getProducts)
	3. div section -- Buy and sell buttons
	4. div section to update profile info - contact details and password.
	
### /sell
	1. form for filling product information.
	2. upon submit automatically redirect to individual /productInfo page.
	3. Update "Status" field to "Sold"nce bought by buyer. 
	
### /productInfo
	1. This page displays single product details/info
	2. Owner's contact details who owns the product
	
### /buy
	1. search box form
	2. upon submit, display the search results on the same page using ajax
	3. each row in this result set would be a link to the /productInfo page


------
Database model
------

```json
{"_id": "692778ba-95a2-4c79-a51b-61a7660e93f5",
"Firstname": "John",
"Lastname": "Doe",
"Email": "jdoe@stevens.edu",
"Password": "johnny123",
"Phone": "6313256879",
"Address": "10 Westside avenue",
"City": "Hoboken",
"State": "NJ",
"Zip": "07030",
"Profilepicture":"/public/images/user/profilePic.jpg"}
```

```json
{"_id": "31576435-124b-4131-b184-a63aec4ded70",
"User": "692778ba-95a2-4c79-a51b-61a7660e93f5",
"Title": "Dell Inspiron 15-7574",
"Description": "RAM: 4gb, Intel Core i3, 1TB Hard Drive",
"Condition": "Used",
"PurchasedYear": "2015",
"ProductImage": "/public/images/product/dellproduct.jpg",
"Status": "Unsold"}

```


------
Functions
------

Products data model:
```javascript
getProduct()
```

```javascript
deleteProduct()
```

```javascript
updateProduct()
```

```javascript
getAllProducts()
```


User data model:

```javascript
getUser()
```

```javascript
updateUser()
```

```javascript
deleteUser() // not sure about this
```

-------
