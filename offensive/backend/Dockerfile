# Build Stage
FROM registry.lets-byte.it/byteit/docker/php-composer:8.1 as BUILD

WORKDIR /app
COPY ["composer.json", "composer.lock", "/app/"]

RUN composer install --no-interaction --optimize-autoloader --no-progress --ignore-platform-reqs --no-dev --no-scripts

COPY . /app

# Run Stage
FROM registry.lets-byte.it/byteit/docker/php-laravel:8.1 as RUN

COPY --from=BUILD /app /var/www/html

RUN php artisan vendor:publish --tag=public
