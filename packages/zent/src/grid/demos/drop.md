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

class BodyRow extends React.Component {
	getItemStyle(isDragging, draggableStyle) {
		const style = {
			height: '51px',
			...draggableStyle
		}

		return style;
	}

  render() {
		return (<Draggable key={this.props.id} draggableId={this.props.id}>
			{(provided, snapshot) => {
				return (<tr
					{...this.props}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					style={this.getItemStyle(
						snapshot.isDragging,
						provided.draggableProps.style
					)}
				/>);
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
					)}
				</Droppable>
			</DragDropContext>
		)
	}
};

ReactDOM.render(
	<Drap />
	, mountNode
);
```
