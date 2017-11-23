# Angular 5 Universal Starter

Based on Angular CLI, Server side rendering (Universal), Universal cache and cookies, PreBoot, Gzip

### Quick start

```bash
git clone https://github.com/vidinev/angular5start.git

# change directory to our repo
cd angular5start

# install the repo with npm
npm install
```

## Development server

```bash
npm start
# Navigate to http://localhost:4200/
```

The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Universal Build
```bash
npm run build:ssr

# If you want to serve universal application:
npm run serve:ssr
```
## Simple build
```bash
npm run build
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

Before running the tests make sure you are serving the app via `ng serve`.

## Tools
Use `BaseComponent` for automatically unsubscribe observables.

Use `ControlMessagesComponent` to display error messages of reactive form controls 

For server rendering check:
 ```bash
  constructor(private platform: PlatformService) { }
  
  # Check is browser
  this.platform.isBrowser()
  
  # Check is server
  this.platform.isServer()
 ```

