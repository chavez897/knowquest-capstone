# inventory-app
Project for virtualization course. Creating a containerized web app with django rest framework and react.


docker-compose build

docker-compose run --rm app python manage.py migrate

docker-compose run --rm app python manage.py createsuperuser (it will ask data to create your first user)

docker-compose up