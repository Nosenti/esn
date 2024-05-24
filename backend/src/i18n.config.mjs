import i18n from 'i18n';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

i18n.configure({

  locales: ['en', 'fr', 'kin'],

  defaultLocale: 'en',

  queryParameter: 'lang',

    //   directory: path.join('./', 'locales'),
  directory: path.join(__dirname, 'locales'),

  api: {

    '__': 'translate',

    '__n': 'translateN'

  },

});

export default i18n;