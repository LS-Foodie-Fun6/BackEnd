## About 
As an avid "Foodie", you eat out _alot_. So much so, in fact, that you have a hard time remembering the details from your previous visits - What did you order? How long did you have to wait to be seated? Were the waistaff friendly and helpful, or rude and dismissive? Was the "mild" Panang Curry _really_ mild, or did it burn the tongue out of your mouth? You could lug a notebook and take detailed notes each visit - taking your attention away from why you came in the first place (to experience the meal), or you can leverage FoodieFun and easily record and access all the important details, freeing you up to focus exclusively on the meal. FoodieFun is a feature-rich "Foodie-Focused" journaling app designed with the avid "Foodie" in mind. With FoodieFun, you can quickly find out all the details you need to make a decision on where to dine:
* The date and time of your previous visits
* How long it took to be seated
* Experience with waitstaff
* Menu Accuracy
* Photos and/or descriptions you uploaded from previous visits
* Ratings you posted for each previous visit, as well as an average over all visits.
* and so much more.
Sign up for FoodieFun today, and start focusing on what matters most to you - the actual meal experience.
## MVP
### 1. Authenticated user can create/register an account as a "Foodie". At a minimum, the account must have the following properties (mobile, web):
	* id
	* username
	* password
	* user's location
	* user's email
### 2. Authenticated user can add a "Restaurant". At a minimum, users can create, read, update and delete the object as well as the values for the following properties (mobile, web):
	* name
	* id
	* type of cuisine
	* location
	* hours of operation
	* overall rating
	* reviews
	* photos of establishment/premises
### 3. Authenticated user can add a "Review" of a specific menu item at a restaurant. At a minimum, users can create, read, update and delete the a "Review", as well as the values for the following properties (mobile, web):
	* restaurant name
	* id
	* cuisine type
	* menu item name
	* photo of menu item
	* price
	* rating of menu item
	* short review of menu item
### 4. Authenticated user can access a view containing all of their previously created restaurants and reviews, and should be able to filter by the following (mobile, web):
	* restaurant
	* price of item
	* type of cuisine
	* most recently visited
	* menu item rating
	* restaurant rating
	* nearby restaurants (mobile, if stretch implemented)
## STRETCH
1. Use MapKit(iOS), MapView/Google Maps SDK(Android) and/or other 3rd party API(s) of your choice to implement a feature to locate nearby restaurants so user can "discover" new or previously unvisited establishments in their vicinity. (mobile)
2. Use Yelp, or other 3rd party restaurant review API to recommend restaurants that have had an increase in rating since your last visit, or unvisited restaurants in your area to try based on others' reviews. (web/mobile)
3. Implement a "social" feature to allow a user to share their review to the social networks of your choice. (mobile, web)
4. Implement a location-based feature that pairs you with other FoodieFun members in the area who are looking for a +1 (or more) to join them on their next FoodieFun adventure. (mobile)