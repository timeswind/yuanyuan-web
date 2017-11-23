import { createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';

const theme = createMuiTheme({
  overrides: {
    MuiTab: {
      label: {
        color: 'white',
      }
    },
    MuiPaper: {
      shadow2: {
        boxShadow: 'none',
        border: '1px solid #e4e4e4',
      },
      rounded: {
        borderRadius: 0,
        padding: '0 24px'
      }
    }
  },
  palette: {
    primary: {
      ...purple,
      "50": "#FE6B8B",
      "100": "#FE6B8B",
      "200": "#FE6B8B",
      "300": "#FE6B8B",
      "400": "#FE6B8B",
      "500": "#FE6B8B",
      "600": "#FE6B8B",
      "700": "#FE6B8B",
      "800": "#FE6B8B",
      "900": "#FE6B8B",
      "A100": "#FE6B8B",
      "A200": "#FE6B8B",
      "A400": "#FE6B8B",
      "A700": "#FE6B8B",
    }, // Purple and green play nicely together.
    secondary: {
      ...green,
    },
    error: red,
  },
});

export default theme
