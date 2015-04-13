Our structure:


app/

---assets/

------images/ --> our normal image structure following

------styles/ --> style sheets. Not sure if we want 1 big or many

------js/ --> we can create this folder if we run into the need of non angular js

---components/ --> So every component is its own MVC (or mini angular app)

------home/

---------homeView.html

---------homeController.js

------about/

---------aboutView.html

---------aboutController.js

---shared/ --> directives and reuseable components

------userManagement/

---------authService.js

---------Session.js

------slider/

---------slider.html

---------slider.js

------application.js --> The Application controller

app.module.js --> declares all modules used + constants

app.routes.js --> delcares all the routes (navigation)

index.html





This structure above is obviously just an example but I hope everybody gets where
 we are 
heading with this. 

The main reason we use this structure instead of the old one is to keep 
the overview. 
Because controllers and view files were stacking up and it slowed the development
down.



ATTENTION: I believe we can't use yeoman to create new controllers /directives /
services anymore. 
So be sure you include the file in the index.html!
