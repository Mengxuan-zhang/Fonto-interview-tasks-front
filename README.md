## Project dependencies/tools/language Guideline

antd: version 4.x
https://ant.design/docs/react/introduce

Typescript: 4.x
https://www.typescriptlang.org/docs/handbook/intro.html

React: version 16.x
https://reactjs.org/docs/getting-started.html

Redux-saga:
https://redux-saga.js.org/docs/introduction/GettingStarted

Test-library:
https://testing-library.com/docs/

MDN
https://developer.mozilla.org/en-US/docs/Web/JavaScript



## Use bash
### Install dependencies
```bash
$ npm install
```

### Launch React APP
```bash
$ npm start    # visit http://localhost:8000
```
### Run test 
```bash
npm test 
```

## Site Structure 
``` js
├── package.json
├── .umirc.ts
├── .env
├── dist
├── mock
├── public
└── src
    ├── global.less
    ├── interface
    │   └── property.d.ts
    ├── models
    │   └── property.ts
    ├── pages
    │   ├── index.less
    │   ├── index.tsx
    │   └── property
    │       ├── components
    │       │   ├── PropertyModal.less
    │       │   ├── PropertyModal.test.js
    │       │   └── PropertyModal.tsx
    │       ├── index.less
    │       └── index.tsx
    ├── service
    │   └── property.ts
    └── utils
        ├── changeMoneyFormat.ts
        ├── matchMedia.js
        ├── request.ts
        └── utils.less
```
