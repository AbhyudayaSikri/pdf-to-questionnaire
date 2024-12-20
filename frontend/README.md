PDF to Questionnaire Project

This project extracts form fields from a PDF (such as the OCF-1 form) and converts them into a web-based questionnaire. Users can upload a PDF file, view extracted form fields, and edit the values before generating a final JSON payload.

Prerequisites:

Python 3.7+
Node.js 14+ and npm (or yarn)
Git (optional, but helpful for version control)
Project Structure: project/ backend/ app.py requirements.txt frontend/ package.json public/ index.html src/ components/ Questionnaire.js services/ api.js App.js App.css ...

Setup Instructions:

Clone the Repository (optional): If you have a GitHub repository for this project, you can clone it: git clone https://github.com/<your-username>/<your-repo-name>.git cd <your-repo-name>

If you're already in your project directory, skip this step.

Backend Setup: a. Create and activate a virtual environment: On Windows (using the py launcher): cd backend py -m venv venv

On Linux/macOS: cd backend python3 -m venv venv

Then activate it: For Git Bash or Linux/macOS: source venv/Scripts/activate or source venv/bin/activate

For Windows Command Prompt: venv\Scripts\activate

b. Install backend dependencies: pip install -r requirements.txt

c. Start the backend server: python app.py

The Flask server should start at http://localhost:5000. If successful, you should see a message like:

Running on http://localhost:5000/ (Press CTRL+C to quit)
Frontend Setup: Open a new terminal (keep the backend running):

a. Navigate to the frontend directory: cd ../frontend

b. Install frontend dependencies: npm install

c. Start the frontend development server: npm start

The frontend should start at http://localhost:3000. It may open automatically in your browser; if not, open it manually.

Using the Application: With both servers running (backend on http://localhost:5000 and frontend on http://localhost:3000): a. Open http://localhost:3000 in your browser. b. Click "Choose File" and select your PDF, then click "Upload". c. The backend processes the PDF and returns form fields. d. The fields display as a questionnaire. Edit values as needed. e. Click "Finish" to generate the final JSON payload (displayed in an alert).

Troubleshooting:

If you encounter a 500 error in the console: Check that the backend server is running. Check the backend terminal for errors. Verify that you are uploading a valid PDF file.

If the frontend does not load: Ensure that npm start is running without errors. Check the browser console for any warnings or errors.

Stopping the Servers:

To stop the backend server, press CTRL+C in the terminal running app.py.
To stop the frontend server, press CTRL+C in the terminal running npm start.
License: Include your chosen license information here, if applicable.
