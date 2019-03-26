import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'button';
import Pop from 'pop';

class SKUButton extends PureComponent {
  static contextTypes = {
    prefix: PropTypes.string,
  };

  render() {
    const prefix = `${this.context.prefix}-group`;
    let { disabled, i18n, customBtn } = this.props;
    return (
      <div className={prefix}>
        <h3 className="group-title">
          {typeof disabled === 'string' ? (
            <Pop trigger="hover" position="top-left" content={disabled}>
              <Button onClick={this.props.onClick} disabled={!!disabled}>
                {i18n.buttonAdd}
              </Button>
            </Pop>
          ) : (
            <Button onClick={this.props.onClick} disabled={!!disabled}>
              {i18n.buttonAdd}
            </Button>
          )}
          {customBtn}
        </h3>
      </div>
    );
  }
}

export default SKUButton;
