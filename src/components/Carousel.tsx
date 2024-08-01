
import { StyleSheet, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { Text } from 'react-native-paper';

export default function Carousel() {
  return (
    
      <PagerView style={styles.container} initialPage={0} >
        <View style={styles.page} key="1">
          <Text>First page</Text>
          <Text>Swipe ➡️</Text>
        </View>
        <View style={styles.page} key="2">
          <Text>Second page</Text>
        </View>
        <View style={styles.page} key="3">
          <Text>Third page</Text>
        </View>
      </PagerView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth:1,
    borderColor:'red',
    width:'100%'
  },
  page: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
