FROM registry.lets-byte.it/byteit/docker/php-laravel:8.1 as RUN

COPY . /var/www/html
COPY ./scripts/pre /var/scripts/pre
RUN chmod +x /var/scripts/*/*.sh

RUN php artisan vendor:publish --tag=public
