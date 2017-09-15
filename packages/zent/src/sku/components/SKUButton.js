import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'button';
import Pop from 'pop';

class SKUButton extends (PureComponent || Component) {
  render() {
    const prefix = `${this.context.prefix}-group`;
    let { disabled } = this.props;
    return (
      <div className={prefix}>
        <h3 className="group-title">
          {typeof disabled === 'string' ? (
            <Pop trigger="hover" position="top-left" content={disabled}>
              <Button onClick={this.props.onClick} disabled={!!disabled}>
                添加规格项目
              </Button>
            </Pop>
          ) : (
            <Button onClick={this.props.onClick} disabled={!!disabled}>
              添加规格项目
            </Button>
          )}
        </h3>
      </div>
    );
  }
}

SKUButton.contextTypes = {
  prefix: PropTypes.string
};

export default SKUButton;
