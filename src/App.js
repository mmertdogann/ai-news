import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

import NewsCards from './components/NewsCards/NewsCards';

import useStyles from './styles';

const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: 'a4b2ba7eb477ee019671989263131c3e2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}>
              <Typography variant='h5' component='h2'>
                Try saying: <br />
                <br />
                Open article number [4]
              </Typography>
            </div>
            <div className={classes.card}>
              <Typography variant='h5' component='h2'>
                Try saying: <br />
                <br />
                Go back
              </Typography>
            </div>
          </div>
        ) : null}
        <img
          src='https://scontent-ham3-1.xx.fbcdn.net/v/t39.30808-6/310681473_781698249884788_5413193905708005780_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=100&ccb=1-7&_nc_sid=dd9801&efg=eyJpIjoidCJ9&_nc_ohc=0Z7Il9TfAtQAX-f3vRF&_nc_ht=scontent-ham3-1.xx&oh=00_AT9XKU8xDrn3X8Z9JFDhahVyei_mYbfuXRBb6_RjOmpKZw&oe=63527017'
          className={classes.alanLogo}
          alt='logo'
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
