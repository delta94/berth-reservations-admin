import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { I18nextProvider } from 'react-i18next';

import '../src/assets/styles/main.scss';
import i18n from '../src/locales/i18n';

addDecorator(withA11y);
addDecorator(story => <I18nextProvider i18n={i18n}>{story()}</I18nextProvider>);

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.(ts|js|md)x$/), module);
