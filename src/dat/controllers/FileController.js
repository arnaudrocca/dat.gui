/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

import Controller from './Controller';
import dom from '../dom/dom';

/**
 * @class Provides a file input.
 *
 * @extends dat.controllers.Controller
 *
 * @param {Object} object The object to be manipulated
 * @param {string} property The name of the property to be manipulated
 */
class FileController extends Controller {
  constructor(object, property) {
    super(object, property);

    const _this = this;

    function onChange(e) {
        const fileReader = new FileReader()
        fileReader.addEventListener('load', function() {
            const dataURL = fileReader.result
            _this.fire(dataURL);
        })

        const file = e.target.files[0]
        fileReader.readAsDataURL(file)
    }

    this.__input = document.createElement('input');
    this.__input.setAttribute('type', 'file');

    dom.bind(this.__input, 'change', onChange, false);

    this.domElement.appendChild(this.__input);
  }

  fire(dataURL) {
    this.getValue().call(this.object, dataURL);
  }
}

export default FileController;
