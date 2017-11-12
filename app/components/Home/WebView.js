// No flow support here because its a mess
import * as React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';

type Props = {
  webProprieties: {
    src: string, // The url to go to
    useragent: 'mobile' | string // useragent, use 'mobile' for shorthand
  },
  autoLoadView: boolean, // Wheter to autoload the webview or display a button
  containerClassName?: string, // classNAme of the <div> container
  buttonSettings?: { // Settings for the button if autoload=false
    label: string,
    labelColor: string,
    backgroundColor: string
  },
  audioMuted?: boolean // Mute the audio
};

class WebView extends React.Component<Props> {
  static defaultProps = {
    containerClassName: '',
    buttonSettings: {
      label: 'LOAD',
      labelColor: '#ffffff',
      backgroundColor: 'rgb(201, 170, 113)'
    },
    audioMuted: false,
    autoLoadView: false
  }
  state = {
    loaded: false
  }
  componentDidMount() {
    if (this.props.autoLoadView)
      this.loadWebView();
  }
  loadWebView = () => {
    this.setState({ loaded: true });
    const container = ReactDOM.findDOMNode(this); //eslint-disable-line
    // Concat the props string
    const propString = Object.keys(this.props.webProprieties).reduce((str, propName) => {
      if (propName === 'useragent' && this.props.webProprieties[propName] === 'mobile')
        return `${str} useragent="Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B137 Safari/601.1"`;
      return `${str} ${propName}="${this.props.webProprieties[propName]}"`;
    }, '');
    // Create the webview
    container.innerHTML = `<webview ${propString}/>`;
    const view = container.querySelector('webview');
    this.setState({ view });

    view.addEventListener('did-finish-load', () => {
      view.setAudioMuted(this.props.audioMuted);
    });
  }
  handleClick = () => {
    this.setState({ loaded: true }, this.loadWebView);
  }
  render() {
    return (
      <div
        className={this.props.containerClassName}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        {(this.props.autoLoadView || this.state.loaded) ? null : (
          <RaisedButton
            label={this.props.buttonSettings.label}
            labelColor={this.props.buttonSettings.labelColor}
            backgroundColor={this.props.buttonSettings.backgroundColor}
            onClick={this.handleClick}
          />
        )}
      </div>
    );
  }
}

export default WebView;
