// write in a function thats a X by X array of arrays of numbers
// as well two x/y combinations and have it return the shortest
// length (you don't need to track the actual path) from point A
// to point B.
//
// the numbers in the maze array represent as follows:
// 0 – open space
// 1 - closed space, cannot pass through. a wall
// 2 - one of the two origination points
//
// you will almost certainly need to transform the maze into your own
// data structure to keep track of all the meta data

// this is a little tool I wrote to log out the maze to the console.
// it is opinionated of how to do that and you do not have to do it
// the way I did. however feel free to use it if you'd like
// const logMaze = require("./logger");

function findShortestPathLength(maze, [xA, yA], [xB, yB]) {
  // dup maze
  const pathGrid = new Array(maze.length)
    .fill()
    .map(() => new Array(maze.length));

  for (let i = 0; i < pathGrid.length; i++) {
    for (let j = 0; j < pathGrid[i].length; j++) {
      pathGrid[i][j] = {
        block: maze[i][j] === 1,
        dist: 0,
        parent: "",
        x: j,
        y: i
      };
    }
  }

  pathGrid[yA][xA].parent = "A";
  pathGrid[yB][xB].parent = "B";

  console.log("dm", pathGrid);

  let aQueue = [pathGrid[yA][xA]];
  let bQueue = [pathGrid[yB][xB]];

  let currDist = 0;

  while (aQueue.length && bQueue.length) {
    currDist++;

    let aChildren = [];

    while (aQueue.length) {
      const thisNode = aQueue.shift();
      aChildren = aChildren.concat(getChildren(pathGrid, thisNode));
    }

    for (let i = 0; i < aChildren.length; i++) {
      const child = aChildren[i];
      if (child.parent === "B") {
        return child.dist + currDist;
      } else if (child.parent === "") {
        child.dist = currDist;
        child.parent = "A";
        pathGrid[child.y][child.x].dist = currDist;
        pathGrid[child.y][child.x].parent = "A";
        aQueue.push(child);
      }
    }

    let bChildren = [];

    while (bQueue.length) {
      const thisNode = bQueue.shift();
      bChildren = bChildren.concat(getChildren(pathGrid, thisNode));
    }

    for (let i = 0; i < bChildren.length; i++) {
      const child = bChildren[i];
      if (child.parent === "A") {
        return child.dist + currDist;
      } else if (child.parent === "") {
        child.dist = currDist;
        child.parent = "B";
        pathGrid[child.y][child.x].dist = currDist;
        pathGrid[child.y][child.x].parent = "B";
        bQueue.push(child);
      }
    }
  }

  return -1;
}

function getChildren(pathGrid, node) {
  let res = [];
  if (node.y - 1 >= 0 && !pathGrid[node.y - 1][node.x].block) {
    res.push(pathGrid[node.y - 1][node.x]);
  }

  if (node.y + 1 < pathGrid.length && !pathGrid[node.y + 1][node.x].block) {
    res.push(pathGrid[node.y + 1][node.x]);
  }

  if (node.x - 1 >= 0 && !pathGrid[node.y][node.x - 1].block) {
    res.push(pathGrid[node.y][node.x - 1]);
  }

  if (node.x + 1 < pathGrid[0].length && !pathGrid[node.y][node.x + 1].block) {
    res.push(pathGrid[node.y][node.x + 1]);
  }

  return res;
}

// there is a visualization tool in the completed exercise
// it requires you to shape your objects like I did
// see the notes there if you want to use it

// unit tests
// do not modify the below code
describe("pathfinding – happy path", function () {
  const fourByFour = [
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2]
  ];
  it("should solve a 4x4 maze", () => {
    expect(findShortestPathLength(fourByFour, [0, 0], [3, 3])).toEqual(6);
  });

  const sixBySix = [
    [0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0]
  ];
  it.skip("should solve a 6x6 maze", () => {
    expect(findShortestPathLength(sixBySix, [1, 1], [2, 5])).toEqual(7);
  });

  const eightByEight = [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 2, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 2]
  ];
  it.skip("should solve a 8x8 maze", () => {
    expect(findShortestPathLength(eightByEight, [1, 7], [7, 7])).toEqual(16);
  });

  const fifteenByFifteen = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  it.skip("should solve a 15x15 maze", () => {
    expect(findShortestPathLength(fifteenByFifteen, [1, 1], [8, 8])).toEqual(
      78
    );
  });
});

// I care far less if you solve these
// nonetheless, if you're having fun, solve some of the edge cases too!
// just remove the .skip from describe.skip
describe("pathfinding – edge cases", function () {
  const byEachOther = [
    [0, 0, 0, 0, 0],
    [0, 2, 2, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0]
  ];
  it("should solve the maze if they're next to each other", () => {
    expect(findShortestPathLength(byEachOther, [1, 1], [2, 1])).toEqual(1);
  });

  const impossible = [
    [0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0],
    [0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 2]
  ];
  it("should return -1 when there's no possible path", () => {
    expect(findShortestPathLength(impossible, [1, 1], [4, 4])).toEqual(-1);
  });
});
