import React, {useState, useEffect } from "react";
import {View, ScrollView, StyleSheet, Text, Alert, TouchableOpacity, Image} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Camera } from 'expo-camera';
import ImageInside from "./Image" 

  //functions called after pressing buttons

  function ArrivalScreen({navigation}) {

    //change page

    const ToHome = () => {
      navigation.navigate('Home')
    }

    //stylesheet

    const styles = StyleSheet.create({

      container: {
        width:'100%',
        height:"100%",
        backgroundColor: "purple",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
      },

      text:{
        fontSize:30,
        color:"white",
        marginTop:"30%",
        textAlign: "center"
      },

      text2:{
        fontSize:30,
        color:"white",
        marginTop:"10%",
        textAlign: "center",
        width:"80%"
      },

      title:{
        fontSize:50,
        color:"white",
        fontWeight:"bold",
        marginTop:"10%",
      },

      textbutton:{
        
        fontSize:26,
        color:"black",
        textAlign: "center",
      },

      button:{
        position:"absolute",
        bottom:60,
        width:200,
        height:60,
        backgroundColor:"white",
        borderRadius:60,
        display:"flex",
        justifyContent:"center"
      },
      
    });

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to...</Text>
        <Text style={styles.title}>Image In Air</Text>
        <Text style={styles.text2}>The very best live-taken pictures only chat, everywhere, for everyone.</Text>
      <TouchableOpacity style={styles.button} onPress={ToHome}>
        <Text style={styles.textbutton} >Get started</Text>
      </TouchableOpacity>
      </View>
    );
  } 

  function CameraScreen({navigation}){
    
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    

    useEffect(() => {
      (async () => {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
      })();
    }, [])

      
    
    const takePicture = async () => {

      if(camera){
        const data = await camera.takePictureAsync({quality: 0, base64: true, skipProcessing: true})
        const imagevariable=data.base64

        var formdata = new FormData();
        formdata.append("image", imagevariable)

        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        
        fetch("https://api.imgbb.com/1/upload?key=7b720df271257e940a556f40932bc99d", requestOptions)
        .then(response => response.json())
        .then(result => result.data.image.url)
        .catch(error => console.log('error', error));
        
        

        Alert.alert(
          "Congratulations",
          'Your image will get uploaded on our servers very soon',
          [{ text: "Hooray !", onPress: () => navigation.navigate('Home')}]
        )
          
      }
    }
    
    const styles = StyleSheet.create({
      cameraContainer: {
        flex: 1,
        flexDirection: 'row'
      },
      fixedRatio:{
        flex: 1,
        aspectRatio: 1
      },
      container: {
        display:"flex",
        flexDirection:"column", 
        backgroundColor:"purple",
        height:"100%",
        alignItems:"center"
      },
      buttonflip:{
        width:50,
        height:50,
        top:60,
        right:20,
        position:"absolute"
      },
      changeside:{
        width:50,
        height:50,
      },
      pictake:{
        backgroundColor:"white",
        width:250,
        height:60,
        bottom:"20%",
        borderRadius:30

      },
      pictext:{
        fontSize:25,
        paddingTop:12,
        paddingLeft:46
      }
    })
  
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      
     <View style={styles.container}>

        <View style={styles.cameraContainer}>
        
              <Camera 
              ref={ref => setCamera(ref)}
              style={styles.fixedRatio} 
              type={type}
              ratio={'1:1'} />

        </View>

        <TouchableOpacity style={styles.pictake} onPress={() => takePicture()}>
              <Text style={styles.pictext}>Take a picture</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonflip}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
          <Image style={styles.changeside}source={require ("./assets/arrow.png")}/>
        </TouchableOpacity>

     </View>
    );
  }
  
  function HomeScreen({navigation}) {

    const [hasPermission, setHasPermission] = useState(null);

    const InformationShow = () =>

    Alert.alert(
      "What is Image In Air ?",
      'Image In Air is a technologically advanced app that will allow you to share some real-time-taken photos with other members of Image In Air, in a massive images-chat available just for you. No text, no comments, no dislikes, just chill. Press the "Send new pic" button to get started right now.',
      [{ text: "Understood !"}]
    )

    useEffect(() => {
      (async () => {
        const {status} = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
    
    if (hasPermission === false) {
      Alert.alert(
        "Camera permissions disabled",
        'If you want to send pictures in Image In Air, you will have to change this parameter',
        [{ text: "Got it !"}]
      )
    }
    
    const ToTheCamera = () => {
      navigation.navigate('Camera')
    }
    
    //stylesheet

    const styles = StyleSheet.create({

      container: {
        flex: 1,
        flexDirection: "column",
      },

      header: {
        backgroundColor: "purple",
        height: 110,
        width:"100%",
        display: "flex",
        alignItems: 'center',
        position: "absolute",
      },

      title: {
        marginTop: 49,
        fontSize: 30,
        color: "white",
        fontWeight: "bold"
      },

      footer: {
        backgroundColor: "purple",
        height: 100,
        width:"100%",
        position:"absolute",
        bottom:0,
        alignSelf:"flex-end",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
      },
      
      picturebutton: {
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        backgroundColor: "white",
        height:60,
        width: 200,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"

      },
      buttontxt: {
        fontSize: 20,
        fontWeight: "bold"
      }
      ,
      camera: {
        marginLeft: 11,
        width:39,
        height:30
      },

      information: {
        marginLeft: 70,
        width:54,
        height:54
      },

      body: {
        top:110,
        marginBottom:210
      },

      

    });

    //elements of the page
    
    
    return (

      <View style={styles.container}>
        <View style = {styles.header}>
          <Text style = {styles.title}>Image In Air</Text>
        </View>

        <ScrollView style={styles.body}>
          
            <ImageInside/>
          
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.picturebutton} onPress={ToTheCamera}>
            <Text style={styles.buttontxt}>Send new pic</Text>
            <Image style={styles.camera} source = {{uri: "https://cdn.onlinewebfonts.com/svg/img_432151.png"}}></Image>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={InformationShow}>
            <Image style={styles.information} source = {require("./assets/information.png")}></Image>
          </TouchableOpacity>
        </View> 
  
      </View>
    
    );
  } 


const Stack = createNativeStackNavigator();

const App = () => {

  return <NavigationContainer>{

    <Stack.Navigator initialRouteName="ArrivalScreen" screenOptions={{headerShown: false,}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="ArrivalScreen" component={ArrivalScreen} />
      
    </Stack.Navigator>
    
  }</NavigationContainer>

}

export default App;