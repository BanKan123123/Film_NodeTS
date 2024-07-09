**Website Film Manager**

**Available Scripts**

**In the project directory, you can run:**

**npm start**

Runs the app in the development mode.
Open http://localhost:4001 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.
**npm run build**

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

**npm run prestart**

This command applies any pending migrations to your database.npm run migrate
**npm run create-migrate**

This command creates a new migration file without applying it.
**npm run migrate-deploy**

This command applies all pending migrations in production.
**Project Structure**

**Backend:**

Uses Express.js
CRUD operations for Films, Episodes, Directors, and Categories
Authentication with encrypted passwords using bcrypt
**Frontend:**

**Built with React**

Interface for introducing and watching films

**API Endpoints**

Here are some of the key API endpoints available in this project:

**Films:**

**GET /api/films - Get all films**

**POST /api/films - Create a new film**

**PUT /api/films/:id - Update a film**

**DELETE /api/films/:id - Delete a film**

**Episodes:**

**GET /api/episodes - Get all episodes**

**POST /api/episodes - Create a new episode**

**PUT /api/episodes/:id - Update an episode**

**DELETE /api/episodes/:id - Delete an episode**

**Directors:**

**GET /api/directors - Get all directors**

**POST /api/directors - Create a new director**

**PUT /api/directors/:id - Update a director**

**DELETE /api/directors/:id - Delete a director**
**Categories:**

**GET /api/categories - Get all categories**

**POST /api/categories - Create a new category**

**PUT /api/categories/:id - Update a category**

**DELETE /api/categories/:id - Delete a category**

**Authentication:**

**POST /api/login - User login**

**POST /api/logout - User logout**

**Contributing**

Feel free to open issues or submit pull requests for any improvements or new features.

**License**

This project is licensed under the MIT License.
