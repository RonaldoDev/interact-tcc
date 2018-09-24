import style from "../custom.scss"
import interact from "interactjs";

var elements = document.getElementsByClassName('grid-snap'),
  x = 0, y = 0;
  let xis;
  let ip;
const makeDraggable = (elements) => {
  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    console.log(element);
    interact(element)
      .draggable({
        snap: {
          targets: [
            interact.createSnapGrid({ x: 10, y: 10 })
          ],
          range: Infinity,
          relativePoints: [{ x: 0, y: 0 }]
        },
        inertia: true,
        restrict: {
          restriction: element.parentNode,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
          endOnly: true
        }
      })
      .on('dragmove', function (event) {
        x += event.dx;
        y += event.dy;

        event.target.style.webkitTransform =
          event.target.style.transform =
          'translate(' + x + 'px, ' + y + 'px)';
          xis = x;
          ip = y;
      }).resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: false, top: false },
    
        // keep the edges inside the parent
        restrictEdges: {
          outer: 'parent',
          endOnly: true,
        },
    
        // minimum size
        restrictSize: {
          min: { width: 100, height: 50 },
        },
    
        inertia: true,
      })
      .on('resizemove', function (event) {
        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);
       
        // update the element's style
        target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';
    
        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;
        target.style.webkitTransform = target.style.transform =
            'translate(' + xis + 'px,' + ip + 'px)';
    
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
       // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
      });;
  }
  
}
  
makeDraggable(elements);