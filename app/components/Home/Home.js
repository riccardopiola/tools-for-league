// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
// import WebView from './webview/ElectronWebView';
import WebView from './WebView';

import styles from './Home.css';

type Props = {};

class Home extends Component<Props> {
  render() {
    return (
      <div className={styles.homeContainer}>
        <AppBar
          showMenuIconButton={false}
          title="Home"
          className={styles.AppBar}
        />
        <div className={styles.content}>
          <WebView
            webProprieties={{
              src: 'http://euw.op.gg/l=en',
              useragent: 'mobile',
              class: styles.webView
            }}
            containerClassName={styles.webViewContainer}
            autoLoadView={false}
            buttonSettings={{
              label: 'OP.GG',
              labelColor: '#ffffff',
              backgroundColor: '#00b2ff'
            }}
            audioMuted={true}
          />
          <WebView
            webProprieties={{
              src: 'http://www.champion.gg',
              useragent: 'mobile',
              class: styles.webView
            }}
            containerClassName={styles.webViewContainer}
            autoLoadView={false}
            buttonSettings={{
              label: 'CHAMPION.GG',
              labelColor: 'rgb(224, 224, 224)',
              backgroundColor: '#333'
            }}
            audioMuted={true}
          />
        </div>
      </div>
    );
  }
}

export default Home;
