const React = require('react');

const Button = React.createClass({
  displayName: 'react-speech-button',

  propTypes: {
    styles: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
  },

  getInitialState: function(props){
    props = props || this.props;
    return props;
  },

  componentDidMount: function() {
    this.setState({
      focus: false,
      hover: false,
      color: this.props.styles.button.Color,
      backgroundColor: this.props.styles.button.backgroundColor
    });
  },

  enter: function() {
    this.setState({ hover: true });
  },

  leave: function() {
    this.setState({ hover: false });
  },

  render: function() {
    const backgroundColor = this.state.hover ? this.props.styles.hover.backgroundColor : this.state.backgroundColor;
    const color = this.state.hover ? this.props.styles.hover.color : this.state.color;
    const style = Object.assign({}, this.props.styles.button, { color: color, backgroundColor: backgroundColor });

    return (
      <button type="button" {...this.props} style={style}
        onMouseEnter={this.enter}
        onMouseLeave={this.leave} />
    );
  }
});

module.exports = Button;
