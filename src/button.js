var assign = require('object-assign');
var React = require('react');

var Button = React.createClass({
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
    var style = {};
    var backgroundColor = this.state.hover ? this.props.styles.hover.backgroundColor : this.state.backgroundColor;
    var color = this.state.hover ? this.props.styles.hover.color : this.state.color;
    assign(style, this.props.styles.button, { color: color, backgroundColor: backgroundColor });

    return (
      <button type="button" {...this.props} style={style}
        onMouseEnter={this.enter}
        onMouseLeave={this.leave} />
    );
  }
});

module.exports = Button;
