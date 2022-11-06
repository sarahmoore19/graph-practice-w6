// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    this.currentID++;
    this.users[this.currentID] = {"id": this.currentID, "name": name};
    this.follows[this.currentID] = new Set([])
    return this.currentID;
  }

  getUser(userID) {
    if (userID in this.users) return this.users[userID];
    return null;
  }

  follow(userID1, userID2) {
    if (userID1 in this.users && userID2 in this.users) {
      this.follows[userID1].add(userID2);
      return true;
    }
    return false
  }

  getFollows(userID) {
    return this.follows[userID];
  }


  getFollowers(userID) {
    let set = new Set([]);
      for (let ele in this.follows) {
        if (this.follows[ele].has(userID)) {
          set.add(Number(ele));
        }
      }
    return set;
  }

  getRecommendedFollows(userID, degrees) {
    let queue = [[userID]];
    let set = new Set([userID]);
    let newArr = [];
    while(queue.length) {
      let currPath = queue.pop();
      let currNode = currPath[currPath.length - 1];
      if (currPath.length > 2 && currPath.length <= degrees + 2) {
        newArr.push(currNode);
      }
      let follows = this.getFollows(currNode)
      for (let ele of follows) {
        if (!set.has(ele)) {
          queue.unshift([...currPath, ele])
          set.add(ele);
        }
      }
    }
    return newArr;
  }
}

socialNetwork = new SocialNetwork();

module.exports = SocialNetwork;
