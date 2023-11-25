import Island from "../classes/Island.js";

class World {
    constructor() {
      this.islands = []; // a good place to keep track of your islands
      this.hookEvents(); // let's kick things of by hooking up events
    }
  
    hookEvents() {
      // hook events like clicking buttons to a specific function
      document.getElementById('btnAddIsland').addEventListener('click', () => this.addIsland(new Island()));
      document.getElementById('btnSave').addEventListener('click', () => this.save());
      document.getElementById('btnLoad').addEventListener('click', () => this.load());
    }
  
    save() {
      // save array islands to localstorage as string
      localStorage.setItem('savedIslands', JSON.stringify(this.islands.map(island => island.name)));
      // loop over all this.islands and save the names
    }
  
    load() {
      // load islands from localstorage into array
      const savedIslands = JSON.parse(localStorage.getItem('savedIslands')) || [];
        this.islands = savedIslands.map(name => new Island(name));
        this.islands.forEach(island => this.addIslandToDOM(island));
      // loop over the array and addIslands()
    }
  
    getCoordinates() {
      // return coordinates within the screen at random, feel free to change it up!
      let randomSign = Math.random() < 0.5 ? -1 : 1;
      return {
        x: ((Math.random() * window.innerWidth) / 2) * randomSign,
        y: ((Math.random() * window.innerHeight) / 2) * randomSign
      };
    }
  
    addIsland(island) {
      // add the islands to the DOM
        const newIsland = island || new Island();
        this.islands.push(newIsland);
        this.addIslandToDOM(newIsland);
        this.moveIsland(newIsland);
        console.log("island added");
    }

    addIslandToDOM(island) {
        const islandElement = document.createElement('div');
        islandElement.className = 'island';
        islandElement.style.backgroundColor = island.color;
        islandElement.innerHTML = island.name;

        // add a click event listener to remove the island
        islandElement.addEventListener('click', () => this.handleIslandClick(island));

        document.getElementById('app').appendChild(islandElement);
    }

    handleIslandClick(island) {
        island.remove();
        this.islands = this.islands.filter(i => i !== island);
        console.log("island removed");
    }
  
    moveIsland(island) {
      // this might be a good point to animate the islands with JS Animations API
    }
  }

  const world = new World();
  