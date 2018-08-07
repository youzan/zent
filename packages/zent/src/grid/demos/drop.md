---
order: 12
zh-CN:
	title: 拖拽排序
	product: 商品
	productName: 商品名
	babyProducts: 母婴商品
	uv: 访问量
	stock: 库存
en-US:
	title: Drop sort
	product: Product
	productName: Product Name
	babyProducts: Baby Products
	uv: uv
	stock: stock
---

```jsx
import { Grid } from 'zent';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const datasets = [];

for (let i = 0; i < 5; i++) {
	datasets.push({
		id: `f-${i}`,
		name: `{i18n.babyProducts} ${i}`,
		uv: 20,
		stock: 5
	})
}

const portal = document.createElement('div');

document.body.appendChild(portal);

// const portal: HTMLElement = document.createElement('div');
// portal.classList.add('my-super-cool-portal');

// if (!document.body) {
//   throw new Error('body not ready for portal creation!');
// }

// document.body.appendChild(portal);

class BodyRow extends React.Component {
	// {...provided.draggableProps.style, height: '51px', display: 'table'}
	getItemStyle(isDragging, draggableStyle) {
		const style = {
			height: '51px',
			// position: 'relative',
			// styles we need to apply on draggables
			...draggableStyle
		}

		return style;
	}

  render() {
		return (<Draggable key={this.props.id} draggableId={this.props.id}>
			{(provided, snapshot) => {
				const usePortal = snapshot.isDragging;

				const child = (<tr
					{...this.props}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					// style={this.getItemStyle(
					// 	snapshot.isDragging,
					// 	provided.draggableProps.style
					// )}
				/>);

				if (!usePortal) {
					return child;
				}

    		// if dragging - put the item in a portal
    		return ReactDOM.createPortal(child, portal);
			}}
		</Draggable>)
  }
}

class Drap extends React.Component {
  constructor(props) {
		super(props);

    this.state = {
      datasets
    };
	}
	
	columns = [
		{
			title: '{i18n.productName}',
			name: 'name',
			className: 'name'
		}, {
			title: '{i18n.uv}',
			name: 'uv'
		}, {
			title: '{i18n.stock}',
			name: 'stock'
		}
	]

	components = {
		row: BodyRow
	}

	onDragEnd = (result) => {
		console.log(result, 'ressssss');
	}

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId="droppable">
					{(provided, snapshot) => (
						<div ref={provided.innerRef}>
							<Grid
								columns={this.columns}
								datasets={this.state.datasets}
								components={this.components}
								rowClassName={(data, index) => `${data.id}-${index}`}
								onRowClick={(data, index, event) => { console.log(data, index, event.target, 'simple onRowClick') }}
								rowProps={(data) => ({
									id: data.id
								})}
							/>
							{provided.placeholder}
						</div>
						// <div
						// 	ref={provided.innerRef}
						// >
						// 	{this.state.datasets.map((item, index) => {
						// 		return (<Draggable key={index} draggableId={index} index={index}>
						// 			{(provided, snapshot) => {
						// 				console.log(provided.draggableProps,'provided.draggableProps');
						// 				console.log(provided.dragHandleProps,'provided.draggableProps');
						// 				return (<li
						// 					ref={provided.innerRef}
						// 					{...provided.draggableProps}
            //           {...provided.dragHandleProps}
						// 				>
						// 					{index}
						// 				</li>
						// 			);
						// 			}}
						// 		</Draggable>)
						// 	})}
						// </div>
					)}
				</Droppable>
			</DragDropContext>
		)
	}

  // render() {
  //   return (
	// 		<DragDropContext onDragEnd={this.onDragEnd}>
	// 			<Droppable droppableId="droppable">
	// 				{(provided, snapshot) => (
	// 					<Grid
	// 						ref={provided.innerRef}
	// 						columns={this.columns}
	// 						datasets={this.state.datasets}
	// 						components={this.components}
	// 						rowClassName={(data, index) => `${data.id}-${index}`}
	// 						onRowClick={(data, index, event) => { console.log(data, index, event.target, 'simple onRowClick') }}
	// 						rowProps={(data, index) => ({
	// 							index,
	// 							key: data.id,
	// 							id: data.id
	// 						})}
	// 					/>
	// 				)}
	// 			</Droppable>
	// 		</DragDropContext>
  //   );
  // }
};

ReactDOM.render(
	<Drap />
	, mountNode
);
```
