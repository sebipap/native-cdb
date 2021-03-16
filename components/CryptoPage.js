import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import ER from './ER'
import { ScrollView } from 'react-native-gesture-handler';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      erList: [],
      usdarsblue: {},
      usdarsofficial: {},
      eurarsblue: {},
      eurarsofficial: {},
      btcars: {},
      usdtars: {},
      btcusd: {},
      ethusd: {},
      usdeur: {},
      usdgbp: {},
      usdbrl: {},
      usdmxn: {},
      usdcny: {},

     loading: true
    }
  }

  componentDidMount(){  
    axios.get('https://crypto-dolar-blue.herokuapp.com/latest') 
    .then( res => {
        let coins = res.data

        coins.map( coin => {
          this.setState({
            ...this.state,
            [coin.symbol]: coin
          })
        } )
        this.setState({
          ...this.state,
          erList: coins,
          loading: false
        })

    })
    .catch( () => console.log("error"))
}

render(){
  if(this.state.loading){
    return(
        <Text>Loading...</Text>
    )
  }else{
    return(
      <ScrollView style={styles.body}>
            <View style={styles.erContainer}>
              <Text style={styles.title}>CRIPTOMONEDAS</Text>

                  <ER coin={this.state.btcusd} />
                  <ER coin={this.state.ethusd} />
                  <ER coin={this.state.usdtars} />
                  <ER coin={this.state.btcars} />
            </View>
      </ScrollView>
    )

  }



}
}

const styles = StyleSheet.create({
  erContainer: {
    color: 'white',
    margin: 20,
  },
  title:{
    color: 'gray',
    fontFamily: 'monospace'
  }
});


