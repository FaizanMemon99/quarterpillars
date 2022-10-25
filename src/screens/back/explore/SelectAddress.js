import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    Pressable,
    ActivityIndicator,Image
} from 'react-native'
import CustomAppBar from '../../../components/explore/CustomAppBar'
import Constants from '../../../shared/Constants'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import globatStyles from '../../../shared/globatStyles'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const SelectAddress = (props)=>{
    const [selectedAddr,setselectedAddr]=useState(0)
    const [loader,setLoader] = useState(false)
    const [address,setAddress] = useState([])
    const navigation=useNavigation()
    const addAddress = (type,data)=>{
        if(data)
        {
            navigation.navigate('/add-address',{
                explore_address_id:data.id,
                address_type:type,price:props?.route?.params?.price,
                cartItems:props?.route?.params?.cartItems,
                userDetails:props?.route?.params?.userDetails,
                editable:true,
                locationName:data.address_name,
                addressLine:data.address,
                pinCode:data.zip_code,
                city:data.city,
                state:data.state,
                landmark:data.landmark
            })
        }
        else
        navigation.navigate('/add-address',{address_type:type,price:props?.route?.params?.price,cartItems:props?.route?.params?.cartItems,userDetails:props?.route?.params?.userDetails})
    }
    const gotoPayment = ()=>{
        let selectAddress={}
        if(selectedAddr==0){
            selectAddress=address.filter((i)=>i.address_type=='Home')
        }
        else if(selectedAddr==1){
            selectAddress=address.filter((i)=>i.address_type=='Office')
        }
        else {
                selectAddress=address.filter((i)=>i.address_type=='Others')
        }
        navigation.navigate('/payment-details',{price:props?.route?.params?.price,selectedAddress:`${selectAddress[0].address}, ${selectAddress[0].city} - ${selectAddress[0].zip_code}. ${selectAddress[0].state}. ${selectAddress[0].landmark}.`,discount:props?.route?.params?.discount,totalPrice:props?.route?.params?.totalPrice})
    }
    const getAddress=()=>{
        setLoader(true)
        axios.post(`${Constants.BASE_URL}explore/get-explore-address`,{
            explore_id:props?.route?.params?.userDetails?.id
        }).then((response)=>{
            setLoader(false)
            if(response.data.data.explore_address){
                setAddress(response.data.data.explore_address)
                setselectedAddr(response.data.data.explore_address[0].address_type=='Home'?0:response.data.data.explore_address[0].address_type=='Office'?1:2)
            }
        })
        .catch((error)=>{
            console.log("error",error);
        })
    }
    useEffect(()=>{
        getAddress()
    },[props?.route?.params])
    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor='transparent' />
            <CustomAppBar navigation={navigation} isMainscreen={false} isReel={false} title='Select Address' headerRight={false} />
            <ScrollView style={styles.wrapper}>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
                </Text>
                {/* <Pressable onPress={addAddress} style={globatStyles.btnAddAddress}><Text style={globatStyles.btnTextAddress}><FontAwesome name='plus' /> Add Address</Text></Pressable> */}
                
                <Text style={styles.heading}>Saved Address</Text>
                <View style={globatStyles.divider}></View>

                {loader?
                <ActivityIndicator/>:
                   <>
                   {address.filter((i)=>i.address_type=='Home').length>0? address.filter((i)=>i.address_type=='Home').map((item,index)=><>
                <Pressable style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} onPress={()=>setselectedAddr(0)}>
                    
                    <View style={{width:'20%',display:'flex',alignItems:'center'}}><FontAwesome name='home' size={22}/></View>
                    <View style={{width:'80%'}}>
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={[styles.addressDetails,{fontWeight:selectedAddr===0?'800':'normal'}]}>{item.address_type}</Text>
                    <Pressable onPress={()=>addAddress('Home',item)}>
                        <FontAwesome name='pencil' size={15} style={{marginRight:10}}/>
                        </Pressable>
                    </View>
                <Text style={[styles.addressDetails,{fontWeight:selectedAddr===0?'800':'normal'}]}>{item.address_name}</Text>
                <Text style={[styles.addressDetails,{fontWeight:selectedAddr===0?'800':'normal'}]}>{item.address}, {item.city} - {item.zip_code}, {item.state}</Text>
                </View>
                </Pressable>
                <View style={globatStyles.divider}></View>
                </>):
                <>
                   <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} 
                //    onPress={()=>setselectedAddr(0)}
                   >
                    <View style={{width:'20%',display:'flex',alignItems:'center'}}><FontAwesome name='home'  size={22}/></View>
                    <View style={{width:'80%'}}>
                    <Pressable onPress={()=>addAddress('Home')} style={globatStyles.btnAddAddress}><Text style={globatStyles.btnTextAddress}><FontAwesome name='plus' /> Add Home Address</Text></Pressable>
                </View>
                </View>
                <View style={globatStyles.divider}></View>
                </>}
                {address.filter((i)=>i.address_type=='Office').length>0? address.filter((i)=>i.address_type=='Office').map((item,index)=><>
                <Pressable style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} onPress={()=>setselectedAddr(1)}>
                    
                    
                    <View style={{width:'20%',display:'flex',alignItems:'center'}}><FontAwesome name='building'  size={22}/></View>
                    <View style={{width:'80%'}}>
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={[styles.addressDetails,{fontWeight:selectedAddr===1?'800':'500'}]}>{item.address_type}</Text>
                    <Pressable onPress={()=>addAddress('Office',item)}>
                        <FontAwesome name='pencil' size={15} style={{marginRight:10}}/>
                        </Pressable>
                    </View>
                <Text style={[styles.addressDetails,{fontWeight:selectedAddr===1?'800':'500'}]}>{item.address_name}</Text>
                <Text style={[styles.addressDetails,{fontWeight:selectedAddr===1?'800':'500'}]}>{item.address}, {item.city} - {item.zip_code}, {item.state}</Text>
                </View>
                </Pressable>
                <View style={globatStyles.divider}></View>
                </>):
                <>
                   <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} 
                //    onPress={()=>setselectedAddr(0)}
                   >
                    <View style={{width:'20%',display:'flex',alignItems:'center'}}><FontAwesome name='building' size={22}/></View>
                    <View style={{width:'80%'}}>
                    <Pressable onPress={()=>addAddress('Office')} style={globatStyles.btnAddAddress}><Text style={globatStyles.btnTextAddress}><FontAwesome name='plus' /> Add Office Address</Text></Pressable>
                </View>
                </View>
                <View style={globatStyles.divider}></View>
                </>}
                {address.filter((i)=>i.address_type=='Others').length>0? address.filter((i)=>i.address_type=='Others').map((item,index)=><>
                <Pressable style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} onPress={()=>setselectedAddr(2)}>
                    
                    
                    <View style={{width:'20%',display:'flex',alignItems:'center'}}><FontAwesome name='map-pin'  size={22}/></View>
                    <View style={{width:'80%'}}>
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={[styles.addressDetails,{fontWeight:selectedAddr===1?'800':'500'}]}>{item.address_type}</Text>
                    <Pressable onPress={()=>addAddress('Office',item)}>
                        <FontAwesome name='pencil' size={15} style={{marginRight:10}}/>
                        </Pressable>
                    </View>
                <Text style={[styles.addressDetails,{fontWeight:selectedAddr===0?'800':'normal'}]}>{item.address_name}</Text>
                <Text style={[styles.addressDetails,{fontWeight:selectedAddr===0?'800':'normal'}]}>{item.address}, {item.city} - {item.zip_code}, {item.state}</Text>
                </View>
                </Pressable>
                <View style={globatStyles.divider}></View>
                </>):
                <>
                   <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} 
                //    onPress={()=>setselectedAddr(0)}
                   >
                    <View style={{width:'20%',display:'flex',alignItems:'center'}}><FontAwesome name='map-pin' size={22}/></View>
                    <View style={{width:'80%'}}>
                    <Pressable onPress={()=>addAddress('Others')} style={globatStyles.btnAddAddress}><Text style={globatStyles.btnTextAddress}><FontAwesome name='plus' /> Add Others Address</Text></Pressable>
                </View>
                </View>
                <View style={globatStyles.divider}></View>
                </>}
