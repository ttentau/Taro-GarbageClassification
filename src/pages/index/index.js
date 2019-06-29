import Taro, {Component} from '@tarojs/taro'
import './index.scss'
import {AtSearchBar, AtTabBar, AtTabs, AtTabsPane} from 'taro-ui'
import {Button, Image, Text, View} from "@tarojs/components"
import recoverableGarbage from '../../assets/imgs/trans-my/recoverable-garbage.png'
import HarmfulWaste from '../../assets/imgs/trans-my/Harmful-Waste.png'
import kitchenWaste from '../../assets/imgs/trans-my/kitchen-waste.png'
import OtherWaste from '../../assets/imgs/trans-my/Other-Waste.png'
import shareImg from '../../assets/imgs/share.png'
import dataJson from '../../assets/data.json'
import Logo from '../../assets/logo.png'

export default class Index extends Component {

    config = {
        navigationBarTitleText: '首页'
    }

    constructor() {
        super(...arguments)
        this.state = {
            currentPage: 2,
            currentTab: 0,
            searchKey: '',
            data: dataJson,
            searchResult: []
        }
    }

    changeCurrentPage(value) {
        let title = '首页'
        if (value === 0) title = '首页'
        if (value === 1) title = '搜索'
        if (value === 2) title = '帮助'
        Taro.setNavigationBarTitle({
            title
        })
        this.setState({
            currentPage: value,
            searchKey: ''
        })
    }

    changeCurrentTab(value) {
        this.setState({
            currentTab: value
        })
    }

    componentWillMount() {
        // console.log('componentWillMount')
    }

