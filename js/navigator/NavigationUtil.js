/*
 * @Description:  全局导航工具类
 * @Author: Ran Yang 
 * @Date: 2019-08-18 17:14:36 
 * @Last Modified by: Ran Yang
 * @Last Modified time: 2019-08-18 19:01:37
 */
export default class NavigationUtil {
    /**
     * 跳转到指定页面
     * @param params 要传递的参数
     * @param page 要跳转的页面 
     */
    static goPage(params, page) {
       const navigation = NavigationUtil.navigate;
       if(!navigation) {
           console.log("NavigationUtil.navigation can not be null");
           return;
       }
       navigation.navigate(page, {...params});
    }
    /**
     * 返回上一页
     * @param {} navigation 
     */
    static goBack(navigation) {
        navigation.goBack();
    }

    /**
     * 重置到首页
     * @param {} params 
     */
    static resetToHomePage(params) {
        const {navigation} = params;
        navigation.navigator("Main");
    }
}