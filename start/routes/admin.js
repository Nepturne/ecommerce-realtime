'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  /**
   * Categories resource routes
   */
    Route.resource('categories', 'CategoryController').apiOnly()

    /**
     * Products resource routes
     */
     Route.resource('products', 'ProductController').apiOnly() 

    /**
     *  Coupon Resource routes
     */
     Route.resource('coupons', 'CouponController').apiOnly() 

     /**
     *  Orders Resource routes
     */
      Route.resource('orders', 'OrderController').apiOnly() 

      /**
     *  Image Resource routes
     */
     Route.resource('images', 'ImageController').apiOnly() 

     /**
     *  User Resource routes
     */
      Route.resource('users', 'UserController').apiOnly() 


})
    .prefix('v1/admin')
    .namespace('Admin')