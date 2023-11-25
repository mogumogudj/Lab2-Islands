import Island from "../classes/Island.js";

export default class World {
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
      localStorage.setItem('savedIslands', JSON.stringify(this.islands.map(island => ({ name: island.name, color: island.color }))));
      // loop over all this.islands and save the names
      console.log("island(s) saved");
    }
  
    load() {
        // load islands from local storage into array
        const savedIslands = JSON.parse(localStorage.getItem('savedIslands')) || [];
        this.islands = savedIslands.map(islandData => new Island(islandData.name, islandData.color));
        this.islands.forEach(island => {
          const coordinates = this.getCoordinates(); // Generate random coordinates
          this.addIslandToDOM(island, coordinates);
          console.log("island(s) loaded");
        });
      }
  
    getCoordinates() {
      // return coordinates within the screen at random, feel free to change it up!
      const islandSize = 500;

  // Calculate the maximum coordinates to ensure islands stay within the visible window
  const maxX = window.innerWidth - islandSize;
  const maxY = window.innerHeight - islandSize;

  // Generate random coordinates within the visible window
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  return { x, y };
    }
  
    addIsland(island) {
      // add the islands to the DOM
        const newIsland = island || new Island();
        this.islands.push(newIsland);

        const coordinates = this.getCoordinates();
        const islandElement = this.addIslandToDOM(newIsland, coordinates);
        
        console.log("island added");
        this.moveIsland(islandElement);
    }

    addIslandToDOM(island, coordinates) {
        const islandElement = document.createElement('div');
        islandElement.className = 'island';
        islandElement.setAttribute('data-name', island.name);
        islandElement.innerHTML = island.name;

        // set the initial position of the island
        const islandSize = 100;
        islandElement.style.width = islandSize + 'px';
        islandElement.style.height = islandSize + 'px';

        islandElement.style.transform = `translate(${coordinates.x}px, ${coordinates.y}px) scale(0.5)`;


        // add a click event listener to remove the island
        islandElement.addEventListener('click', () => this.handleIslandClick(island));

        document.getElementById('app').appendChild(islandElement);
        // log the ufo image
        console.log(islandElement.style.backgroundImage);
        return islandElement;
    } 

    handleIslandClick(island) {
        const islandElement = document.querySelector(`.island[data-name="${island.name}"]`);

        if(islandElement) {
            islandElement.classList.add('island-fade-out');
            islandElement.addEventListener('animationend', () => {
                islandElement.remove();

                this.islands = this.islands.filter(i => i !== island);
                console.log("island removed");
        });
        }
    }
  
    moveIsland(islandElement) {
        if(islandElement && islandElement.animate) {
        // move the islands to a random position
        const finalCoordinates = this.getCoordinates();

      // this might be a good point to animate the islands with JS Animations API
      islandElement.animate([
        { transform: `translate(${finalCoordinates.x}px, ${finalCoordinates.y}px) scale(0.5)` },
      ], {
        duration: 1000,
        easing: 'ease-in-out',
        fill: 'forwards'
      });
      console.log(finalCoordinates);
        }
  }
}