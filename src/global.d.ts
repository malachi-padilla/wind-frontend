// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    mainGrey: string;
    secondaryDarkGrey: string;
    tertiaryGrey: string;
    mediumGray: string;
    fontColors: {
      defaultWhite: string;
      defaultLightGrey: string;
      defaultMediumGrey: string;
    };
    defaultBoxShadow: string;
    defaultBorderBottom: string;
    inputBorder: string;
    primaryBlue: string;
    messaging: {
      primaryBlue: string;
      secondaryGrey: string;
    };
  }
}
