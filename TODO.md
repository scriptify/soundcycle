# Soundcycle: TODOs

## Bugs to fix
- Add dispose functionality to the AudioLooper module --> Then use this functionality when deleting lane
- Stores: When a lane is deleted, delete all according tracks

## New Features
- Auto switch to "ADD_TO_LANE"-mode when a new lane was created!

## Modules: General
- Better build step: minified/not-minified version
- Add linting to every module
- Add testing to the modules
- AudioLooper documentation: change function 'remove' to 'removeTrack'
- AudioLooper: removing track causes thread to throw an exception (can't read currentPercentualTime of undefined) --> Then add real functionality to the api again!
- AudioLooper: Improve timing, with performance.mark; New looping algorithm?

## UI TODOs
- Make ALL Inputs controlled!
- Enhance modularization of React-Components
- Enhance CSS (no duplications!)

## Controls
- Add good keyboard controls

## App: General
- Add UI-testing
- Introduce UI-benchmarks of all kinds --> What can be done better?
- Make it a PWA (ServiceWorkers etc.)
- Add linting
