# Soundcycle: TODOs

## Bugs to fix
- Add dispose functionality to the AudioLooper module --> Then use this functionality when deleting lane
- Stores: When a lane is deleted, delete all according tracks
- Delay: remove last valuetype
- Bitcrusher: remove last valuetype

## New Features
- Auto switch to "ADD_TO_LANE"-mode when a new lane was created!
- Add good keyboard controls

## Modules: General
- Better build step: minified/not-minified version
- Add linting to every module
- Add testing to the modules
- AudioLooper documentation: change function 'remove' to 'removeTrack'
- AudioLooper: removing track causes thread to throw an exception (can't read currentPercentualTime of undefined) --> Then add real functionality to the api again!
- AudioLooper: pauseing song causes exception

## UI TODOs
- Make ALL Inputs controlled!
- Enhance modularization of React-Components
- Enhance CSS (no duplications!)
- Add effect type: single

## App: General
- Add UI-testing
- Introduce UI-benchmarks of all kinds --> What can be done better?
- Make it a PWA (ServiceWorkers etc.)
- Add linting

## Audio issues
- horrible noise? --> test on with other mics/speakers!
