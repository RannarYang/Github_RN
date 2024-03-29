import React, {Component} from 'react';
import {
  createMaterialTopTabNavigator
} from "react-navigation";
 import { FlatList, RefreshControl } from 'react-native';
 import {connect} from 'react-redux';
 import actions from '../action/index';

 const URL = 'https://api.github.com/search/repositories?q=';
 const QUERY_STR = '&sort=stars';
 const THEME_COLOR = 'red';

export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.tabNames=['Java', 'Android', 'IOS', 'React', 'React Native', 'PHP'];
  }
  _genTabs() {
    const tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: <PopularTabPage {...props} tabLabel={item}/>,
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
  constructor(props) {
    super(props);
    const {tabLabel} = this.props;
    this.storeName = tabLabel
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const {onLoadPopularData} = this.props;
    const url = this.genFetchUrl(this.storeName);
    onLoadPopularData(this.storeName, url);
  }

  genFetchUrl(key) {
    return URL + Key + QUERY_STR;
  }

  renderItem(data) {
    const item = data.item;
    return <View style={{marginBottom: 10}}>
      <Text style={{backgroundColor: "#faa"}}>{JSON.stringify(item)}</Text>
    </View>
  }
  render() {
    const {popular} = this.props;
    let store = popular[this.storeName]; // 动态获取state
    if(!store) {
      store = {
        items: [],
        isLoading: false
      }
    }
    return (
      <View style={styles.container}>
        <FlatList
          data = {store.items}
          renderItem = {data => {
            this.renderItem(data)
          }}
          keyExtractor = {item => "" + item.id}
          refreshControl = {
            <RefreshControl
              title = {'Loading'}
              titleColor = {THEME_COLOR}
              colors = {[THEME_COLOR]}
              refreshing = {store.isLoading}
              onRefresh= {()=>{
                this.loadData()
              }}

              tintColor = {THEME_COLOR}
            />
          }
        />
      </View>
    ) 
  }
  
}
const mapStateToProps = state => ({
  popular: state.popular
})

const mapDispatchToProps = state => ({
  onLoadPopularData: (storeName, url) => {
    dispatch(actions.onLoadPopularData(storeName, url))
  }
})

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

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