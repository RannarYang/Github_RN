import React, {Component} from 'react';


export default class FavoritePage extends Component {
  componentDidMount() {
    
  }

  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>FavoritePage</Text>
        <Button 
          title="改变主题颜色"
          onPress={()=>{
            navigation.setParams({
              theme: {
                tintColor: 'green',
                updateTime: new Date().getTime()
              }
            })
          }}
        />
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alighItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
})