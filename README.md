# Fruit.ai

Fruit.ai is a health management application that offers comprehensive information about fruits. The app includes interactive features like a chatbot for assistance, an FAQ management system, and more. It leverages React for the frontend and Flask for the backend to deliver a robust and user-friendly experience.

## Project Structure

### Frontend (React)

- **`src/`**
  - **`components/`**: Contains reusable components like `FruitList`, `Navbar`, and `AuthContext`.
  - **`pages/`**: Includes page components such as `LoginPage`, `HomePage`, `ChatbotPage`, `TranslatorPage`, `FAQPage`, and `AboutPage`.
  - **`App.js`**: The entry point for the React application.
  - **`index.js`**: Renders the React app into the DOM.
  - **`styles/`**: Manages styling with Material UI.

### Backend (Flask)

- **`app/`**
  - **`routes/`**: Defines API endpoints (e.g., FAQ and fruit management).
  - **`models/`**: Contains database models and schemas.
  - **`utils/`**: Provides utility functions.
  - **`__init__.py`**: Initializes the Flask app and database connection.
  - **`config.py`**: Stores configuration settings like the database URI.
  - **`app.py`**: The main entry point for the backend.

## Login Details

For demo purposes, the following credentials are available for login:

- **Email**: `user@gmail.com`
- **Password**: `user321`

These are hardcoded in the login page.

## Hosted Links

- **Frontend**: [Fruit.ai on Vercel](https://fruit-ai-pi.vercel.app/login)

## Setup Instructions

### Prerequisites

- **Frontend**: Requires Node.js and npm
- **Backend**: Requires Python 3.8+ and MongoDB Atlas

### Frontend Setup

1. **Clone the repository**:

    ```bash
    git clone https://github.com/SouvikDas2002/Fruit.ai-frontend.git
    ```

2. **Navigate to the frontend directory**:

    ```bash
    cd fruit-ai-frontend
    ```

3. **Install dependencies**:

    ```bash
    npm install
    ```

4. **Start the development server**:

    ```bash
    npm run dev
    ```

5. **Open the app** at `http://localhost:5173`.

### Backend Setup

1. **Navigate to the backend directory**:

    ```bash
    cd fruit-ai-backend
    ```

2. **Create and activate a virtual environment**:

    ```bash
    python -m venv venv
    source venv/bin/activate  # For Windows: venv\Scripts\activate
    ```

3. **Install dependencies**:

    ```bash
    pip install -r requirements.txt
    ```

4. **Update the MongoDB URI** in `config.py`:

    ```python
    class Config:
        MONGO_URI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/faqs?retryWrites=true&w=majority'
    ```

5. **Start the Flask server**:

    ```bash
    python app.py
    ```

6. Access the backend API at `http://localhost:5000`.

## Design Considerations

- **Frontend**: Built using React for a dynamic and responsive UI, with Material-UI for styling.
- **Backend**: Powered by Flask to manage API requests and MongoDB Atlas for database storage.
- **State Management**: Authentication is handled via React’s Context API.
- **Deployment**: Frontend is deployed on Vercel, and backend will be hosted on Render for production.

## Repositories

- **Frontend**: [GitHub Repository](https://github.com/SouvikDas2002/Fruit.ai-frontend.git)
- **Backend**: [GitHub Repository](https://github.com/SouvikDas2002/Fruit.ai-flask-API)

## Contact

For any questions or support, feel free to contact me at [dev.souvik2002@gmail.com](mailto:dev.souvik2002@gmail.com).
