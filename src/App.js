import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

const alanKey =
  'a4b2ba7eb477ee019671989263131c3e2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command }) => {
        if (command === 'testCommand') {
          alert('This code was executed');
        }
      },
    });
  }, []);

  return (
    <div>
      <h1>Alan AI News Application</h1>
    </div>
  );
};

export default App;
