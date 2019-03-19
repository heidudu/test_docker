FROM python:3.5
RUN mkdir /backend
WORKDIR /backend
ADD ./requirements.txt /backend/requirements.txt
run pip install --upgrade pip
run pip install -r requirements.txt
ADD . /backend
EXPOSE 8000
CMD ["python", "manage.py", "runserver"]
