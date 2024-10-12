import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
import './style.css'
import { theme } from './theme'



export const vuetify = createVuetify({
    components,
    directives,
    theme,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi },
    }
})
