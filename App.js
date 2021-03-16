import * as React from 'react';
import SafeViewAndroid from './SafeViewAndroid'
import {StyleSheet, SafeAreaView, StatusBar, View, ActivityIndicator, Text } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import axios from 'axios'

import ERsPage from './components/ERsPage'
import CalcPage from './components/Calc/index'

const AppStatusBar = ({backgroundColor, ...props}) => {
  return (
      <View style={[styles.statusBar, backgroundColor]}>
          <StatusBar backgroundColor={backgroundColor} {...props} />
      </View>
  );
};


export default class App extends React.Component {
  constructor(){
    super()
    this.state= {
      erList: [],
      arg: [],
      world: [],
      crypto: [],
      loading: true
    }
    
  }

  componentDidMount(){
    axios.get('https://crypto-dolar-blue.herokuapp.com/latest') 
    .then( res => {

      let c = {}
      let ers = res.data
      ers.map( er => {
        c = {
            ...c,
            [er.symbol]: er
        }
      })  
        this.setState({
          ...this.state,
          arg: [c.usdarsblue, c.usdarsofficial, c.usdarsccl, c.usdarsmep, c.eurarsblue, c.eurarsofficial],
          world: [c.usdeur, c.usdgbp, c.usdbrl, c.usdmxn, c.usdcny],
          crypto: [c.btcusd, c.ethusd, c.usdtars, c.btcars],
          erList: ers,
          loading: false
        })

    })
    .catch( () => console.log("error pepe"))
  }
  render(){
    if(this.state.loading){
      return(
        <SafeAreaView style={[SafeViewAndroid.AndroidSafeArea, styles.body, {justifyContent: 'center',alignItems: 'center', flexDirection:'row'}]}>
          <Text style={{color: '#7b6bbf', fontSize: 20}}> Crypto Dólar Blue   </Text>
          <ActivityIndicator size="small" color="#7b6bbf" />
        </SafeAreaView>

      )
    }else{
      return (
        <>
          <StatusBar />

        <SafeAreaView style={[SafeViewAndroid.AndroidSafeArea, styles.body]}>
          <ScrollableTabView 
            tabBarInactiveTextColor = "#969696"
            tabBarActiveTextColor = "#ffae00"
            tabBarUnderlineStyle = {styles.line}
            tabBarTextStyle = {styles.tabBarText}
          >
    
            <ERsPage 
              tabLabel="Argentina"  
              erList={this.state.arg}
              title = "CAMBIO ARGENTINA"
            />

            <ERsPage 
              tabLabel="Crypto"  
              erList={this.state.crypto}
              title = "CRIPTOMONEDAS"
            />

            <ERsPage 
              tabLabel="Mundo"  
              erList={this.state.world}
              title = "TIPO DE CAMBIO EN EL MUNDO"
            />
            <CalcPage 
              tabLabel="Conversor" 
              erList={this.state.erList} />
    
          </ScrollableTabView>
        </SafeAreaView>
       </>
      )
    }
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#000000',
    flex: 1,
  },
  line: {
    backgroundColor: '#855a00'
  },
  tabBarText: {
    fontWeight: 'bold',
  }
});

