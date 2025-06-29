const treeArea = document.getElementById("tree-area");

let draggedItem = null;
let selectedNodes = [];
let connections = [];
let lines = [];
let nodesInTree = [];

// Add event listeners to all draggable items
document.querySelectorAll(".draggable").forEach(item => {
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragend", handleDragEnd);
});

// Setup event listeners for the tree area
treeArea.addEventListener("dragover", handleDragOver);
treeArea.addEventListener("drop", handleDrop);

// Export any variables or functions that you want to use in another file
// export { draggedItem, selectedNodes, connections, lines, nodesInTree };
// Handle when an item starts being dragged
function handleDragStart(e) {
    draggedItem = this;
    // enable data transfer for compatibility
    e.dataTransfer.setData("text/plain", "");
    setTimeout(() => this.classList.add("hidden"), 0);
}

// Handle when dragging ends
function handleDragEnd(e) {
    // Only unhide on drag end; keep draggedItem until drop
    this.classList.remove("hidden");
}

// Allow items to be dragged over the tree area
function handleDragOver(e) {
    e.preventDefault();
}

// Handle when an item is dropped in the tree area
function handleDrop(e) {
    e.preventDefault();
    if (!draggedItem) return;  // No item, skip
    const dropX = e.clientX - treeArea.offsetLeft;
    const dropY = e.clientY - treeArea.offsetTop;
    const itemType = draggedItem.getAttribute("data-type");
    if (itemType === "node") {
        let value = prompt("Enter name of this node");
        if (value != null && value.trim() !== "") {
            draggedItem.setAttribute("data-value", value);
            createNode(dropX, dropY, value);
            nodesInTree.push(value);
        }
    }
    // restore source visibility and clear
    draggedItem.classList.remove("hidden");
    draggedItem = null;
}