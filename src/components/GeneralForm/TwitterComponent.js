import React, { useEffect } from 'react';
import Card from '../GeneralForm/Card';
import bn from '../../utils/bemnames';
import ErrorBoundary from './ErrorBoundary';

const bem = bn.create('twitter');

const TwitterComponent = ({
  twitter_URL,
  twitterCardHeight,
  dataTweetLimit,
  darkTheme,
  tweetScrollable,
  TrialStatus
}) => {
  useEffect(() => {
    if (
      twitter_URL !== '' &&
      twitter_URL !== undefined &&
      twitter_URL !== null
    ) {
      const anchor = document.createElement('a');
      anchor.setAttribute('class', 'twitter-timeline');
      if (darkTheme) {
        anchor.setAttribute('data-theme', 'dark');
      }
      if (dataTweetLimit) {
        anchor.setAttribute('data-tweet-limit', dataTweetLimit); //5
      }
      // anchor.setAttribute("data-chrome", "noheader nofooter noborders");
      anchor.setAttribute('href', `https://twitter.com/${twitter_URL}`);
      document.getElementsByClassName('twitter-embed')[0].appendChild(anchor);

      const script = document.createElement('script');
      script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
      document.getElementsByClassName('twitter-embed')[0].appendChild(script);
    }
  }, [twitter_URL]);

  return (
    <Card title='Twitter' smalltitle=''>
      <ErrorBoundary>
      <div
        className={bem.b(
          TrialStatus ? 'twitter-embed blurrytext' : 'twitter-embed'
        )}
        style={{
          height: twitterCardHeight,
          overflowY: tweetScrollable ? 'scroll' : ''
        }}
      />
      </ErrorBoundary>
    </Card>
  );
};

export default TwitterComponent;
