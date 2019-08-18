import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../action/index';
class TrendingPage extends Component {
  componentDidMount() {
    
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>TrendingPage</Text>
        <Button 
          title="改变主题颜色"
          onPress={()=>{
            this.props.onThemeChange('#096');
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

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onThemeChange: theme=>dispatch(actions.onThemeChange(theme))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrendingPage);