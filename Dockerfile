FROM php:8.4.3-fpm AS base

RUN chown -R www-data:www-data /var/www

WORKDIR /var/www

ENV PHP_OPCACHE_ENABLE="0" \
    PHP_OPCACHE_VALIDATE_TIMESTAMPS="0" \
    PHP_OPCACHE_MAX_ACCELERATED_FILES="10000" \
    PHP_OPCACHE_MEMORY_CONSUMPTION="192" \
    PHP_OPCACHE_MAX_WASTED_PERCENTAGE="10" \
    PHP_OPCACHE_JIT_BUFFER_SIZE="0" \
    PHP_OPCACHE_JIT="0" \
    COMPOSER_ALLOW_SUPERUSER=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    sqlite3

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*docker

# Install PHP extensions
RUN docker-php-ext-install mbstring exif pcntl bcmath sockets opcache pdo

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
COPY docker/php/conf.d/opcache.ini /usr/local/etc/php/conf.d/opcache.ini
COPY docker/php/conf.d/realpath.ini /usr/local/etc/php/conf.d/realpath.ini

USER www-data