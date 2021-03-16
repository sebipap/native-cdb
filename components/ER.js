import React, {Component} from 'react'
import axios from 'axios'
import FormattedPrice from './FormattedPrice'
import { StyleSheet, Text, View} from 'react-native';


export default class ER extends Component{
    constructor(props){
        super(props)
        this.state ={
            bid: this.props.coin.bid,
            ask: this.props.coin.ask,
            ticker: this.props.coin.ticker
        }
        this.updatePrice = this.updatePrice.bind(this)
    }



    updatePrice(){
        axios.get('https://www.bitstamp.net/api/v2/ticker/' + this.props.coin.symbol + '/')
        .then( res => {
            this.setState({
                bid: res.data.bid ,
                ask: res.data.ask ,
            })
        })
        .catch(err => console.log('no response'+ err))

    }
    
    componentDidMount(){
        this.setState({
            bid: this.props.coin.bid,
            ask: this.props.coin.ask,
            id: "",
            ticker: this.props.coin.ticker
        })
        if(this.state.ticker == true){
            this.updatePrice()
            let seconds = 3 
            let the_interval = seconds* 1000
            setInterval(this.updatePrice, the_interval)
        }
    }

    render(){

        return(
            <View style={styles.container}>
                <View >
                    <Text style={[styles.name, styles.[this.props.coin.symbol]]}>{this.props.coin.name}</Text>
                </View>

                <Text>
                    <View >
                        <Text style={styles.type}>Venta </Text>
                        <Text style={styles.text}>
                            <Text style={styles.priceIn}>{this.props.coin.priceIn}</Text>
                            <FormattedPrice price={this.state.bid} size="big" />
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.div}> | </Text>
                    </View>

                    <View >
                        <Text style={styles.type}>Compra </Text>
                        <Text style={styles.text}>
                            <Text style={styles.priceIn}>{this.props.coin.priceIn}</Text>
                            <FormattedPrice price={this.state.ask} size="big"/>
                        </Text>
                    </View>
                </Text>
            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#131317',
        borderRadius: 7,
        shadowColor: 'black',
        shadowRadius: 20,
        marginBottom: 10,
        padding: 15,
    },
    div:{
        fontSize: 40,
        color: '#383838'
    },
    name:{
        fontSize: 20,
        fontWeight:'bold',
        color: 'white',
        marginBottom: 10
    },
    type:{
        color: '#cacaca',

    },
    priceIn: {
        color: 'gray',
        fontWeight: 'bold'
    },
    text:{
        color: 'white',
    },
    btcusd: {
        color: 'orange'
    },
    btcars: {
        color: 'orange'
    },
    usdtars: {
        color: 'rgb(0, 255, 98)'
      },
      
    ethusd: {
    color: 'rgb(43, 152, 255)'
    },
    
    usdarsblue: {
    color: 'rgb(56, 199, 255)'
    },
    
    usdarsofficial: {
    color: 'rgb(119, 211, 0)'
    },
    


})

