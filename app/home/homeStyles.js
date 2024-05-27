import { StyleSheet } from 'react-native'
import { PRIMARY_COLOR, theme } from '../../constants/theme'
import { hp, wp } from '../../helpers/common'

export const style = StyleSheet.create({
  scrollUp: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  scrollText: {
    color: theme.colors.white,
    padding: 3,
    fontSize: hp(1.8),
    fontWeight: theme.fontWeight.medium,
    marginLeft: 3,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(4),
    justifyContent: 'space-between',
  },
  pixel: {
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.neutral(0.9),
    fontSize: hp(3.6),
    letterSpacing: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    borderWidth: 1,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.white,
    padding: 7,
    paddingLeft: 10,
    marginTop: 18,
    borderRadius: theme.radius.lg,
  },
  inputContainer: { padding: 7 },
  input: { flex: 1, paddingHorizontal: 2 },
  crossIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    borderRadius: theme.radius.sm,
    padding: 5,
  },
})
