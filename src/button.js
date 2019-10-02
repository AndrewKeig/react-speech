import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      hover: false,
      color: this.props.styles.button.Color,
      backgroundColor: this.props.styles.button.backgroundColor
    };
    this.enter = this.enter.bind(this);
    this.leave = this.leave.bind(this);
  }

  enter() {
    this.setState({ hover: true });
  }

  leave() {
    this.setState({ hover: false });
  }

  render() {
    const backgroundColor = this.state.hover
      ? this.props.styles.hover.backgroundColor
      : this.state.backgroundColor;

    const color = this.state.hover
      ? this.props.styles.hover.color
      : this.state.color;

    const style = Object.assign({}, this.props.styles.button, {
      color: color,
      backgroundColor: backgroundColor
    });

    return (
      <button
        type="button"
        {...this.props}
        style={style}
        onMouseEnter={this.enter}
        onMouseLeave={this.leave}
      />
    );
  }
}

Button.propTypes = {
  styles: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};
