const items = document.querySelectorAll('.item');
const treeContainer = document.getElementById('tree-container');
const tree = document.getElementById('tree');
const undoButton = document.getElementById('undo-button');
const redoButton = document.getElementById('redo-button');
const musicButton = document.getElementById('music-button');

let history = [];
let redoStack = [];
let offsetX, offsetY;
let isMusicPlaying = false;
const audio = new Audio('music.mp3');


items.forEach(item => {
  item.addEventListener('dragstart', dragStart);
});

treeContainer.addEventListener('dragover', dragOver);
treeContainer.addEventListener('drop', drop);

function dragStart(event) {
  const rect = event.target.getBoundingClientRect();
  offsetX = event.clientX - rect.left;
  offsetY = event.clientY - rect.top;

  event.dataTransfer.setData('text/plain', event.target.id);
  const img = new Image();
  img.src = '';
  event.dataTransfer.setDragImage(img, 0, 0);
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const itemId = event.dataTransfer.getData('text/plain');
  const item = document.getElementById(itemId);

  const newItem = item.cloneNode(true);
  newItem.style.position = 'absolute';

  const rect = treeContainer.getBoundingClientRect();
  newItem.style.left = `${event.clientX - rect.left - offsetX}px`;
  newItem.style.top = `${event.clientY - rect.top - offsetY}px`;

  tree.appendChild(newItem);
  history.push(newItem);
  redoStack = [];
}


undoButton.addEventListener('click', () => {
  if (history.length > 0) {
    const lastItem = history.pop();
    redoStack.push(lastItem);
    tree.removeChild(lastItem);
  }
});


redoButton.addEventListener('click', () => {
  if (redoStack.length > 0) {
    const lastItem = redoStack.pop();
    tree.appendChild(lastItem);
    history.push(lastItem);
  }
});


musicButton.addEventListener('click', () => {
  if (isMusicPlaying) {
    audio.pause();
    musicButton.textContent = '🎵';
  } else {
    audio.play();
    musicButton.textContent = '⏸️';
  }
  isMusicPlaying = !isMusicPlaying;
});
