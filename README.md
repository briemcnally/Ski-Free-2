# Ski Free 2
[Play Here!](https://briemcnally.github.io/Ski-Free-2/)
## Summary

Ski Free two is a browser game inspired by the 1990s Microsoft game. The object of the game is for the player to control the skier and avoid obstacles on the mountain. The obstacles include rocks, trees, and an Admominable Snow Monster that chases the skier after each run. In the original game there are three modes: slolam, free style, and tree slalom. For the purposes of this project this game will only have the tree slolam mode.


## Functionality & MVP
In Ski Free 2 players will be able to:
- [ ] Control the skier with keyboard commands
- [ ] Collide into obstacles including: trees, rocks, and bears
- [ ] Listen to music while skiing

Other features will include:
- [ ] Clean styling with visual updates from the original 1990s game
- [ ] Music
- [ ] Instructions on how to play
- [ ] Increasing difficulty over time

## Wireframes
This game will be a single screen game. It will include details about how to play, as well as start/pause buttons, and mute button.

![alt-text](https://i.imgur.com/9kfZ1A1.gif)

## Architecture & Technologies
This project will be implemented with the following technologies:
* Vanilla Javascript for overall structure
* HTML5 Canvas for DOM manipulation and rendering
* Webpack to bundle and serve up various scripts

Architecture:
* `game.js`: Entry file. This script will house the primary logic for the game including functions for rendering, starting, stopping and pausing the game.
* `player.js`: This script manages the logic for the player
* `monster.js`: This script will handle details for handling the logic and rending of the snow monster
* `rock.js`: This script manages the creation of a rock object
* `rock_manager.js`: This script manages the placement of rocks on the animation frame
* `tree.js`: This script manages the creation of a tree object
* `tree_manager.js`: This script manages the placement of trees on the animation frame and contains logic for increased forest density as game progresses

## Implementation Timeline

##### Over the weekend:
- [ ] Review tutorials and research building Javascript games and collisions

**Day 1** : Set up basic framework for the game including Node modules and webpack. Write entry file and set up the framework for all scripts as defined above. Understand how to render objects to the `Canvas` element. Review collision physics for game.
- [ ] Configure webpack and node modules
- [ ] Set up file framework
- [ ] Review and understand collision physics
- [ ] Find graphics for visualization of rocks, trees, skier, and snow monster
- [ ] Create rules for the game

**Day 2**: Finish the `game.js` to render with static images and set up set interval to change frames on page.
- [ ] Understand how to change skier graphic on collision
- [ ] Create and write collision code
- [ ] Write physics for the snow monster to catch skier

**Day 3**: Add level logic to the backend
- [ ] Add more obstacles as the game proceeds on after a certain point
- [ ] Create backend logic to create levels
- [ ] Have a functional working screen rendering static images and scrollable movement


**Day 4**: Add controls for the player and polish the front end design.
- [ ] Ensure all features are working as intended
- [ ] Polish styling

## Bonus Features
Ideas for future development include:
- [ ] Adding player high scores
- [ ] Creating different modes: freestyle and regular slolam
- [ ] Improved graphics for collisions and when caught by Abominable Snow Monster
