# Capital-Quiz-Game

**Brief Explanation:**

The Capital Quiz Game is a dynamic web application where users are challenged to guess the capital cities of various countries. The application is built using Node.js, Express.js, and a PostgreSQL database. It utilizes EJS for rendering dynamic HTML content and Body-Parser for handling form data. The game features a user-friendly interface with real-time feedback on answers and score tracking.

**Implementation Details:**

1. **Project Setup:**
   - Initialize the project with `npm init`.
   - Install necessary dependencies: `express`, `body-parser`, `ejs`, `axios`, and `pg`.

2. **Server Setup:**
   - Import and configure the required modules: `express`, `body-parser`, `ejs`, and `pg`.
   - Create an Express application and set the port to 3000.
   - Use Body-Parser to handle URL-encoded data.
   - Serve static files (CSS, images) from the 'public' directory.

3. **Database Connection:**
   - Connect to a PostgreSQL database named 'world' using the `pg` module.
   - Retrieve quiz questions (country-capital pairs) from a table named 'capitals'.

4. **Quiz Logic:**
   - Store the quiz questions in an array `quiz` after fetching them from the database.
   - Define a function `getQues()` to randomly select a question from the quiz.
   - Track the current question and total score.

5. **Routes:**
   - **GET /:** Initialize the quiz, reset the score, and render the first question using EJS.
   - **POST /submit:** Handle form submissions. Check the user's answer, update the score, and provide feedback:
     - If the answer is correct, increment the score and render the next question.
     - If the answer is incorrect, display a game-over message with the final score and an option to restart the quiz.

6. **EJS Templates:**
   - Use EJS to dynamically render the HTML content based on the current question and score.
   - Display feedback (correct/wrong answers) and update the score in real-time.

7. **Client-Side Logic:**
   - Use JavaScript to handle the game-over alert and dynamically update the interface to include a restart button.

**File Structure:**

- **index.js:** Main server file containing the Express application, database connection, and routes.
- **public/:** Directory for static files (e.g., CSS, images).
- **views/:** Directory for EJS templates.
