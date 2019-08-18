import {
    createStackNavigator,
    createSwitchNavigator
} from "react-navigation";

import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';

import {connect} from 'react-redux';
import {createReactNavigationReduxMiddleware, reduxifyNavigator} from 'react-navigation-redux-helpers';

export const rootCom = 'Init'; // 设置根路由

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null, // 可以通过将header设为null，来禁用StackNavigation Bar
        }
    }
})


const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null, // 可以通过将header设为null，来禁用StackNavigation Bar
        }
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
        }
    }
})

export const RootNavigator = createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator,
}, {
    navigationOptions: {
        header: null,
    }
})
/**初始化react-navigation与redux的中间件 */
export const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
)
/**将根导航组件传递给reduxifyNavigator函数，
 * 并返回一个将navigation state和dispatch函数作为 props的新组件
 * 注意:要在createReactNavigationReduxMiddleware之后执行
 */
const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

/**State到Props的映射关系 */
const mapStateToProps = state=>({
    state: state.nav, // v2
});

/**连接React组件与Redux store */
export default connect(mapStateToProps)(AppWithNavigationState)