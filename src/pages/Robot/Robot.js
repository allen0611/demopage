import React, { Component } from 'react';
import './Robot.scss';

class RobotGrid extends Component {
  constructor() {
    super();
    this.state = {
      grid: this.initializeGridWithObstacles(),
    };
    this.state.robot = new Robot(this.state.grid);
  }

  initializeGridWithObstacles() {
    return Array.from({ length: 100 }, (_, index) => {
      const rowIndex = Math.floor(index / 10);
      const cellIndex = index % 10;
      const obstacleIndex = Math.floor(Math.random() * 10);

      if (cellIndex === obstacleIndex && rowIndex !== 0) {
        return { type: 'obstacle' };
      } else {
        return null;
      }
    });
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
    this.updateGrid();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    const { robot } = this.state;
    switch (event.key) {
      case 'ArrowUp':
        robot.moveForward();
        break;
      case 'ArrowLeft':
        robot.turnLeft();
        break;
      case 'ArrowRight':
        robot.turnRight();
        break;
      case 'ArrowDown':
        robot.flipDirection();
        break;
      default:
        return;
    }
    this.updateGrid();
  };

  updateGrid = () => {
    const { robot } = this.state;
    const newGrid = this.state.grid.map((cell, index) => {
      if (robot.y * 10 + robot.x === index) {
        return { type: 'robot', direction: robot.direction };
      } else if (cell && cell.type === 'obstacle') {
        return { type: 'obstacle' };
      }
      return null;
    });

    this.setState({ grid: newGrid });
  };

  render() {
    const { grid } = this.state;
    const arrowIcons = ['🔼', '▶️', '🔽', '◀️'];

    return (
      <div className='robot-grid'>
        <div className="grid">
          {Array.from({ length: 10 }, (_, rowIndex) => {
            return (
              <div key={rowIndex} className="column">
                {grid.slice(rowIndex * 10, rowIndex * 10 + 10).map((cell, cellIndex) => {
                  const index = rowIndex * 10 + cellIndex;
                  const content = (() => {
                    if (cell && cell.type === 'robot') {
                      return <span className="robot">{arrowIcons[cell.direction]}</span>;
                    }
                    return null;
                  })();

                  return (
                    <div key={index} className={`cell${cell && cell.type === 'obstacle' ? ' obstacle' : ''}`}>
                      {content}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className='controls'>
          <button onClick={() => { this.state.robot.moveForward(); this.updateGrid(); }}>▲<span className='label'>Move forward</span></button>
          <div class="break"></div>
          <button onClick={() => { this.state.robot.turnLeft(); this.updateGrid(); }}>◄<span className='label'>Turn left</span></button>
          <button onClick={() => { this.state.robot.flipDirection(); this.updateGrid(); }}>▼<span className='label'>Flip direction</span></button>
          <button onClick={() => { this.state.robot.turnRight(); this.updateGrid(); }}>►<span className='label'>Turn right</span></button>
        </div>
      </div>
    );
  }
}

class Robot {
    constructor(grid) {
      this.x = 0; // x position in the grid
      this.y = 0; // y position in the grid
      this.direction = 1; // direction index (0: up, 1: right, 2: down, 3: left)
      this.grid = grid; // Add the grid reference
    }
  
    turnRight() {
      this.direction = (this.direction + 1) % 4; // cycle through direction indices
    }
  
    turnLeft() {
      this.direction = (this.direction + 3) % 4; // cycle through direction indices in reverse order
    }
  
    moveForward() {
      const movements = [
        [0, -1], // up
        [1, 0], // right
        [0, 1], // down
        [-1, 0], // left
      ];
    
      const [dy, dx] = movements[this.direction];
      const newY = this.y + dy;
      const newX = this.x + dx;
    
      const isWithinGrid = (x, y) => x >= 0 && x < 10 && y >= 0 && y < 10;
      const isNotObstacle = (x, y) => {
        const cell = this.grid[y * 10 + x];
        return !cell || cell.type !== 'obstacle';
      };
    
      if (isWithinGrid(newX, newY) && isNotObstacle(newX, newY)) {
        this.x = newX;
        this.y = newY;
      } else {
        // Temporarily turn right and check the next position in that direction
        this.turnRight();
        const [nextDy, nextDx] = movements[this.direction];
        const nextNewY = this.y + nextDy;
        const nextNewX = this.x + nextDx;
    
        // If there's a wall or obstacle in the next position after turning right, turn left instead
        if (!isWithinGrid(nextNewX, nextNewY) || !isNotObstacle(nextNewX, nextNewY)) {
          this.turnLeft();
          this.turnLeft();
        }
      }
    }
  
    flipDirection() {
      this.direction = (this.direction + 2) % 4;
    }
  }  

export default RobotGrid;
