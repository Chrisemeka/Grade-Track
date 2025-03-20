<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
// $routes->post('/register', 'API\AuthController::register');
$routes->post('/api/data', 'API\AuthController::postData');


$routes->group('api', function($routes) {
  $routes->post('register', 'API\AuthController::register');
  $routes->post('login', 'API\AuthController::login');
  $routes->post('logout', 'API\AuthController::logout');
  $routes->post('createClass', 'API\LecturerController::createClass');
  $routes->get('lecturer/classes', 'API\LecturerController::getLecturerClasses');

});
