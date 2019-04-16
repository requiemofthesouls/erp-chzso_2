FROM nginx
# Add the Nginx configuration file
ADD ./nginx/nginx.conf /etc/nginx/nginx.conf
ADD ./nginx/uwsgi_params /etc/nginx/uwsgi_params
# Copy over static assets from the client application
WORKDIR /usr/share/nginx/static/
