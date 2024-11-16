// main.js
import './style.css';
import { setupDiceRoller } from './diceRoller.js';
import OBR from "@owlbear-rodeo/sdk";

document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelector('#app').innerHTML = `
    <div class="container" id="container">
      <div class="controls">
        <input type="text" id="attackCommand" class="code-font" placeholder="e.g. 5<n/a/d>+4 vs 16 dmg 2d6fi+3bl+1d4" />
        <button id="rollButton" title="Roll">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
          </svg>
        </button>
        <div class="options">
          <label>
            <input type="checkbox" id="hiddenRoll" />
            Hidden
          </label>
          <label>
            <input type="checkbox" id="physicalRoll" />
            Physical
          </label>
          <label>
          <label>
            <input type="range" id="physicalSlider" min="0" max="100" value="50" />
          </label>
        </div>
      </div>
      <div class="history" id="history"></div>
    </div>
  `;
  OBR.onReady(() => OBR.player.getId().then((userId) => {
    setupDiceRoller(userId);
  }));
});