</>
                }
                {/* <Pressable onPress={()=>setselectedAddr(1)}>
                <Text style={[styles.addressDetails,{fontWeight:selectedAddr===1?'800':'normal'}]}>House Two</Text>
                <Text style={[styles.addressDetails,{fontWeight:selectedAddr===1?'800':'normal'}]}>Blk 35 Mandalay Road # 13–37 Mandalay Towers Singapore 308215</Text>
                </Pressable>
                <View style={globatStyles.divider}></View> */}
            </ScrollView>
            {!loader&&address.length<=0?null:
                <Pressable onPress={gotoPayment} style={[globatStyles.button, {marginTop: 10,marginBottom:10,marginLeft:5,width:Constants.width-10}]}>
                    {loader?
                    <View style={{textAlign:'center'}}><ActivityIndicator color={'white'}/>
                    </View>
                    :<Text style={globatStyles.btnText}>Place Order ( <FontAwesome name='rupee' /> {props?.route?.params?.price} )</Text>}
                    </Pressable>
                     } 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    description: {
        fontFamily: Constants.fontFamily,
    },
    wrapper: {
        padding: Constants.padding,
    },
    heading: {
        fontFamily: Constants.fontFamily,
        fontSize: 22,
        marginTop: 12,
        marginBottom: 12,
    },
    addressDetails: {
        fontFamily: Constants.fontFamily,
    },
})

export default SelectAddress