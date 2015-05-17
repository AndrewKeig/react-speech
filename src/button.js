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
    this.setState({ focus: false, hover: false, backgroundColor: this.props.styles.button.backgroundColor });
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
    assign(style, this.props.styles.button, { backgroundColor: backgroundColor });

    return (
      <button {...this.props} style={style}
        onMouseEnter={this.enter}
        onMouseLeave={this.leave} />
    );
  }
});

module.exports = Button;
