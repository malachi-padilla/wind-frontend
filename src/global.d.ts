// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    mainGrey: string;
    secondaryDarkGrey: string;
    tertiaryDarkGrey: string;
    tertiaryGrey: string;
    mediumGray: string;
    defaultBlack: string;
    fontColors: {
      defaultWhite: string;
      defaultLightGrey: string;
      defaultMediumGrey: string;
      importantRed: string;
      actionGreen: string;
      offWhite: string;
    };
    defaultBoxShadow: string;
    defaultBorderBottom: string;
    inputBackground: string;
    inputBorder: string;
    primaryBlue: string;
    messaging: {
      primaryBlue: string;
      secondaryGrey: string;
    };
  }
}
