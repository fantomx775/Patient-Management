# Patient Management CRUD App

This CRUD (Create, Read, Update, Delete) application is designed to manage patient records. It provides a user-friendly interface for adding, editing, deleting patients, and searching through the existing records. The app is built using React for the frontend, Python Flask for the backend, and PostgreSQL for the database.

## Features

- **Create**: Add new patients with their information such as name, age, contact details, etc.
- **Read**: View the list of existing patients with their details.
- **Update**: Modify patient details such as name, age, contact details, etc.
- **Delete**: Remove patients from the system.
- **Search**: Quickly find patients based on their name, age, or any other available information.
- **Input Validation**: Validate user input to ensure data integrity and accuracy.

## Technology Stack

- **Frontend**: React
- **Backend**: Python Flask
- **Database**: PostgreSQL

## Installation

### Frontend

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the React development server:

   ```bash
   npm start
   ```

### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install Python dependencies (it's recommended to use a virtual environment):

   ```bash
   pip install -r requirements.txt
   ```

3. Set up PostgreSQL database:
   
   - Create a PostgreSQL database.
   - Create file `.env` in the same directory as `app.py`.
   - Input your PostgreSQL database credentials into the `.env`:

     ```bash
    DB_USER=...
    DB_PASSWORD=...
    DB_HOST=...
    DB_NAME=...
     ```

4. Run the Flask server:

   ```bash
   python app.py
   ```

## Usage

- Once the frontend and backend servers are running, you can access the application via your web browser.
- Use the provided interface to perform CRUD operations on patient records.
- Input fields are validated to ensure data accuracy.
- Use the search functionality to find specific patients based on their details.