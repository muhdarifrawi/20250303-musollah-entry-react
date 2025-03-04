## Setting Up
1. Install webpack: 
```bash
npx create-electron-app@latest my-new-app --template=webpack
```
Remove `my-new-app` if you want to install it in current folder.

2. Install the following dependencies:
```bash
npm install --save-dev @babel/core @babel/preset-react babel-loader
```

3. Install React dependencies:
```bash
npm install --save react react-dom
```

4. Add React Bootstrap:
```bash
npm install react-bootstrap bootstrap
```

Add `import 'bootstrap/dist/css/bootstrap.min.css';` into `app.jsx`.

Ensure that each component has:
```js
import React from 'react';
import { useState } from 'react';
```

The `React` import must be standalone.

## Running The App
To run the app, type the following:
```bash
npm start
```

## Sources
Installing Electron Webpack: https://www.electronforge.io/templates/webpack-template
Installing React Dependencies in Electron: https://www.electronforge.io/guides/framework-integration/react