    componentDidMount() {
        // console.log('componentDidMount')
        // console.log(this.state.data)
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    onSearchBarChange(value) {
        this.setState({
            searchKey: value
        })
        if (value) {
            let searchResult = []
            this.state.data.map(v => {
                if (v.name.includes(value)) {
                    searchResult.push(v)
                }
                if (value.includes(v.name)) {
                    searchResult.push(v)
                }
            })
            console.log(searchResult)
            this.state.searchResult = searchResult
        }

    }

    onSearchBarClick() {
        // console.log('开始搜索')
    }

    onShareAppMessage(obj) {
        return {
            title: '你知道垃圾怎么分类吗？',
            imageUrl: shareImg
        }
    }

    render() {
        const tabList = [{title: '可回收物'}, {title: '有害垃圾'}, {title: '湿垃圾'}, {title: '干垃圾'}]

        let currentPageView
        let searchView

        let searchResultView = this.state.searchResult.map(v => {
            return (
                <View className='item' key={v.name}>
                    <Text>{v.name}</Text>
                    <Text>{v.type}</Text>
                </View>
            )
        })

        if (this.state.searchKey) {
            searchView = (
                <View className='no-empty'>
                    <View className='no-data'>
                        没有数据
                    </View>
                    <View className='list'>
                        {searchResultView}
                    </View>
                </View>
            )
        } else {
            searchView = (
                <View className='empty'>
                    <View className='slogan'>垃圾回收，人人要责</View>
                    <View className='notice'>
                        鼓励将可回收物卖入废品回收系统，或交投至两网融合服务点，或投放至 <Text className='recoverable'>可回收物</Text> 收集容器；
                        严禁将 <Text className='harmful-waste'>有害垃圾</Text> 投放到其他的生活垃圾收集容器；
                        日常家庭生活垃圾要做到 <Text className='kitchen-waste'>干</Text> 、<Text className='other-waste'>湿</Text> 垃圾两分开
                    </View>
                </View>
            )
        }

        if (this.state.currentPage === 0) {
            currentPageView = (
                <AtTabs
                    className='home'
                    height='100%'
                    swipeable
                    current={this.state.currentTab}
                    tabList={tabList}
                    onClick={this.changeCurrentTab.bind(this)}>
                    <AtTabsPane
                        style='height: 100%;'
                        current={this.state.currentTab}
                        index={0}>
                        <View className='recoverable'>
                            <View className='header'>
                                <View className='logo-ctn'>
                                    <Image src={recoverableGarbage}/>
                                    <Text>可回收物</Text>
                                    <Text class='english'>RECOVERABLE WASTE</Text>
                                </View>
                                <View className='desc-ctn'>
                                    <View className='title'>
                                        可回收物是指：
                                    </View>
                                    <View className='description'>
                                        废纸张、废塑料、废玻璃制品、废金属、废织物等适宜回收、可循环利用的生活废弃品。
                                    </View>
                                </View>
                            </View>
                            <View className='content'>
                                <View className='claim'>
                                    可回收物投放要求
                                </View>
                                <View className='detail'>
                                    <View>1、轻投轻放</View>
                                    <View>2、清洁干燥，避免污染（废纸尽量平整）</View>
                                    <View>3、立体包装物请清空内置物，清洁并压扁后投放</View>
                                    <View>4、有尖锐边角的，应包裹后投放</View>
                                </View>
                            </View>
                        </View>
                    </AtTabsPane>
                    <AtTabsPane
                        style='height: 100%;'
                        current={this.state.currentTab}
                        index={1}>
                        <View className='harmful-waste'>
                            <View className='header'>
                                <View className='logo-ctn'>
                                    <Image src={HarmfulWaste}/>
                                    <Text>有害垃圾</Text>
                                    <Text class='english'>HARMFUL WASTE</Text>
                                </View>
                                <View className='desc-ctn'>
                                    <View className='title'>
                                        有害垃圾是指：
                                    </View>
                                    <View className='description'>
                                        废电池、废灯管、废药品、废油漆及其容易对人体健康或者自然环境造成直接或潜在危害的生活废弃品
                                    </View>
                                </View>
                            </View>
                            <View className='content'>
                                <View className='claim'>
                                    有害垃圾投放要求
                                </View>
                                <View className='detail'>
                                    <View>1、投放时注意轻放</View>
                                    <View>2、易破损的请连带包装或者包裹后轻放</View>
                                    <View>3、如易挥发，请密封后投放</View>
                                </View>
                            </View>
                        </View>
                    </AtTabsPane>
                    <AtTabsPane
                        style='height: 100%;'
                        current={this.state.currentTab}
                        index={2}>
                        <View className='kitchen-waste'>
                            <View className='header'>
                                <View className='logo-ctn'>
                                    <Image src={kitchenWaste}/>
                                    <Text>湿垃圾</Text>
                                    <Text class='english'>KITCHEN WASTE</Text>
                                </View>
                                <View className='desc-ctn'>
                                    <View className='title'>
                                        湿垃圾是指：
                                    </View>
                                    <View className='description'>
                                        即易腐垃圾。是指食材废料、剩菜剩饭、过期食品、瓜皮果核、花卉绿植、中药药渣等易腐的生物质生活废弃物。
                                    </View>
                                </View>
                            </View>
                            <View className='content'>
                                <View className='claim'>
                                    湿垃圾投放要求
                                </View>
                                <View className='detail'>
                                    <View>1、纯流质的食物垃圾，如牛奶等，应直接倒进下水口</View>
                                    <View>2、有包装的湿垃圾应将包装物去除后分类投放 ，包装物请投放到对应的可回收物或干垃圾容器</View>
                                </View>
                            </View>
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.currentTab} index={3}>
                        <View className='other-waste'>
                            <View className='header'>
                                <View className='logo-ctn'>
                                    <Image src={OtherWaste}/>
                                    <Text>干垃圾</Text>
                                    <Text class='english'>OTHER WASTE</Text>
                                </View>
                                <View className='desc-ctn'>
                                    <View className='title'>
                                        干垃圾是指：
                                    </View>
                                    <View className='description'>
                                        即其它垃圾，指除可回收物、有害垃圾、湿垃圾以外的其它生活废弃物。
                                    </View>
                                </View>
                            </View>
                            <View className='content'>
                                <View className='claim'>
                                    干垃圾投放要求
                                </View>
                                <View className='detail'>
                                    <View>1、尽量沥干水分</View>
                                    <View>2、难以辩识类别的生活垃圾投入干垃圾容器内</View>
                                </View>
                            </View>
                        </View>
                    </AtTabsPane>
                </AtTabs>
            )
        } else if (this.state.currentPage === 1) {
            currentPageView = (
                <View className='search'>
                    <AtSearchBar
                        showActionButton
                        value={this.state.searchKey}
                        onChange={this.onSearchBarChange.bind(this)}
                        onActionClick={this.onSearchBarClick.bind(this)}
                    />
                    {searchView}
                </View>
            )
        } else {
            currentPageView = (
                <View className='help'>
                    <Image src={Logo} className='logo'/>
                    <Text className='name'>垃圾怎么分类</Text>
                    <Button className='m-button' onClick={this.onShareAppMessage.bind(this)} open-type="share">
                        <View className='at-icon at-icon-share'></View>
                        <Text>分享</Text>
                    </Button>
                </View>
            )
        }

        return (
            <View className='pages'>
                {currentPageView}
                <AtTabBar
                    fixed
                    tabList={[
                        {title: '分类', iconType: 'trash'},
                        {title: '查询', iconType: 'search'},
                        {title: '帮助', iconType: 'help'}
                    ]}
                    onClick={this.changeCurrentPage.bind(this)}
                    current={this.state.currentPage}
                />
            </View>
        )
    }
}
