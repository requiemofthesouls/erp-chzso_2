FROM python:3.6
# To enable logging
ENV PYTHONUNBUFFERED 1
# Create server directory
RUN mkdir -p /srv/erp_chzso_2
WORKDIR /srv/erp_chzso_2
# Install the server dependencies
COPY ./requirements.txt /srv/erp_chzso_2
RUN pip3 install -r requirements.txt --no-cache-dir
# Bundle the source
COPY . /srv/erp_chzso_2
WORKDIR /srv/erp_chzso_2/backend
