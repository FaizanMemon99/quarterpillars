import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Image,
    ScrollView,
    ActivityIndicator,
    Platform,
    PermissionsAndroid
} from 'react-native'
import Constants from '../../../shared/Constants'
import globatStyles from '../../../shared/globatStyles'
import DatePicker from 'react-native-date-picker'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import Images from '../../../assets/images/Images'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context'
import showToastmsg from '../../../shared/showToastmsg'
import axios from 'axios'
import {
    launchCamera,
    launchImageLibrary
  } from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather'

const InfluencerRegistration=(props)=>{
    const navigation = useNavigation()
    const [open, setOpen] = useState(false)
    const [cameraImg, setCameraImg]= useState()
    const [buttonLoader,setButtonLoader]=useState(false)
    const [date, setDate] = useState(null)
    const [gender,setGender] = useState('male')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [fullName,setfullName]=useState()
    const [emailId,setemailId]=useState()
    const [state,setstate]=useState()
    const [phone,setPhone]=useState()
    const [city,setcity]=useState()
    const [instagram,setInstagram]=useState()
    const [facebook,setFacebook]=useState()
    const [youtube,setYoutube]=useState()
    const [twitter,setTwitter]=useState()
    const [tiktok,setTiktok]=useState()
    const [pinterest,setPinterest]=useState()
    const [password,setpassword]=useState()
    const [cPassword,setCpassword]=useState()
    const [username,setUsername]=useState()
    const [addressType,setaddressType]=useState('home')
    const [location,setLocation]=useState()
    const [landMark,setlandMark]=useState()
    const [address1,setaddress1]=useState()
    const [address2,setaddress2]=useState()
    const [pincode,setpincode]=useState()
    const passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const UrlRegex=/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    const emailIdPattern=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                title: 'Camera Permission',
                message: 'App needs camera permission',
              },
            );
            // If CAMERA Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn(err);
            return false;
          }
        } else return true;
      };
     
      const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'External Storage Write Permission',
                message: 'App needs write permission',
              },
            );
            // If WRITE_EXTERNAL_STORAGE Permission is granted
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn(err);
            console.log('Write permission err', err);
          }
          return false;
        } else return true;
      };
    // const openCamera = async ()=>{
	// 	try{
	// 		const result = await launchCamera()
    //         console.log("images",result.assets[0])

	// 		setCameraImg(result.assets[0])
    //         // setCameraImg([...cameraImg])
	// 	}
    //     catch(err){
	// 		console.log("err",err.response)
	// 	}
    // }
    const openCamera = async () => {
        setCameraImg(null)
        let options = {
          mediaType: 'photo',
        //   maxWidth: 300,
        //   maxHeight: 550,
        //   quality: 1,
        //   videoQuality: 'low',
        //   durationLimit: 30, //Video max duration in seconds
          saveToPhotos: false,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
          launchCamera(options, (response) => {
            // console.log('Response = ', response);
     
            if (response.didCancel) {
              console.log('User cancelled camera picker');
              return;
            } else if (response.errorCode == 'camera_unavailable') {
              console.log('Camera not available on device');
              return;
            } else if (response.errorCode == 'permission') {
              console.log('Permission not satisfied');
              return;
            } else if (response.errorCode == 'others') {
              console.log(response.errorMessage);
              return;
            }
            // if(type=='video'){
              console.log("repsonse image",response);
              setCameraImg(response.assets[0])
            // }
            // else
            // {setCameraImg(response)};
          });
        }
      };
    const choosePhotoFromLibrary = async ()=>{
		try{
			const result = await launchImageLibrary()
console.log("folder image",result.assets[0]);
			setCameraImg(result.assets[0])
		}
        catch(err){
			console.log("err")
		}
    }
    const removeImg = ()=>{
        setCameraImg()
    }
    const gotoDashboard = ()=>{
if(fullName==''||fullName==null){
   showToastmsg('Please add full name') 
}
else if(!cameraImg){
    showToastmsg('Please add avatar image')
}
else if(emailId==''||emailId==null){
    showToastmsg('Please add email id') 
 }
 else if(!emailIdPattern.test(emailId)){
    showToastmsg('Please add valid email id') 
 }
 else if(date==''||date==null){
    showToastmsg('Please select date of birth') 
 }
 else if(emailId==''||emailId==null){
    showToastmsg('Please add email id') 
 }
 else if(state==''||state==null){
    showToastmsg('Please add state') 
 }
 else if(city==''||city==null){
    showToastmsg('Please add city') 
 }
 else if(phone==''||phone==null){
    showToastmsg('Please add phone') 
 }
 else if(phone.length<10){
    showToastmsg('Please enter 10 digit phone number') 
 }
 else if(props.route.params.type=='Influencer'&&(instagram==''||instagram==null)){
    showToastmsg('Please add instagram account link') 
 }
 else if(props.route.params.type=='Influencer'&&(!UrlRegex.test(instagram))){
    showToastmsg('Please add valid instagram account link') 
 }
//  else if(props.route.params.type=='Influencer'&&(facebook==''||facebook==null)){
//     showToastmsg('Please add facebook account link') 
//  }
 else if(props.route.params.type=='Influencer'&&facebook&&(!UrlRegex.test(facebook))){
    showToastmsg('Please add valid facebook account link') 
 }
//  else if(props.route.params.type=='Influencer'&&(youtube==''||youtube==null)){
//     showToastmsg('Please add youtube account link') 
//  }
 else if(props.route.params.type=='Influencer'&&youtube&&(!UrlRegex.test(youtube))){
    showToastmsg('Please add valid youtube account link') 
 }
//  else if(props.route.params.type=='Influencer'&&(twitter==''||twitter==null)){
//     showToastmsg('Please add twitter account link') 
//  }
 else if(props.route.params.type=='Influencer'&&twitter&&(!UrlRegex.test(twitter))){
    showToastmsg('Please add valid twitter account link') 
 }
//  else if(props.route.params.type=='Influencer'&&(tiktok==''||tiktok==null)){
//     showToastmsg('Please add tiktok account link') 
//  }
 else if(props.route.params.type=='Influencer'&&tiktok&&(!UrlRegex.test(tiktok))){
    showToastmsg('Please add valid tiktok account link') 
 }
//  else if(props.route.params.type=='Influencer'&&(pinterest==''||pinterest==null)){
//     showToastmsg('Please add pinterest account link') 
//  }
 else if(props.route.params.type=='Influencer'&&pinterest&&(!UrlRegex.test(pinterest))){
    showToastmsg('Please add valid pinterest account link') 
 }
 else if(username==''||username==null){
    showToastmsg('Please add username') 
 }
 else if(password==''||password==null){
    showToastmsg('Please add password') 
 }
 else if(!passwordPattern.test(password)){
    showToastmsg('Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
}
else if(cPassword==''||cPassword==null){
    showToastmsg('Please add confirm password') 
 }
 else if(password!=cPassword){
    showToastmsg('Password did not matched with confirm password') 
 }
 else if(props.route.params.type=='Explorer'&&(location==''||location==null)){
    showToastmsg('Please add location')
 }
 else if(props.route.params.type=='Explorer'&&(landMark==''||landMark==null)){
    showToastmsg('Please add land mark')
 }
 else if(props.route.params.type=='Explorer'&&(address1==''||address1==null)){
    showToastmsg('Please add address 1')
 }
//  else if(props.route.params.type=='Explorer'&&(address2==''||address2==null)){
//     showToastmsg('Please add address 2')
//  }
 else if(props.route.params.type=='Explorer'&&(pincode==''||pincode==null)){
    showToastmsg('Please add pincode')
 }
 else {
    setButtonLoader(true)
        // navigation.navigate('/influencer-stack-navigation')
        var formdata = new FormData();
formdata.append("name", fullName);
formdata.append("username", username);
formdata.append("email", emailId);
formdata.append("dob", `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`);
formdata.append("gender", gender);
formdata.append("city", city);
formdata.append("state", state);
formdata.append("country", "india");
formdata.append("insta_link", instagram);
formdata.append("insta_follower_count", "400");
formdata.append("fb_link", facebook);
formdata.append("fb_follower_count", "200");
formdata.append("youtube_link", youtube);
formdata.append("youtube_subscribers", "500");
formdata.append("twitter_link", twitter);
formdata.append("twitter_follower_count", "450");
formdata.append("tiktok_link", tiktok);
formdata.append("tiktok_followers_count", "600");
formdata.append("is_email_verified", "false");
formdata.append("is_mobile_verified", "false");
formdata.append("password", password);
formdata.append("mobile_number", phone);
formdata.append('profile_avatar', { uri: cameraImg.uri, name: cameraImg.fileName, type:cameraImg.type });
if(props.route.params.type=='Explorer'){
    formdata.append('address_type',addressType);
    formdata.append('location',location);
    formdata.append('land_mark',landMark);
    formdata.append('address_1',address1);
    formdata.append('address_2',address2);
    formdata.append('pin_code',pincode);
}

const headers = {
    'x-device-id': 'stuff',
    'Content-Type': 'multipart/form-data',
  }
        axios.post(props.route.params.type=='Explorer'?`${Constants.BASE_URL}explore/registration`:`${Constants.BASE_URL}influencer/registration`,formdata,{
            headers:headers
        }).then((response)=>{
            if(response.status==200){
                
                try {
                        axios.post(`${Constants.BASE_URL}auth/mobile-number`,{mobile_number:phone}).then((res)=>{
                            
                            if(res.data.response==200){
                                                setButtonLoader(false)
                                navigation.navigate('/business-otp',{userDetails: response.data.data.user_details,phoneNumber:phone,userType:props.route.params.type})
                                // navigation.navigate('/influencer-stack-navigation',{userDetails:res.data.data.user_details.influencer})   

                                showToastmsg(res.data.msg)
                                console.log("mobile otp value",res.data.data.otp)
                                console.log("mobile data response",res.data.data)
                            }
                            else {
                                setButtonLoader(false)
                                showToastmsg(res.msg)
                            }
                            
                        }).catch((err)=>{
                            setButtonLoader(false)
                            console.log("phone number otp error",err)
                        })
                    
                    
                } catch (error) {
                    setButtonLoader(false)
                    showToastmsg('Registration failed')
                    console.log(error)
                }
            }
            else {
                setButtonLoader(false)
                showToastmsg('Registration failed')
            }
            
        }).catch((err)=>{
            showToastmsg('Registration failed')
            setButtonLoader(false)
            console.log("influencer registration error",err.response);
        })
 }

    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.influencerRegiHeading}>{props.route.params.type} Registration</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .</Text>
                <Text style={styles.heading}>Avatar image</Text>
                {
                    cameraImg?(
                        <>
                        
                        <View style={{display:'flex',flexDirection:'row',justifyContent:'center',flexWrap:'wrap',padding: Constants.padding,}}>
                            
                                <View style={styles.cameraContainer}>
                                    <Image source={{uri: cameraImg.uri}} alt='Img' style={{
                    width: '100%',
                    height: 100,
                    resizeMode: 'contain',
                    margin: 5,marginBottom:20
                  }}  />
                                    <Pressable onPress={()=>removeImg()} style={styles.removeImg}><Text style={styles.removeIcon}>X</Text></Pressable>
                                </View>
                        
                        </View>
                        {/* <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                                <Pressable style={styles.cameraContainer} onPress={openCamera}>
                                    <Image source={Images.cameraIcon} alt='Img' />
                                    <Text style={styles.addCameraText}>Add more</Text>
                                </Pressable>
                                 <Pressable style={styles.cameraContainer} onPress={choosePhotoFromLibrary}>
                                 <Feather name="folder-plus" style={{fontSize:20}}/>
                                 <Text style={styles.addCameraText}>Add more</Text>
                             </Pressable>
                             </View> */}
                        </>
                        
                            ):( <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                            <Pressable style={styles.cameraContainer} onPress={openCamera}>
                                <Image source={Images.cameraIcon} alt='Img' />
                                <Text style={styles.addCameraText}>Add</Text>
                            </Pressable>
                             <Pressable style={styles.cameraContainer} onPress={choosePhotoFromLibrary}>
                             <Feather name="folder-plus" />
                             <Text style={styles.addCameraText}>Add</Text>
                         </Pressable>
                         </View>
                            )
                }
                <TextInput style={globatStyles.inputText} placeholder='Full Name' onChangeText={setfullName} />
                <TextInput style={globatStyles.inputText} placeholder='Email ID' onChangeText={setemailId}/>
                <View style={{width: '100%'}}>
                <Pressable style={[globatStyles.inputText,{height: 50,}]} onPress={()=>setOpen(true)}><Text style={[globatStyles.inputLabel, {position: 'absolute', left: 10, top: 5, zIndex: 999, color: '#999999',}]}>{date?`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`:`Date Of Birth`}</Text>
                    <AntDesign name='calendar' style={styles.calenderIcon} size={32} color='#999999' />
                    <Text></Text></Pressable>
                    <DatePicker
                        modal
                        mode='date'
                        open={open}
                        date={date?date:new Date()}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                </View>
                <TextInput keyboardType={'name-phone-pad'} placeholder='Phone number' style={globatStyles.inputText} onChangeText={setPhone}/>
                <Text style={globatStyles.inputLabel}>Gender</Text>
                <View style={styles.gender}>
                    {
                        gender==='male'?<Fontisto name='radio-btn-active' onPress={()=>setGender('male')} style={styles.genderIcon} />:<Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={()=>setGender('male')} />
                    }<Text style={styles.genderLabel} onPress={()=>setGender('male')}> Male</Text>
                    {
                        gender==='female'?<Fontisto name='radio-btn-active' onPress={()=>setGender('female')} style={styles.genderIcon} />:<Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={()=>setGender('female')} />
                    }<Text style={styles.genderLabel} onPress={()=>setGender('female')}> Female</Text>
                    {
                        gender==='others'?<Fontisto name='radio-btn-active' onPress={()=>setGender('others')} style={styles.genderIcon} />:<Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={()=>setGender('others')} />
                    }<Text style={styles.genderLabel} onPress={()=>setGender('others')}> Others</Text>
                </View>
                {props.route.params.type=='Explorer'&&
                    <>
                     <Text style={globatStyles.inputLabel}>Address type</Text>
                <View style={styles.gender}>
                    {
                        addressType==='home'?<Fontisto name='radio-btn-active' onPress={()=>setaddressType('home')} style={styles.genderIcon} />:<Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={()=>setaddressType('home')} />
                    }<Text style={styles.genderLabel} onPress={()=>setaddressType('home')}> Home</Text>
                    {
                        addressType==='office'?<Fontisto name='radio-btn-active' onPress={()=>setaddressType('office')} style={styles.genderIcon} />:<Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={()=>setaddressType('office')} />
                    }<Text style={styles.genderLabel} onPress={()=>setaddressType('office')}> Office</Text>
                    {
                        addressType==='others'?<Fontisto name='radio-btn-active' onPress={()=>setaddressType('others')} style={styles.genderIcon} />:<Fontisto style={styles.genderIcon} name='radio-btn-passive' onPress={()=>setaddressType('others')} />
                    }<Text style={styles.genderLabel} onPress={()=>setaddressType('others')}> Others</Text>
                </View>
                <View style={{marginTop: 12,}}>
                    <Fontisto name='map-marker-alt' style={styles.calenderIcon} size={32} color='#999999' />
                    <TextInput placeholder='Location' style={globatStyles.inputText} onChangeText={setLocation}/>
                </View>
                <View style={{marginTop: 12,}}>
                    <Fontisto name='map-marker-alt' style={styles.calenderIcon} size={32} color='#999999' />
                    <TextInput placeholder='Land mark' style={globatStyles.inputText} onChangeText={setlandMark}/>
                </View>
                <View style={{marginTop: 12,}}>
                    {/* <Fontisto name='map-marker-alt' style={styles.calenderIcon} size={32} color='#999999' /> */}
                    <TextInput placeholder='Address1' style={globatStyles.inputText} onChangeText={setaddress1} multiline={true}
                    numberOfLines={4}/>
                </View>
                {/* <View style={{marginTop: 12,}}> */}
                    {/* <Fontisto name='map-marker-alt' style={styles.calenderIcon} size={32} color='#999999' /> */}
                    {/* <TextInput placeholder='Address2' style={globatStyles.inputText} onChangeText={setaddress2} multiline={true} */}
                    {/* numberOfLines={4}/> */}
                {/* </View> */}
                <View style={{marginTop: 12,}}>
                    <Fontisto name='map-marker-alt' style={styles.calenderIcon} size={32} color='#999999' />
                    <TextInput placeholder='Pincode' style={globatStyles.inputText} onChangeText={setpincode}/>
                </View>
                    </>
                }
               
                <View style={{marginTop: 12,}}>
                    <Fontisto name='map-marker-alt' style={styles.calenderIcon} size={32} color='#999999' />
                    <TextInput placeholder='State' style={globatStyles.inputText} onChangeText={setstate}/>
                </View>
                <View style={{marginTop: 12,}}>
                    <Fontisto name='map-marker-alt' style={styles.calenderIcon} size={32} color='#999999' />
                    <TextInput placeholder='City' style={globatStyles.inputText} onChangeText={setcity}/>
                </View>
                {props.route.params.type!='Explorer'&&<>
                <View style={{flexDirection: 'row', flex: 3, marginBottom: 10,marginLeft: 10, alignItems: 'center',}}>
                    <View style={{flex: 0.65}}>
                        <View style={styles.socialIcon}>
                            <Image source={Images.instagram} />
                        </View>
                        
                    </View>
                    <View style={{flex: 2, marginTop: 14,}}>
                        <TextInput style={[globatStyles.inputText, {height: 50,}]} value={instagram} placeholder='http://' onChangeText={(e)=>setInstagram(e.includes("http://")?e:`http://${e}`)} />
                    </View>
                </View>
                <View style={{flexDirection: 'row', flex: 3, marginBottom: 10, marginLeft: 10, alignItems: 'center',}}>
                    <View style={{flex: 0.65}}>
                        <View style={styles.socialIcon}>
                            <Image source={Images.facebook} />
                        </View>
                        
                    </View>
                    <View style={{flex: 2, marginTop: 14,}}>
                        <TextInput style={[globatStyles.inputText, {height: 50,}]} placeholder='http://' onChangeText={(e)=>setFacebook(e.includes("http://")?e:`http://${e}`)} value={facebook} />
                    </View>
                </View>
                <View style={{flexDirection: 'row', flex: 3, marginLeft: 10, alignItems: 'center',}}>
                    <View style={{flex: 0.65}}>
                        <View style={styles.socialIcon}>
                            <Image source={Images.youtube} />
                        </View>
                        
                    </View>
                    <View style={{flex: 2, marginTop: 14,}}>
                        <TextInput style={[globatStyles.inputText, {height: 50,}]} placeholder='http://' onChangeText={(e)=>setYoutube(e.includes("http://")?e:`http://${e}`)} value={youtube} />
                    </View>
                </View>
                <View style={{flexDirection: 'row', flex: 3, marginBottom: 10,marginLeft: 10, alignItems: 'center',}}>
                    <View style={{flex: 0.65}}>
                        <View style={styles.socialIcon}>
                        <Image source={Images.twitter} />
                        </View>
                        
                    </View>
                    <View style={{flex: 2, marginTop: 14,}}>
                        <TextInput style={[globatStyles.inputText, {height: 50,}]} placeholder='http://' onChangeText={(e)=>setTwitter(e.includes("http://")?e:`http://${e}`)} value={twitter} />
                    </View>
                </View>
                <View style={{flexDirection: 'row', flex: 3, marginBottom: 10,marginLeft: 10, alignItems: 'center',}}>
                    <View style={{flex: 0.65}}>
                        <View style={styles.socialIcon}>
                        <Image source={Images.tiktok} />
                        </View>
                        
                    </View>
                    <View style={{flex: 2, marginTop: 14,}}>
                        <TextInput style={[globatStyles.inputText, {height: 50,}]} placeholder='http://' onChangeText={(e)=>setTiktok(e.includes("http://")?e:`http://${e}`)} value={tiktok} />
                    </View>
                </View>
                <View style={{flexDirection: 'row', flex: 3, marginBottom: 10,marginLeft: 10, alignItems: 'center',}}>
                    <View style={{flex: 0.65}}>
                        <View style={styles.socialIcon}>
                        <Image source={Images.pinterest} />
                        </View>
                        
                    </View>
                    <View style={{flex: 2, marginTop: 14,}}>
                        <TextInput style={[globatStyles.inputText, {height: 50,}]} placeholder='http://' onChangeText={(e)=>setPinterest(e.includes("http://")?e:`http://${e}`)} value={pinterest} />
                    </View>
                </View>
                </>}
                <TextInput style={globatStyles.inputText} placeholder='User name' onChangeText={setUsername} />
                <View style={{marginTop: 12,}}>
                
                    <TextInput style={globatStyles.inputText} secureTextEntry={!showPassword} placeholder='Enter Password' onChangeText={setpassword} />
                    {
                        showPassword?(
                            <Entypo name='eye-with-line' color='#D0C9D6' size={22} style={styles.password} onPress={()=>setShowPassword(false)} />
                        ):(
                            <Entypo name='eye' color='#D0C9D6' size={22} style={styles.password} onPress={()=>setShowPassword(true)} />
                        )
                    }
                </View>
                <View>
                    <TextInput style={globatStyles.inputText} secureTextEntry={!showConfirmPassword} placeholder='Confirm Password' onChangeText={setCpassword} />
                    {
                        showConfirmPassword?(
                            <Entypo name='eye-with-line' color='#D0C9D6' size={22} style={styles.password} onPress={()=>setShowConfirmPassword(false)} />
                        ):(
                            <Entypo name='eye' color='#D0C9D6' size={22} style={styles.password} onPress={()=>setShowConfirmPassword(true)} />
                        )
                    }
                </View>
                <Pressable style={globatStyles.button} onPress={!buttonLoader&&gotoDashboard}>{buttonLoader?<ActivityIndicator size={20} color={Constants.colors.whiteColor} />:<Text style={globatStyles.btnText}>Save</Text>}</Pressable>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Constants.padding,
        // paddingTop: 32,
    },
    influencerRegiHeading: {

        fontFamily: Constants.fontFamily,
        fontWeight: '700',
        fontSize: 26,
    },
    desc: {
        fontFamily: Constants.fontFamily,
        marginTop: Constants.margin,
        marginBottom: Constants.margin,
    },
    calenderIcon: {
        position: 'absolute',
        top: 8,
        right: 10,
        zIndex: 999,
    },
    gender: {
        flexDirection: 'row',
    },
    genderIcon:{
        fontSize: 24,
        marginTop: 10,
    },
    genderLabel: {
        marginLeft: 8,
        marginRight: Constants.margin+12,
        marginTop: 10,
    },
    socialIcon: {
        height: 60,
        width: 60,
        backgroundColor: Constants.colors.whiteColor,
        borderRadius: Constants.borderRadius,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialCheck: {
        position: 'absolute',
        top: -8,
        left: -8,
    },
    password: {
        position: 'absolute',
        top: 15,
        right: 10,
        zIndex: 999,
    },
    linkPrefix: {
        position: 'absolute',
        top: 15,
        left: 10,
        zIndex: 999,
    },
    cameraContainer: {
        marginTop: Constants.margin,
        marginBottom: 12,
        width: 90,
        height: 90,
        backgroundColor: Constants.colors.inputBgColor,
        borderWidth: 0.7,
        borderColor: '#D2D2D2',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Constants.borderRadius,
    },
    cameraImgContainer: {
        marginTop: Constants.margin,
        marginBottom: 12,
        width: 90,
        height: 90,
        backgroundColor: Constants.colors.inputBgColor,
        borderWidth: 0.7,
        borderColor: '#D2D2D2',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Constants.borderRadius,
    },
    removeImg: {
        position: 'absolute',
        left: 80,
        top: 10,
        width: 25,
        height: 25,
        borderRadius: 25,
        backgroundColor: Constants.colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Constants.colors.whiteColor,
    },
    removeIcon: {
        fontSize: 16,
        color: Constants.colors.inputBgColor,
    },
    addCameraText: {
        marginTop: 10,
        color: '#007635',
        fontWeight: '700'
    },
})

export default InfluencerRegistration