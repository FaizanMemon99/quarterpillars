import React, { useState,useEffect } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    BackHandler,
    ActivityIndicator,
} from 'react-native'
import Images from '../../../assets/images/Images'
import CustomAppBar from '../../../components/influencer/CustomAppBar'
import Constants from '../../../shared/Constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import axios from "axios"
import showToastmsg from '../../../shared/showToastmsg';
import Video from 'react-native-video'
import { FlashList } from '@shopify/flash-list'
const InfluencerProfileView=(props)=>{
    const navigation=useNavigation()
    const [loader,setLoader]=useState(false)
    const [userDetails,setuserDetails]=useState()
    const [userData,setuserData]=useState()
    const UserType="Influencer"
    // console.log('props value',userDetails);
    function isImage() {
        var url=`${Constants.BASE_IMAGE_URL}${userDetails?.influencer?.avatar}`
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
      }
      useEffect(()=>{
        setLoader(true)
        axios.get(`${Constants.BASE_URL}influencer/get-influencer-profile/${props?.route?.params?.userId}`)
    .then((response)=>{
        setLoader(false)
        if(response.data.data.influencers)
        {
        setuserDetails(response.data.data.influencers.influencers_details)
        setuserData(response.data.data.influencers)}
    })
    .catch((error)=>{
        setLoader(false)
        console.log("get profile api error=>",error.response);
        showToastmsg("Something went wrong. Please try again.")
    })
      },[])
      useEffect(()=>{
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            function(event){
                // event.preventDefault()
                navigation.navigate("/",{comeBack:true})
                return true;   
            }
          );
      
          return () => backHandler.remove();
    },[])
    return (
        <View style={{height:"100%"}}>
            <CustomAppBar 
            backRoute={"/"}
            editable={false} navigation={navigation} isMainscreen={false} isReel={false} title={userDetails?.name} userDetails={userDetails} type={"Influencer"} />
            <View style={styles.companyDetails}>
                    <Image source={isImage?
                            {uri:`${Constants.BASE_IMAGE_URL}${userDetails?.influencer?.avatar}`}:Images.profileIcon} style={styles.companyLogo} />
                    <View style={styles.companyInfo}>
                        <Text style={styles.email}>{userDetails?.name}</Text>
                        <Text style={styles.phone}>{UserType}</Text>
                    </View>
               </View>
               
               <View style={styles.socialDetails}>
                    <View style={styles.socialContainer}>
                        <Text style={styles.socialValue}>
                            {userData?.posts?userData?.posts?.length:0}
                        </Text>
                        <Text style={styles.socialActivity}>Posts</Text>
                    </View>
                    <View style={styles.socialContainer}>
                        <Text style={styles.socialValue}>
                        {userData?.following?userData?.following:0}
                        </Text>
                        <Text style={styles.socialActivity}>Following</Text>
                    </View>
                    <View style={{...styles.socialContainer, borderRightWidth: 0,}}>
                        <Text style={styles.socialValue}>
                        {userData?.followers?userData?.followers:0}
                        </Text>
                        <Text style={styles.socialActivity}>Follower</Text>
                    </View>
               </View>
               <View style={styles.divider}></View>
            <ScrollView style={styles.container}>
               
               {loader?
               <ActivityIndicator size={30}/>
               :<>
               
               <View style={styles.profileSection}>
                    {userData?.posts?.length>0?
                    <FlashList
                    data={userData?.posts}
                    keyExtractor={(item,index)=>index?.toString()}
                    numColumns={2}
                    estimatedItemSize={2}
                    renderItem={item=>(
                        <View style={styles.profileBgImg} >
                        <Video
                        source={{uri:`${Constants.BASE_IMAGE_URL}${JSON.parse(item?.item?.video)[0]}`}}
                        // onLoad={(e)=>console.log("onload",e)}
                        // onBandwidthUpdate={()=>console.log("bandwidht")}
                        // onBuffer={()=>console.log("buffering...")}
                        // onReadyForDisplay={(e)=>console.log("ready display",e)}
                        autoplay
                        repeat={true}
                        loop
                        muted
                        disableSeek
                        // onVideoBuffer={(e)=>console.log("bueeee",e)}
                        resizeMode={'cover'}
                        style={{width:"100%",height:"100%"}}
                        />
                            <Image source={Images.profileOne} style={styles.ImgContainer}/>
                            <View style={styles.comments}>
                                <AntDesign name='hearto' size={15} color={Constants.colors.whiteColor} style={{fontWeight:"900"}}/>
                                <Text style={{fontFamily: Constants.fontFamily,color: Constants.colors.whiteColor,marginStart: 8, marginEnd: 10,
                                fontSize:15,fontWeight:"800"
                                }}>
                                    {item?.item?.likes?item?.item?.likes:0}
                                </Text>
                                <FontAwesome name='comment-o' size={15} color={Constants.colors.whiteColor} style={{fontWeight:"900"}} />
                                <Text style={{fontFamily: Constants.fontFamily,color: Constants.colors.whiteColor,marginStart: 8,
                                fontSize:15,fontWeight:"800"
                                }}>{item?.item?.comments?item?.item?.comments:0}</Text>
                            </View>
                        </View>
                    )}
                    />
                    :
                    <View style={{display:'flex',alignItems:'center',width:"100%"}}>
                    <Text style={[styles.socialValue,{color:'#000'}]}>
                        No post found
                    </Text>
                    </View>
                    }
               </View>
               </>}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
height:"100%"    },
    companyDetails: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ImgContainer: {
        width : '98%',
        height : '100%',
 
     },
    companyLogo: {
        padding: Constants.padding+12,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: 20,
    },
    companyInfo: {
        marginLeft: Constants.margin,
    },
    email: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 20,
        textTransform:'capitalize'
    },
    phone: {
        fontFamily: Constants.fontFamily,
        marginTop: 8,
        color: '#A4A4B2',
        fontSize:20,
        textTransform:'capitalize'
    },
    moreInfo: {
        fontFamily: Constants.fontFamily,
        color: Constants.colors.primaryColor,
        marginTop: 8,
        fontWeight: '800',
        textDecorationColor: Constants.colors.primaryColor,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',

    },
    socialDetails: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        // paddingLeft:46
    },
    socialContainer:{
        padding: Constants.padding,
        paddingTop: 0,
        paddingBottom: 12,
        borderRightWidth: 2,
        borderRightColor: '#D9D9D9',
        marginTop: Constants.margin,
        alignItems: 'center',
    },
    socialValue: {
        color: '#007635',
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 22,
    },
    socialActivity: {
        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        marginTop: 12,
    },
    divider: {
        height: 2,
        width: '65%',
        backgroundColor: '#D9D9D9',
        alignSelf: 'center',
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
    },
    profileSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    profileBgImg: {
        width: '100%',
        height: 252,
        resizeMode: 'cover',
        // marginBottom : 4,
    },
    comments: {
        flexDirection: 'row',
        alignItems:"center",
        width:"100%",
        justifyContent:'center',
        position: 'absolute',
        top: 20,
        // left: 30,
    },
    summaryDesc: {
        padding:Constants.padding,
        fontFamily: Constants.fontFamily,
    },
})

export default InfluencerProfileView