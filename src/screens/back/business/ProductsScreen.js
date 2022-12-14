import React, { useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Pressable,
    FlatList,
} from 'react-native'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/business/CustomAppBar'
import SearchBar from '../../../components/business/SearchBar'
import Constants from '../../../shared/Constants'
import RenderProducts from './RenderProducts'
import Feather from 'react-native-vector-icons/Feather'
import globatStyles from '../../../shared/globatStyles'
import { useNavigation } from '@react-navigation/native'
import CustomTabNavigationAdmin from '../../../navigations/CustomTabNavigationAdmin'
import Loading from '../../../components/Loading'
import axios from 'axios'
import { useEffect } from 'react'
import showToastmsg from '../../../shared/showToastmsg'
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveWidth } from 'react-native-responsive-dimensions'
// import { FlashList } from '@shopify/flash-list'

const ProductsScreen=(props)=>{
    const [tabs, setTabs] = useState('travel')
    const [showActionMenu, setShowActionMenu] = useState(false)
    const [userProdcuts,setuserProducts]=useState([])
    const navigation = useNavigation()
    const [showDrawer, setShowDrawer] = useState(false)
    const [pageLoader,setpageLoader] = useState(false)
    const [searchText,setsearchText]=useState('')
    const getProductsbyuserid=()=>{
        if(props.route.params.userDetails.business.business_id)
        {
            setpageLoader(true)
            axios.get(`${Constants.BASE_URL}business/get-product-details/${props.route.params.userDetails.business.business_id}`).then((data)=>{
                if(data.status==200){
                    setpageLoader(false)
                    if(data.data[0].user_product&&data.data[0].user_product.length>0){
                        setuserProducts(data.data[0].user_product)
                    }
                    else setuserProducts([])
                }
                else {
                    setpageLoader(false)
                    setuserProducts([])
                    showToastmsg('Error while getting data')
                }
            }).catch((err)=>{
                showToastmsg('Error while getting data')
            })
    }
    else {
        showToastmsg('Business id not found')
    }
    }
    const openDrawer = ()=>{
        setShowDrawer(!showDrawer)
    }
    const travel = [
       {
            id: 1,
            img: Images.travelOne
       },
       {
            id: 2,
            img: Images.travelTwo
        },
        {
            id: 3,
            img: Images.travelThree
        },
        {
            id: 4,
            img: Images.travelFour
        },
        {
            id: 5,
            img: Images.travelFive
        },
        {
            id: 6,
            img: Images.travelSix
        }
    ]
    const fashion = [
        {
            id: 1,
            img: Images.travelOne
       },
       {
            id: 2,
            img: Images.travelTwo
        },
        {
            id: 3,
            img: Images.travelThree
        },
        {
            id: 4,
            img: Images.travelFour
        },
        {
            id: 5,
            img: Images.travelFive
        },
        {
            id: 6,
            img: Images.travelSix
        }
    ]
    const lifestyle = [
        {
            id: 1,
            img: Images.travelOne
       },
       {
            id: 2,
            img: Images.travelTwo
        },
        {
            id: 3,
            img: Images.travelThree
        },
        {
            id: 4,
            img: Images.travelFour
        },
        {
            id: 5,
            img: Images.travelFive
        },
        {
            id: 6,
            img: Images.travelSix
        }
    ]
    const food = [
        {
            id: 1,
            img: Images.travelOne
       },
       {
            id: 2,
            img: Images.travelTwo
        },
        {
            id: 3,
            img: Images.travelThree
        },
        {
            id: 4,
            img: Images.travelFour
        },
        {
            id: 5,
            img: Images.travelFive
        },
        {
            id: 6,
            img: Images.travelSix
        }
    ]
    const toggleActionMenu = ()=>{
        navigation.navigate('/add-product',{userDetails:props?.route?.params?.userDetails})
    }

    useEffect(() => {
getProductsbyuserid()
    }, [props?.route?.params])
    return (
        <View style={{flex:1}}>

            <CustomAppBar
            title='Hello!'
            subName={props?.route?.params?.userDetails?.name} navigation={navigation} isMainscreen={false} isReel={false} 
            />
            {pageLoader?<Loading/>:
                <><ScrollView style={styles.container}>
                <SearchBar setsearchText={setsearchText} searchText={searchText}/>
                {/* <View style={styles.tabs}>
                    <Pressable onPress={()=>setTabs('travel')}>
                        <Text style={{...styles.tabText, color: tabs==='travel'?Constants.colors.primaryColor:null, fontWeight: tabs==='travel'?'800':'400', textDecorationColor: tabs==='travel'?Constants.colors.primaryColor: 'transparent'}}>Travel (8)</Text>
                        {tabs==='travel'?<View style={styles.activeTab}></View>:<View style={{...styles.activeTab, backgroundColor: 'transparent'}}></View>}
                    </Pressable>
                    <Pressable onPress={()=>setTabs('fashion')}>
                        <Text style={{...styles.tabText, color: tabs==='fashion'?Constants.colors.primaryColor:null, fontWeight: tabs==='fashion'?'800':'400', textDecorationColor: tabs==='fashion'?Constants.colors.primaryColor: 'transparent'}}>Fashion (10)</Text>
                        {tabs==='fashion'?<View style={styles.activeTab}></View>:<View style={{...styles.activeTab, backgroundColor: 'transparent'}}></View>}
                    </Pressable>
                    <Pressable onPress={()=>setTabs('lifestyle')}>
                        <Text style={{...styles.tabText, color: tabs==='lifestyle'?Constants.colors.primaryColor:null, fontWeight: tabs==='lifestyle'?'800':'400', textDecorationColor: tabs==='lifestyle'?Constants.colors.primaryColor: 'transparent'}}>Lifestyle (4)</Text>
                        {tabs==='lifestyle'?<View style={styles.activeTab}></View>:<View style={{...styles.activeTab, backgroundColor: 'transparent'}}></View>}
                    </Pressable>
                    <Pressable onPress={()=>setTabs('food')}>
                        <Text style={{...styles.tabText, color: tabs==='food'?Constants.colors.primaryColor:null, fontWeight: tabs==='food'?'800':'400', textDecorationColor: tabs==='food'?Constants.colors.primaryColor: 'transparent'}}>Food (5)</Text>
                        {tabs==='food'?<View style={styles.activeTab}></View>:<View style={{...styles.activeTab, backgroundColor: 'transparent'}}></View>}
                    </Pressable>
                </View> */}
                <View style={{paddingTop:10}}>
                    {userProdcuts.length>0?<FlatList
                        data={userProdcuts}
                        renderItem={item=><RenderProducts products={item} userDetails={props?.route?.params?.userDetails}/>}
                        keyExtractor={item=>item?.index}
                        />
                    :
                    <View style={{display:'flex',alignItems:'center',paddingTop:10}}>
                    <Text style={[styles.actionMenuItem,{color:'#000'}]}>
                            No product found
                        </Text>
                        </View>
                    }
                </View>
            </ScrollView>
            <Pressable style={styles.actionBtn} onPress={toggleActionMenu}>
                <View style={styles.actionBtnInner}>
                    <Feather name='plus' size={ responsiveFontSize(3) } color='#007635' />
                </View>
            </Pressable>
            </>}
            {/* {
                showActionMenu?<Pressable onPress={toggleActionMenu} style={globatStyles.overlay}></Pressable>:null
            }
            {
                showActionMenu?<View style={styles.actionMenuContent}>
                        <Pressable onPress={gotoAddProducts}><Text style={styles.actionMenuItem}>Add Products</Text></Pressable>
                        <View style={styles.divider}></View>
                        <Pressable onPress={()=>setTabs('travel')}><Text style={styles.actionSubMenuItem}>Travel</Text></Pressable>
                        <Pressable onPress={()=>setTabs('fashion')}><Text style={styles.actionSubMenuItem}>Fashion</Text></Pressable>
                        <Pressable onPress={()=>setTabs('lifestyle')}><Text style={styles.actionSubMenuItem}>Lifestyle</Text></Pressable>
                        <Pressable onPress={()=>setTabs('food')}><Text style={[styles.actionSubMenuItem, {borderBottomWidth: 0}]}>Food</Text></Pressable>
                    </View>:null
            } */}
            
            <CustomTabNavigationAdmin navigation={navigation} showDrawer={showDrawer} activeTab='productScreen'
                propValue={props?.route?.params?.userDetails}
                />
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexGrow:0,
        padding: Constants.padding,
        marginBottom: 100,
    },
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Constants.margin+16,
        marginBottom: Constants.margin+16,
    },
    tabText: {
        fontFamily: Constants.fontFamily,
        fontSize: 15,
    },
    activeTab: {
        height: 3,
        width: '100%',
        backgroundColor: Constants.colors.primaryColor,
        marginTop: 6,
    },
    actionBtn: {
        position: 'absolute',
        // top: responsiveHeight(80),
        right: responsiveWidth(6),
        borderRadius: 40,
        backgroundColor: '#007635',
        padding: 16,
        elevation: 10,
        zIndex: 999,
        marginTop: responsiveScreenHeight(78),
        marginBottom: responsiveScreenHeight(10),
        // marginBottom:,
    },
    actionBtnInner: {
        backgroundColor: Constants.colors.whiteColor,
        padding: 4,
        borderRadius: 30,
    },
    actionMenuContent: {
        position: 'absolute',
        top: Constants.height-400,
        right: 65,
        backgroundColor: Constants.colors.whiteColor,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 12,
    },
    divider: {
        height: 1,
        backgroundColor: '#817D91',
        marginBottom: 10,
    },
    actionMenuItem: {
        padding: 8,
        fontFamily: Constants.fontFamily,
        fontSize: 20,
    },
    actionSubMenuItem: {
        padding: 10,
        fontFamily: Constants.fontFamily,
        marginStart: 12,
        marginRight: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#817D91',
    },
})


export default ProductsScreen