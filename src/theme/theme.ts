import { ThemeDefinition } from "vuetify";

export const theme: { defaultTheme?: 'dark' | 'light', themes:Record<string, ThemeDefinition> } =
{
    defaultTheme: 'dark',
    themes: {
        dark:{
            dark:true,
            colors:
            {
                primary: "#fcff64",
                secondary: "#d3a9eb",
                background: '#000000',
                surface: '#080808',
            }
        },
        light: {
            dark:false,
            colors:
            {
                background: '#FDFDFD',
                surface: '#F6F6F6',
                // primary: '#367866'
            }
        }
    }
}
