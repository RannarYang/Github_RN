import React, {Component} from 'react';
import {
  createMaterialTopTabNavigator
} from "react-navigation";
import NavigationUtil from '../navigator/NavigationUtil';

export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.tabNames=['Java', 'Android', 'IOS', 'React', 'React Native', 'PHP'];
  }
  _genTabs() {
    const tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: <PopularTab {...props} tabLabel={item}/>,
        navigationOptions: {
          title: item
        }
      }
    })
    return tabs;
  } 

  render() {
    const TabNavigator = createMaterialTopTabNavigator(
      this._genTabs(), {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false,
          scrollEnabled: true,
          style: {
            backgroundColor: '#678', // TabBar的背景颜色
          },
          indicatorStyle: styles.indicatorStyle, // 标签指示器的颜色 
          labelStyle: styles.labelStyle
        }
      }
    );
    return <View style={{flex: 1, margintop: 30}}>
      <TabNavigator/>
    </View> 
  }
  
}

class PopularTab extends Component {
  
  render() {
    const {tabLabel} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{tabLabel}</Text>
        <Text> onPress={()=>{
          NavigationUtil.goPage({
            navigation: this.props.navigation
          }, "DetailPage")
        }}跳转到详情页</Text>
      </View>
    ) 
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
  tabStyle: {
    minWidth: 50
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  labelStyle: { 
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6,
  }
})