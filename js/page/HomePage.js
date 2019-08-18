import React, {Component} from 'react';
import { BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {connect} from 'react-redux';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import NavigatorUtil from '../navigator/NavigationUtil';

class HomePage extends Component {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    /**
     *处理Android中的物理返回键
     * @memberof HomePage
     */
    onBackPress = ()=> {
        const {dispatch, nav} = this.props;
        if(nav.routes[1].index === 0) {
            // 如果RootNavigator中的MainNavigator的index为0,则不处理返回
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    }
    
    render() {
        NavigatorUtil.navigation = this.props.navigation;
        return <DynamicTabNavigator/>
    }
}

const mapStateToProps = state => ({
    nav: state.nav
})

export default connect(mapStateToProps)(HomePage);