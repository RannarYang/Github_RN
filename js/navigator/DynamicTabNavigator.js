import React, {Component} from 'react';
import {
    createBottomTabNavigator,
    BottomTabBar
} from 'react-navigation';
import {connect} from 'react-redux';

import PopularPage from '../page/PopularPage';
import TrendingPage from '../page/TrendingPage';
import FavoritePage from '../page/FavoritePage';
import MyPage from './MyPage';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationUtil from './NavigationUtil';
import MyPage from '../page/MyPage';

import {BottomTabBar} from 'react-navigation-tabs';

const TABS = { 
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: "最热",
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons
          name={'whatshot'}
          size={26}
          style={{color: tintColor}}
        />
      )
    }
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: "趋势",
      tabBarIcon: ({tintColor, focused}) => (
        <Ionicons
          name={'md-trending-up'}
          size={26}
          style={{color: tintColor}}
        />
      )
    }
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: "收藏",
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons
          name={'favorite'}
          size={26}
          style={{color: tintColor}}
        />
      )
    }
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: "我的",
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons
          name={'user'}
          size={26}
          style={{color: tintColor}}
        />
      )
    }
  }
}
class DynamicTabNavigator extends Component {
  constructor(props) {
    super(props);
  }
  _tabNavigator() {
    if(this.Tabs) {
      return this.Tabs;
    }
    const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS;
    const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage} // 根据需要配置动态显示的tab
    return this.Tabs = createBottomTabNavigator(tabs, {
      tabBarComponent: props => {
        return <TabBarComponent theme={this.props.theme} {...props}/>
      }
    });
  }
  render() {
    const Tab = this._tabNavigator();
    return <Tab/>
  }
  
}

class TabBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime()
    }
  }

  render() {
    
    return <BottomTabBar
      {...this.props}
      activeTintColor = {this.props.theme}
    />
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
})

export default connect(mapStateToProps)(DynamicTabNavigator)