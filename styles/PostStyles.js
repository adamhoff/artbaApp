import { StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      backgroundColor: 'white'
    },
    title: {
      marginTop: 5,
      marginLeft: 15,
      marginRight: 15,
      fontSize: 16,
      fontWeight: 'bold',
    },
    titleDetail: {
      marginTop: 5,
      marginLeft: 15,
      marginRight: 15,
      fontSize: 18,
      fontWeight: 'bold',
    },
    content: {
      marginLeft: 15,
      marginRight: 15
    },
    image: {
      width: Dimensions.get('window').width-30,
      height: 180,
      marginLeft: 15,
      borderRadius: 6
    },
    date: {
      marginTop: 5,
      fontSize: 12,
      marginRight: 15,
      textAlign: 'right',
      color: '#555555',
    },
    dateDetail: {
      marginTop: 10,
      fontSize: 13,
      marginLeft: 15,
      textAlign: 'left',
      color: '#555555',
    },
    authorDetail: {
      fontStyle: 'italic',
      marginBottom: 10,
      fontSize: 13,
      marginLeft: 15,
      textAlign: 'left',
      color: '#555555'
    }
  });
