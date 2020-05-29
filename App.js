   
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {Button, Text, View, Image, StyleSheet, BackHandler, TouchableOpacity, Platform} from 'react-native';
import { WebView } from 'react-native-webview';
var WEB_VIEW_REF = 'webview';
var URL = 'https://forum.latticex.foundation' 
var IsIOS = Platform.OS == 'IOS' ? true : false;
//console.log(IsIOS)
class App extends Component {
  constructor(props){
      super(props);
      this.state = {
          loading: true,
          backEnabled: !IsIOS ? true : false,
          forwardEnabled: !IsIOS ? true : false,
      }
      
  }
  componentDidMount() {
	console.log("componentDidMount")
    BackHandler.addEventListener('hardwareBackPress',
    this.onBackButtonPressAndroid);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress',
    this.onBackButtonPressAndroid);
  }
  onBackButtonPressAndroid = () => {
	  console.log("onBackButtonPressAndroid")
	  
	  
	  //this.refs[WEB_VIEW_REF].updateNavigationState({navState:""})
	  this.refs[WEB_VIEW_REF].goBack();
	  
	  
     
	 if (this.lastBackPressed && this.lastBackPressed + 500 >= Date.now()) {
	  //最近秒内按过back键，可以退出应用。
	  return false;
	 }
	 this.lastBackPressed = Date.now();
	 //ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
	 return true;
      
  }
  loaded(){
    console.log("loaded")
    this.setState({loading:false})
  }
    
  onNavigationStateChange = (navState)=> {
      console.log("onNavigationStateChange")
	  console.log(navState)
      this.setState({
        forwardEnabled: navState.canGoForward,
		backEnabled: navState.canGoBack
                    
    });
  };
  _prev(){
	  console.log(this.refs)
      //alert("_prev")
      this.refs[WEB_VIEW_REF].goBack();      //console.log(this.refs)
      //this.props.nav.pop();
      
  }
  _next(){
      this.refs[WEB_VIEW_REF].goForward();
   }
  render(){
    const {loading, backEnabled,forwardEnabled}= this.state;
    const _this = this;
    return (
      <>
        <WebView
          ref={WEB_VIEW_REF}
      style={{"width":"100%","height":200,"marginTop":20}} source={{ uri: URL}}
          javascriptEnabled={true}
          scrollEnabled={true}
          scalesPageToFit={true}
          automaticallyAdjustContentInsets={true}
          onLoad={function(){
            _this.loaded()
            }}
        onNavigationStateChange={this.onNavigationStateChange}
            />
        {loading ?
		  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor:'#fff'}}>
            <Image style={styles.imageLocalStyle} source={require('./images/timg.gif')} />
          
          </View> :
			
            IsIOS ? (<View style={{"width":"100%","height":30,"textAlign":"center"}}>
            { backEnabled ?
            <TouchableOpacity style={{width:30,height:30,
           position:"absolute",
            left:"40%"
            
            }}
            onPress={this._prev.bind(this)}>
                      <Image
                      style={styles.imageLocalStyle}
                      source={require('./images/back.png')} />
            
             </TouchableOpacity>
            :
             <Image style={{width:30,height:30,
           position:"absolute",
            left:"40%"
            }}
              source={require('./images/back1.png')} />
            }
           
            { forwardEnabled ?
            <TouchableOpacity style={{width:30,height:30,
             position:"absolute",
             right:"40%"          }}
            onPress={this._next.bind(this)}>
                      <Image
                      style={styles.imageLocalStyle}
                      source={require('./images/next1.png')} />
             </TouchableOpacity>
            :
             <Image style={{width:30,height:30,
            position:"absolute",
            right:"40%"            }}
              source={require('./images/next.png')} />
            }
			
            
            </View>) : null
            
            }
        </>
    );
  };
};


const styles = StyleSheet.create({
  imageLocalStyle: {
   
    
  },
})

export default App;

