import Inferno from 'inferno';
import Component from 'inferno-component';

import './style.css';

export default class Slider extends Component {

  onChange;

  constructor(props) {
    super(props);
    const { onChange = () => {}, defaultValue = 0 } = props;
    this.onChange = onChange;
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      value: defaultValue
    };
  }

  onValueChange({ target: { value } }) {
    this.setState({
      ...this.state,
      value
    });

    this.onChange(value);
  }

  render({ showNum, ...props }) {

    return (
      <div className="slider-container">
        {
          showNum && 
          <p>{ this.state.value }</p>
        }
        <input
          type="range"
          className={ 'range-slider' }
          { ...props }
          onInput={ this.onValueChange }
        />
      </div>
    );
  }
}
