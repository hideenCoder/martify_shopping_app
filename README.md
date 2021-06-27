# martify_shopping_app Installation steps..

# 1. Clone the repository.
# 2. for below steps you have to install node.js in your system. to install just download the file from here https://nodejs.org/en/ and istall it perfectly. after that for angular cli run this command npm install -g @angular/cli
# 3. Install mySQL in your system.
# 4. create a Database which name should be martify.
# 5. Import martify_database.sql to your Data Base.
# 6. Check that all the tables should be imported successfully.
# 7. Open the helpers.js which is in the /server/config/ in cloned directory.
# 8. Change your mysql properties..
    host: 'your host name',
    user: 'your user name',
    password: 'your password',
    database: 'martify',
    multipleStatements: true
    
# 9. Open the config.env wich is in the server directory.
# 10. Change your Gmail id and password..
    EMAIL = Your Email
    EMAIL_PASS = Your Password
 
# 11. open the server folder in terminal and run this commands..
npm i
npm start
# 12. open the client folder in another terminal and run this commands..
npm i
ng serve

# FINALLY. project should be Running Successfully.
