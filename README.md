# Aplikacija za online aukcije

Aplikacija omogucava korisnicima da se takmice na aukcijama. Svaka aukcija ima  vremenski period u kome se desava kao i proizvod koji se licitira.

Obican korisnik moze samo da pretrazuje i vrsi licitacije.

Administrator moze i da kreira, menja i brise aukcije i proizvode.

## Potreban softver

* Node
* PHP
* Composer
* Xampp

## Setup servera

* Potrebno je kreirati bazu sa nazivom auctions
* Izvrsiti na komandnoj liniji `composer install`
* Izvrsiti na komandnoj liniji `php artisan migrate`
* Izvrsiti na komandnoj liniji `php artisan db:seed`
* Izvrsiti na komandnoj liniji `php artisan serve`

## Setup klijenta

* Izvrsiti na komandnoj liniji `npm install`
* Izvrsiti na komandnoj liniji `npm start`

Aplikacija ce se otvoriti na http://localhost:3000

