import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export default function withDnd(component) {
  return DragDropContext(HTML5Backend)(component);
}
