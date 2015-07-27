/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered

    // Manually generate the calculator operations request
    document.querySelector("iron-ajax").generateRequest()
    app.user_input = document.querySelector("paper-input")
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onMenuSelect = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

  // Push a single number into the calculator display
  app.pushNumber = function(e) {
    var num = e.target.innerText
    if (app.reset_next_number) {
      app.user_input.value = num
      app.reset_next_number = false
    } else {
      app.user_input.value += num
    }
  };

  // Push the equals button
  app.pushEquals = function(e) {
    var result = app.calculateResult(app.user_input.label + app.user_input.value)
    app.user_input.value = result
    app.user_input.label = ""
    app.reset_next_number = true
  };

  // Push the equals button
  app.calculateResult = function(infix_string) {
    var clean = infix_string.replace(/\s/g, "")
    console.log(clean)
    var r = Shunt.parse(clean)
    return r
  };

  // Push the all clear "AC" button
  app.pushAC = function() {
    app.user_input.label = ""
    app.user_input.value = ""
  };

    // Push a single number into the calculator display
  app.math_function = function(e){
    var operation = e.target.parentNode.operation
    var num_args = e.target.parentNode.arguments
    if (num_args==0) {
      $.ajax("http://calctest.iesim.biz/" + operation, {async: false})
        .done(function(json){
           app.user_input.value = json.result
        })
    } else if (num_args==1) {
      $.ajax("http://calctest.iesim.biz/" + operation + "&op1=" + app.user_input.value, {async: false})
        .done(function(json){
           app.user_input.value = json.result
        })
    } else if (app.reset_next_label) {
      app.user_input.label = app.user_input.value +  + e.target.parentNode.textContent
    } else {
      app.user_input.label = app.user_input.label + app.user_input.value + e.target.parentNode.textContent
    }
    app.reset_next_number = true

  };

  // Configure the calculator using the available operations
  app.handleAvailableOperations = function(request) {
    var operations = request.detail.response;

    for (var i = 0; i < operations.length; i++) {
      var newButton = document.createElement('paper-button');
      // Remove upper case
      Polymer.dom(newButton).setAttribute("class", "math-function-button");
      // Make them pop
      Polymer.dom(newButton).setAttribute("raised");
      // Assign event math function
      newButton.onclick = this.math_function
      // Set number of arguments
      newButton.arguments = operations[i].arguments
      // Set operation
      newButton.operation = operations[i].operation
      // Give each button some helper text on hover
      Polymer.dom(newButton).setAttribute("title", operations[i].description)
      Polymer.dom(newButton).textContent = operations[i].symbol
      var displayRow = i%4
      var currentDiv = document.querySelectorAll(".button-row")[displayRow]
      Polymer.dom(currentDiv).appendChild(newButton)
    }
  };



})(document);
