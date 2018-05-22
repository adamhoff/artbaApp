import { StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    backgroundColor: 'white'
  },
  eventContainer: {
    flex: 1,
    width: Dimensions.get('window').width-30,
    marginLeft: 15,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 4,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 1
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: 'grey'
  },
  subtitle:{
    paddingTop: 10,
    paddingBottom: 0
  }
});
