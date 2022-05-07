//Here are the pictures

import React from "react";
import {View, Image, StyleSheet} from "react-native"

const database = [
  "https://th.bing.com/th/id/R.1b0c6b47eccb473fdb3fbff1f8340a18?rik=9vvtleHqG76jMQ&riu=http%3a%2f%2f1.bp.blogspot.com%2f-bSmEA7_j6Cg%2fUpP4dZV7BuI%2fAAAAAAAAATE%2fVWmLYg-jSaY%2fs1600%2fSonic-Lost-World-2.jpg&ehk=WvH1oeGNzkj2Z67tolxVtzPsTfQNDVNN4dtfLQiAbuk%3d&risl=&pid=ImgRaw&r=0"
, "https://i.jeuxactus.com/datas/jeux/s/o/sonic-the-hedgehog/xl/sonic-the-hedgehog-4e261104a999c.jpg"
, 'https://preview.redd.it/6t17t4u5ay621.jpg?auto=webp&s=0038ad64f02839b1ef61a059ffbd33722d5cb492'
, 'https://preview.redd.it/qr28pmbp4vf31.jpg?auto=webp&s=f26d76340603d671ba1d79b89b22cdd92216a729'
, 'https://th.bing.com/th/id/R.384e7201ab565da193a9534f17b5f040?rik=xS9yvqg53kiD%2fA&riu=http%3a%2f%2ffilmvf.info%2fwp-content%2fuploads%2f2020%2f02%2fSonic-The-Hedgehog-Box-Office-Second-Weekend.jpg&ehk=OUCQ4zFUmhCc4KQHdleNlm%2bjuw8sncw7AQU5pJvYnmg%3d&risl=&pid=ImgRaw&r=0'
, "https://i.jeuxactus.com/datas/jeux/s/o/sonic-the-hedgehog/xl/sonic-the-hedgehog-4e261104a999c.jpg"
, 'https://preview.redd.it/6t17t4u5ay621.jpg?auto=webp&s=0038ad64f02839b1ef61a059ffbd33722d5cb492'

]
class ImageInside extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      number: database.length

    };
  }

  getNbImages() {
    let i = 0;
    let images = [];
    while (i < this.state.number) {
      i++;
      images.push(<Image style={styles.imagecontained} source={{uri:database[i-1]}}/>);
    }
    return images;
  }

  render() {
    return <View style={styles.imagecontainer}>{this.getNbImages(this.state.number)}</View>;
  }
}
    

const styles = StyleSheet.create({
    imagecontained: {
        width:"30.6%",
        margin:"1.3%",
        height:120,
        backgroundColor: "black",
        borderRadius:5,
      },

      imagecontainer: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        width:"100%"
      },
})

export default ImageInside;