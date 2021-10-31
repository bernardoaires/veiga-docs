import { createTheme } from '@material-ui/core/styles'
import './fonts.css'

declare module '@material-ui/core/styles/createTypography' {
  interface TypographyOptions {
    normalFont?: string,
    mediumFont?: string,
    boldFont?: string,
    extraBoldFont?: string
  }

  interface Typography {
    normalFont: string,
    mediumFont: string,
    boldFont: string,
    extraBoldFont: string
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
      status1?: PaletteColorOptions
      status2?: PaletteColorOptions
      status3?: PaletteColorOptions
      status4?: PaletteColorOptions
      status5?: PaletteColorOptions
      status6?: PaletteColorOptions
      status7?: PaletteColorOptions
      growth?: PaletteColorOptions
  }
  interface Palette {
    status1: PaletteColor
    status2: PaletteColor
    status3: PaletteColor
    status4: PaletteColor
    status5: PaletteColor
    status6: PaletteColor
    status7: PaletteColor
  }
}

declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    sidebar: {
      minimizedWidthSmDown: number,
      minimizedWidthSmUp: number,
      expandedWidth: number,
      backgroundColor: string
    },
    topbar: {
      height: number,
      backgroundColor: string
    },
    boxShadow: {
      container: string,
      sideModal: string
      centeredModal: string,
    }
  }
  interface ThemeOptions {
    sidebar?: {
      minimizedWidthSmDown?: number,
      minimizedWidthSmUp?: number,
      expandedWidth?: number,
      backgroundColor?: string
    },
    topbar?: {
      height?: number,
      backgroundColor?: string
    }
    boxShadow?: {
      container?: string,
      sideModal?: string,
      centeredModal?: string,
    }
  }
}

export const globalTheme = createTheme({
  typography: {
    fontFamily: 'AirbnbCerealBook',
    normalFont: 'AirbnbCerealBook',
    mediumFont: 'AirbnbCerealMedium',
    boldFont: 'AirbnbCerealBold',
    h1: {
      fontWeight: 'normal',
      fontFamily: 'AirbnbCerealBold',
      fontSize: 65
    },
    h2: {
      fontWeight: 'normal',
      fontFamily: 'AirbnbCerealBold',
    },
    h3: {
      fontWeight: 'normal',
      fontFamily: 'AirbnbCerealBold',
      fontSize: 34
    },
    h4: {
      fontWeight: 'normal',
      fontFamily: 'AirbnbCerealBold',
      fontSize: 28
    },
    h5: {
      fontWeight: 'normal',
      fontFamily: 'AirbnbCerealBold',
      fontSize: 22
    },
    h6: {
      fontFamily: 'AirbnbCerealMedium',
      fontSize: 18
    },
    body1: {
      fontSize: 16,
      fontFamily: 'AirbnbCerealBook'
    },
    body2: {
      fontSize: 16,
      fontFamily: 'AirbnbCerealMedium',
    },
    button: {
      fontSize: 16,
      fontFamily: 'AirbnbCerealMedium',
      textTransform: 'none',
      borderRadius: 7
    },
    subtitle1: {
      fontSize: 20,
    },
    subtitle2: {
      fontSize: 18,
      fontFamily: 'AirbnbCerealBold'
    },
    caption: {
      fontSize: 14,
      fontFamily: 'AirbnbCerealBook'
    }
  },
  palette: {
    status1: {
      main: '#00923F'
    },
    status2: {
      main: '#EE732E'
    },
    status3: {
      main: '#FFCD00'
    },
    status4: {
      main: '#A52EEE'
    },
    status5: {
      main: '#FF4086'
    },
    status6: {
      main: '#C02220'
    },
    status7: {
      main: '#9B9B9B'
    },
    common: {
      white: '#fff',
      black: '#2B2B2B'
    },
    error: {
      main: '#F03636'
    },
    success: {
      main: '#1DB954',
      light: '#BEE3CF'
    },
    warning: {
      main: '#EE732E'
    },
    info: {
      main: '#368DF7'
    },
    text: {
      secondary: 'rgba(43, 43, 43, 0.5)'
    },
    background: {
      default: '#f2f2f2',
      paper: '#ffffff'
    },
    divider: 'rgba(0, 0, 0, 0.08)',
    action: {
      active: 'rgba(0, 0, 0, 0.30)',
    },
    grey: {
      100: '#F9F9F9',
      200: '#EBEBEB',
      300: '#EAEAEA',
      400: '#C7C7C7',
      500: '#9B9B9B',
      A100: '#DFDFDF',
      A200: '#D6D6D6',
      A400: '#B6BBC0',
      A700: '#A7ADB2'
    }
  },
  sidebar: {
    expandedWidth: 290,
    minimizedWidthSmUp: 95,
    minimizedWidthSmDown: 75,
    backgroundColor: '#272976'
  },
  topbar: {
    backgroundColor: '#ffffff',
    height: 75
  },
  shape: {
    borderRadius: 10
  },
  boxShadow: {
    container: '1px 4px 10px rgba(0, 0, 0, 0.05)',
    centeredModal: '0px 0px 50px rgb(138, 138, 138)',
    sideModal: '0px 0px 50px rgba(137, 137, 137, 0.65)',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 414, // custom breakpoint, defaults to 600
      md: 960,
      lg: 1280,
      xl: 1920,
    }
  }
})
