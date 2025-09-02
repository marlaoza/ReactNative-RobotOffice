import {StyleSheet} from 'react-native'

export default GlobalStyles = (colors: any) => StyleSheet.create({
  text: {
    color: colors.font
  },
  highlightText:{
    color: colors.accent
  },
  hr: {
    borderTopColor: colors.font,
    borderTopWidth: StyleSheet.hairlineWidth,
  }
})
