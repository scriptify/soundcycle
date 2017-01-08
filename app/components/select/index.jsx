import Inferno from 'inferno';
import Component from 'inferno-component';

import './style.css';

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.state = {
      value: ''
    };
  }

  handleChange({ target: { value } }) {
    this.setState({
      value
    });
    this.props.onSelect(value);
  }

  render(props) {

    return (
      <select className="select" value={ this.state.value } onInput={ this.handleChange } { ...props }>
        { ...this.children }
      </select>
    );
  }
}
