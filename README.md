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

## Running The App
To run the app, type the following:
```bash
npm start
```

## Sources
Installing Electron Webpack: https://www.electronforge.io/templates/webpack-template
Installing React Dependencies in Electron: https://www.electronforge.io/guides/framework-integration/react