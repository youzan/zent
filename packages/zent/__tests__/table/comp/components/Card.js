import React, { Component } from 'react';

class CardComponent extends Component {
  getTitle() {
    return (
      <a className="card__title" href={this.props.data.url}>
        {this.props.data.title}
      </a>
    );
  }

  render() {
    return (
      <div className="card">
        <img alt="图片" className="card__thumb" src={this.props.data.image_url} />
        {this.getTitle()}
        <span className="card__info">
          {' '}{this.props.data.info}
        </span>
      </div>
    );
  }
}

export default CardComponent;
