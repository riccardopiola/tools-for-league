# League Tools

## TODO
- Finish ConfigSwapper
- Rebuild League Flash (https://github.com/riccardopiola/LeagueFlash)

## Installation info
`$ yarn install` DON'T use `$ npm install`

go to the `/app` folder and delete the `app/node_modules` folder

run `$ yarn install` in the `/app` directory

run `node_modules/.bin/electron-rebuild` in the `/app` dir **on Mac**

run `node_modules/.bin/electron-rebuild.cmd` in the `/app` dir **on Windows**

## Commands
`npm run dev` to start the development server with HOT reloading
`npm run package` to package the application for the current platform

## Known issues
There are some bugs on Windows regarding the ping command.
I think they are due to the npm native dependency I use to ping: `net ping`

It usually works on Windows if you select "Quick test" and you relaunch the application after every ping attempt
