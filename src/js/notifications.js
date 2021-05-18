import * as PNotify from '@pnotify/core/dist/PNotify.js';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export const notify = {

  error: message => {
    PNotify.error({
      text: message
    })
  },

  success: message => {
    PNotify.success({
      text: message
    });
  },


}