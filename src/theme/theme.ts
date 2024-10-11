import { ThemeDefinition } from "vuetify";

export const themes:Record<string, ThemeDefinition> =
{
    dark:{
        dark:true,
        colors:
        {
            primary: "#fcff64",
            secondary: "#d3a9eb",
            background: '#000000',
            surface: '#000000',
        }
    },
    // light: {
    //     dark:false,
    //     colors:
    //     {
    //         background: '#FFFFFF',
    //         surface: '#FFFFFF',
    //     }
    // }
}
