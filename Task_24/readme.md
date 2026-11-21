# React Hello World (without Vite)

A minimal "Hello, World!" React app set up manually with **Webpack** and **Babel**, with no Vite and no Create React App.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm (comes with Node.js)

Check your versions:

```bash
node -v
npm -v
```

## Project Structure

```
hello-react/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   └── index.jsx
├── .babelrc
├── package.json
├── webpack.config.js
└── README.md
```

## Setup From Scratch

### 1. Create the project

```bash
mkdir hello-react
cd hello-react
npm init -y
```

### 2. Install dependencies

```bash
npm install react react-dom
npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin babel-loader @babel/core @babel/preset-env @babel/preset-react
```

### 3. Create `public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello React</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

### 4. Create `src/App.jsx`

```jsx
export default function App() {
  return <h1>Hello, World!</h1>;
}
```

### 5. Create `src/index.jsx`

```jsx
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

### 6. Create `.babelrc`

```json
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}
```

The `automatic` runtime means you don't need `import React from "react"` in every file.

### 7. Create `webpack.config.js`

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
};
```

### 8. Add scripts to `package.json`

```json
"scripts": {
  "start": "webpack serve --mode development",
  "build": "webpack --mode production"
}
```

## Running the App

Start the development server:

```bash
npm start
```

Your browser will open [http://localhost:3000](http://localhost:3000) and show **Hello, World!**. Edits to files in `src/` reload automatically.

## Building for Production

```bash
npm run build
```

The optimized output is written to the `dist/` folder, ready to deploy to any static host.

## Troubleshooting

- **`Module not found: Can't resolve './App'`**: make sure `resolve.extensions` in `webpack.config.js` includes `.jsx`.
- **`You may need an appropriate loader`**: check that `.babelrc` exists and the Babel packages are installed.
- **Port 3000 already in use**: change `devServer.port` in `webpack.config.js`.

## Next Steps

- Add CSS support with `style-loader` and `css-loader`
- Add TypeScript with `ts-loader` or `@babel/preset-typescript`
- Add routing with [React Router](https://reactrouter.com/)

## License

MIT