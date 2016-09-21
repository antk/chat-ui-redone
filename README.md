app skeleton taken from [ng-seed-mine](https://github.com/antk/ng-seed-mine) which is my slightly modified version of [angular-seed](https://github.com/angular/angular-seed)

###Running locally

####Install homebrew

`$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

####Install Git (if not already installed)

`$ brew install git`

####Install NodeJs (also installs npm)

`$ brew install node`

####Clone this repo

#####ssh
```$ git clone git@github.com:antk/chat-ui-redone.git```

#####https
```$ git clone https://github.com/antk/chat-ui-redone.git```

####Install dependencies

```$ npm install```

####Start server

```$ npm run start-dev```

hit [http://localhost:8001/](http://localhost:8001/)

####Run unity tests

```$ npm test```

####Run e2e tests
on first run
```npm run update-webdriver```
to update WebDriver

then
```npm run protractor```