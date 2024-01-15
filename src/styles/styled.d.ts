import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    black: {
      veryDark: string;
      darker: string;
      lighter: string;
    };
    gray: {
      normal: string;
    };
    white: {
      darker: string;
      lighter: string;
    };
    modal: {
      background: string;
    };
  }
}
