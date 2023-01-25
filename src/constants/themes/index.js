import { DarkTheme } from '@react-navigation/native';

export const primaryTheme = {
  dark: false,
  colors: {
    primary: '#012A4A',
    background: '#2C7DA0',
    card: '#013A63',
    text: '#FFFFFF',
    border: '#01497C',
    notification: '#014F86',
  },
  fonts: {
    title: 'Lato-Bold',
    content: 'Montserrat-Light',
  },
};

export const secondaryTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    notification: '#2B2C31',
    background: '#1F2024',
    primary: '#373A40',
    text: '#FFFFFF',
  },
  fonts: {
    title: 'Lato-Bold',
    content: 'Montserrat-Light',
  },
};
