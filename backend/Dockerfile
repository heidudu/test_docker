FROM python:3.5
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN mkdir /backend
WORKDIR /backend
ADD ./requirements.txt /backend/requirements.txt
run pip install --upgrade pip
run pip install -r requirements.txt
#RUN pip install git+https://github.com/Supervisor/supervisor
ADD . /backend
EXPOSE 5000
#ENTRYPOINT ["supervisord", "-c"]
# 可以被运行时的 command 替换
CMD ["python" , "manage.py", "runserver" , "--host" , "0.0.0.0"]
