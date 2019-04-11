import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import de from 'vuetify/src/locale/de';

Vue.use(Vuetify, {
    theme: {
        primary: '#66AA66',
        secondary: '#D18D1F',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    },
    options: {
        customProperties: true
    },
    iconfont: 'md',
    lang: {
        locales: { de },
        current: 'de'
    }
});
