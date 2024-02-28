# Group6-Design-Project
A Webapp for scanning chess notation sheets and converting them into games. 
## Running with Docker
    - Make sure to have docker installed on your machine
    - Clone the Repo into your Machine
    - Navigate inside the chessPal folder
    - Type docker-compose build
    - Type docker-compose up
    - Navigate to localhost:3000 in your web browser
## To Run Project
- Make Sure you have Pipenv installed (pip install pipenv)
- For Frontend:
    - Navigate into teh chessPal folder
    - Navigate into the frontend folder
    - npm install react-router-dom
    - npm start
- For Backend (seperate terminal for running both frontend and backend):
    - Navigate into teh chessPal folder
    - In terminal type pipenv shell
    - In terminal type pipenv sync
    - Navigate into backend
    - python manage.py runserver

