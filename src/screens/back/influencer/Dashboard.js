import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    ScrollView,
    ActivityIndicator,
} from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import Constants from '../../../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import Images from '../../../assets/images/Images'
import LinearGradient from 'react-native-linear-gradient'
import axios from 'axios'
import showToastmsg from '../../../shared/showToastmsg'

const Dashboard = (props)=>{
    const [tabs,setTabs] = useState('d')
    const [loader,setLoader]=useState(false)
    const [dashBoardData,setdashBoardData]=useState()
    const goBack = ()=>{
        props.navigation.goBack()
    }
    const chartConfig = {
        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#FFFFFF",
        backgroundGradientToOpacity: 0.5,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 10,
        useShadowColorFromDataset: false // optional
    }
    const daileyData = {
        labels: ["Mon", "Tue", "Thrus", "Wed", "Fri", "Sat", "Sun"],
        datasets: [
            {
                data: [120, 700, 200, 800, 250, 620, 230],
                color: (opacity = 1) => `#00A928`, // optional
                strokeWidth: 2 // optional
            },
        ],
    }
    const monthlyData = {
        labels: ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jly", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                data: [1200, 1900, 3000, 8000, 9000, 4000, 2500, 5000, 6000, 7500, 3500, 4500],
                color: (opacity = 1) => `#00A928`, // optional
                strokeWidth: 2 // optional
            },
        ],
    }
    const weeklyData = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
            {
                data: [1200, 1600, 1100, 1700],
                color: (opacity = 1) => `#00A928`, // optional
                strokeWidth: 2 // optional
            },
        ],
    }
    const getDashBoardData=()=>{
        setLoader(true)
        axios.post(`${Constants.BASE_URL}influencer/dashboard`,
            {
                "user_id":props?.route?.params?.userDetails?.id
            }
        )
        .then((response)=>{
            console.log("response data=>",response.data);
            setdashBoardData(response.data)
            setLoader(false)
        })
        .catch((error)=>{
            console.log("error=>",error);
            showToastmsg("Something went wrong")
            setLoader(false)
        })
    }
    useEffect(()=>{
        getDashBoardData()
    },[props])
    return (
        <View style={StyleSheet.wrapper}>
            <CustomAppBar navigation={props.navigation} isMainscreen={false} isReel={false} title='Dashboard' />
            <ScrollView>
               {loader?
               <ActivityIndicator
               size={35}
               color={Constants.primaryColor}
               />
               :
                <View style={styles.container}>
                    <Text style={styles.normalText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                    </Text>
                    <View style={styles.tabs}>
                        <Pressable onPress={()=>setTabs('d')}><Text style={[styles.tabText, {backgroundColor: tabs==='d'?Constants.colors.whiteColor:'rgba(0, 169, 40, 0.15)', borderColor: tabs==='d'?Constants.colors.primaryColor: 'transparent', color: tabs==='d'?Constants.colors.primaryColor:'#000000',}]}>Daily</Text></Pressable>
                        <Pressable onPress={()=>setTabs('w')}><Text style={[styles.tabText, {backgroundColor: tabs==='w'?Constants.colors.whiteColor:'rgba(0, 169, 40, 0.15)', borderColor: tabs==='w'?Constants.colors.primaryColor: 'transparent', color: tabs==='w'?Constants.colors.primaryColor:'#000000',}]}>Weekly</Text></Pressable>
                        <Pressable onPress={()=>setTabs('m')}><Text style={[styles.tabText, {backgroundColor: tabs==='m'?Constants.colors.whiteColor:'rgba(0, 169, 40, 0.15)', borderColor: tabs==='m'?Constants.colors.primaryColor: 'transparent', color: tabs==='m'?Constants.colors.primaryColor:'#000000',}]}>Monthly</Text></Pressable>
                    </View>
                    {
                        tabs==='d'?(
                            <View>
                                <View style={styles.graphHeading}>
                                    <Text style={styles.headingText}>Daily Sales</Text>
                                    <Text style={styles.headingValue}><FontAwesome name='rupee' size={18} /> 2345.17</Text>
                                </View>
                                <LineChart
                                    data={daileyData}
                                    width={Constants.width}
                                    height={220}
                                    chartConfig={chartConfig}
                                    yAxisSuffix=''
                                    barPercentage='10'
                                    withInnerLines={false}
                                    withOuterLines={true}
                                    withShadow={false}
                                    style={{
                                        marginLeft: -26,
                                    }}
                                    bezier
                                />
                            </View>
                        ):tabs==='w'?(
                            <View>
                                <View style={styles.graphHeading}>
                                    <Text style={styles.headingText}>Weekly Sales</Text>
                                    <Text style={styles.headingValue}><FontAwesome name='rupee' size={18} /> 4345.17</Text>
                                </View>
                                <LineChart
                                    data={weeklyData}
                                    width={Constants.width}
                                    height={220}
                                    chartConfig={chartConfig}
                                    yAxisSuffix=''
                                    barPercentage='10'
                                    withInnerLines={false}
                                    withOuterLines={true}
                                    withShadow={false}
                                    style={{
                                        marginLeft: -26,
                                    }}
                                    bezier
                                />
                            </View>
                        ):(
                            <View>
                                <View style={styles.graphHeading}>
                                    <Text style={styles.headingText}>Monthly Sales</Text>
                                    <Text style={styles.headingValue}><FontAwesome name='rupee' size={18} /> 50345.17</Text>
                                </View>
                                <LineChart
                                    data={monthlyData}
                                    width={Constants.width}
                                    height={220}
                                    chartConfig={chartConfig}
                                    yAxisSuffix=''
                                    barPercentage='10'
                                    withInnerLines={false}
                                    withOuterLines={true}
                                    withShadow={false}
                                    style={{
                                        marginLeft: -26,
                                    }}
                                    bezier
                                />
                            </View>
                        )
                    }
                    <View style={styles.boxContainer}>
                        <View style={styles.box}>
                            <Text style={styles.boxHeading}>Total Sales</Text>
                            <Text style={styles.boxValue}><FontAwesome name='rupee' size={20} /> 50345.17</Text>
                            <Text style={styles.boxArrow}><AntDesign name='arrowup' /> 5.86%</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.boxHeading}>Earnings</Text>
                            <Text style={styles.boxValue}><FontAwesome name='rupee' size={20} /> 50345.17</Text>
                            <Text style={styles.boxArrow}><AntDesign name='arrowup' /> 5.86%</Text>
                        </View>
                    </View>
                    <View style={styles.containerBelow}>
                        <View>
                            <Text style={{fontSize: 22, fontFamily: Constants.fontFamily}}>Impressions</Text>
                            <LinearGradient style={{padding: 12, marginTop: 12,}} colors={['rgba(1, 170, 41, 0.09)','rgba(196, 196, 196, 0) 102.22%)']} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
                                <Image source={Images.lineGraphIcon} />
                            </LinearGradient>
                        </View>
                        <View style={{justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 22, fontWeight: '700'}}> 12,001</Text>
                            <Text style={{fontSize: 18, color: Constants.colors.primaryColor}}><AntDesign name='arrowup' size={20} />5.86%</Text>
                        </View>
                    </View>
                    <View style={[styles.containerBelow, {marginBottom: 60,}]}>
                        <View>
                            <Text style={{fontSize: 22, fontFamily: Constants.fontFamily}}>Engagements</Text>
                            <LinearGradient style={{padding: 12, marginTop: 12,}} colors={['rgba(1, 170, 41, 0.09)','rgba(196, 196, 196, 0) 102.22%)']} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
                                <Image source={Images.lineGraphIcon} />
                            </LinearGradient>
                        </View>
                        <View style={{justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 22, fontWeight: '700'}}> 12,001</Text>
                            <Text style={{fontSize: 18, color: Constants.colors.primaryColor}}><AntDesign name='arrowup' size={20} />5.86%</Text>
                        </View>
                    </View>
                </View>}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: Constants.padding,
        marginBottom: 50,
    },
    titleBar: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 99,
        paddingBottom: 14,
        paddingStart: 15,
    },
    title: {
        fontFamily: Constants.fontFamily,
        fontSize: 26,
        fontWeight: '800',
        marginStart: 20,
    },
    normalText: {
        fontFamily: Constants.fontFamily,
    },
    space: {
        width: 10,
    },
    orderNumber: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        color: Constants.colors.primaryColor,
        fontWeight: '700',
    },
    amount: {
        fontFamily: Constants.fontFamily,
        fontSize: 24,
        fontWeight: '700'
    },
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Constants.margin,
    },
    tabText: {
        fontFamily: Constants.fontFamily,
        padding: 8,
        paddingStart: Constants.padding,
        paddingEnd: Constants.padding,
        backgroundColor: 'rgba(0, 169, 40, 0.15)',
        marginRight: 12,
        borderRadius: Constants.borderRadius,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    graphHeading: {
        alignSelf: 'center',
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
        justifyContent: 'center',
    },
    headingText: {
        textTransform: 'uppercase',
        color: '#6F6F6F',
        fontSize: 18,
    },
    headingValue: {
        alignSelf: 'center',
        color: Constants.colors.primaryColor,
        fontSize: 20,
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
    },
    box: {
        padding: Constants.padding,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Constants.colors.primaryColor,
        borderRadius: Constants.borderRadius,
        marginTop: 12,
    },
    boxHeading: {
        fontFamily: Constants.fontFamily,
        fontSize: 22,
        color: '#676767',
    },
    boxValue: {
        fontFamily: Constants.fontFamily,
        fontSize: 20,
        fontWeight: '700',
        marginTop: 8,
    },
    boxArrow: {
        fontSize: 16,
        color: Constants.colors.primaryColor,
        marginTop: 2,
    },
    containerBelow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Constants.colors.whiteColor,
        padding: Constants.padding,
        borderRadius: Constants.borderRadius,
        marginBottom: 20,
    },
})

export default Dashboard