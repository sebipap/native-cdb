import React from 'react';
import {Text, View, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import NumPad from './NumPad'


export default class Calc extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      exRateType: "blue",
      exRateTypeColor: "FFFFFF",
      currencyA: "usd",
      valueA: "0",
      currencyB: "usd",
      valueB: "0",
  }
    this.handleNumpad = this.handleNumpad.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.makeConversion = this.makeConversion.bind(this)
    this.changeInputs = this.changeInputs.bind(this)

  }

  handleNumpad(value){
    let newValue
    let valueA = this.state.valueA

    
    if(value==="b"){
      newValue = Number(valueA.toString().slice(0, -1))
    }else{
      if(valueA.length>=12) return
      if(valueA=="0" && value!="."){

        newValue = value
      }else{
        newValue = valueA + value
      }
    }


    
    if(newValue==="0."){
      this.setState({
        ...this.state,
        valueA: "0.01"
        })
    }else{
      if(!isNaN(Number(newValue))){
        this.setState({
        ...this.state,
        valueA: newValue
        })
      }else{
        newValue = this.state.valueA

      }
    }
    

    
    this.handleChange({target:{name:'valueA', value: newValue}})
  }

  handleChange(e) {
    this.makeConversion(e)
}

  makeConversion(e){

      let localA = this.state.valueA
      let exRateType = this.state.exRateType
      let currencyA = this.state.currencyA
      let currencyB = this.state.currencyB

      switch (e.target.name) {
          case "currencyA":
              currencyA = e.target.value
              break;
              
              case "currencyB":
                  currencyB = e.target.value
              break;
              
          case "valueA":
              localA = e.target.value
              break;
              
          case "exRateType":
              exRateType = e.target.value

              break;
              
          default:
              break

          }      
                  
      // exchange rates are defined compared to 1 USD
      let exRates = {}

      this.props.erList.map( er => {
          exRates = {
              ...exRates,
              [er.symbol]: er.avg
          }
      } )

      exRates.usdusd = 1
      exRates.usdbtc = 1 / exRates.btcusd
      exRates.usdeth = 1 / exRates.ethusd

      let exRateNameA = "usd" + currencyA
      if(currencyA==="ars"){
          exRateNameA=exRateNameA + exRateType 
      }


      let exRateNameB = "usd" + currencyB
      if(currencyB==="ars"){
          exRateNameB=exRateNameB + exRateType
      }
      
      let localB = ( localA / exRates[exRateNameA]) * exRates[exRateNameB];

      if(localB >= 10){
          localB =  Math.round(localB*100) /100 
      }

      this.setState({
          ...this.state,
          valueB: Math.round(localB*10000000) /10000000 ,
          [e.target.name]: e.target.value,

      })

  }

  changeInputs(){
    let valueA = this.state.valueA
    let valueB = this.state.valueB
    let currencyA = this.state.currencyA
    let currencyB = this.state.currencyB

    console.log([valueA, valueB, currencyA, currencyB])

    this.setState({
      ...this.state,
      valueA: valueB,
      valueB: valueA,
      currencyA: currencyB,
      currencyB: currencyA
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.containerTop}>


          <TouchableOpacity 
            style={[styles.pairContainer, styles.activeContainer]}>
            <View style={styles.pickerContainer}>

              <Picker
                style={styles.currencyInput}
                selectedValue={this.state.currencyA}
                dropdownIconColor="#FFFFFF"
                onValueChange={(itemValue, itemIndex) =>
                  this.handleChange({ target: { name: "currencyA", value: itemValue } })
                }
                >
                <Picker.Item label="USD - Dólar" value="usd" />
                <Picker.Item label="ARS - Peso Argentino" value="ars" />
                <Picker.Item label="EUR - Euro" value="eur" />
                <Picker.Item label="BTC - Bitcoin" value="btc" />
                <Picker.Item label="ETH - Etherum" value="eth" />
                <Picker.Item label="BRL - Real Brasilero" value="brl" />
                <Picker.Item label="GBP - Libra Esterlina" value="gbp" />
                <Picker.Item label="MXN - Peso Mexicano" value="mxn" />
                <Picker.Item label="CNY - Yuan Chino" value="cny" />
              </Picker>
            </View>
            <Text style={styles.valueNum}>{this.state.valueA}</Text>

          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.pairContainer}
            onPress={this.changeInputs}>
            <View style={styles.pickerContainer}>

              <Picker
                style={styles.currencyInput}
                dropdownIconColor="#FFFFFF"

                selectedValue={this.state.currencyB}
                onValueChange={(itemValue, itemIndex) =>
                  this.handleChange({ target: { name: "currencyB", value: itemValue } })
                }>
                <Picker.Item label="USD - Dólar Americano" value="usd" />
                <Picker.Item label="ARS - Peso Argentino" value="ars" />
                <Picker.Item label="EUR - Euro" value="eur" />
                <Picker.Item label="BTC - Bitcoin" value="btc" />
                <Picker.Item label="ETH - Etherum" value="eth" />
                <Picker.Item label="BRL - Real Brasilero" value="brl" />
                <Picker.Item label="GBP - Libra Esterlina" value="gbp" />
                <Picker.Item label="MXN - Peso Mexicano" value="mxn" />
                <Picker.Item label="CNY - Yuan Chino" value="cny" />
              </Picker>
            </View>

            <Text style={styles.valueNum}> {this.state.valueB}</Text>

          </TouchableOpacity>

              

          <View style={styles.tdc}>
            {(this.state.currencyA === "ars" || this.state.currencyB === "ars")
              ?
              <>
                <View style={{ justifyContent: 'center', flex: 1, flexGrow: 1 }}>
                  <Text style={{ color: 'white' }}>Tipo de cambio</Text>
                </View>
                <View style={{ flex: 1, flexGrow: 1, justifyContent: 'center' }}>

                  <Picker
                    style={{ color: "white" }}
                    dropdownIconColor="#FFFFFF"
                    selectedValue={this.state.exRateType}
                    onValueChange={(itemValue, itemIndex) =>
                      this.handleChange({ target: { name: "exRateType", value: itemValue } })
                    }>
                    <Picker.Item label="Oficial" value="official" />
                    <Picker.Item label="Blue" value="blue" />

                  </Picker>
                </View>

              </>
              :
              <></>
            }


          </View>






        </View>
        <NumPad handleNumpad={this.handleNumpad} style={{ flex: 1, flexGrow: 1 }} />
      </View>
      )
  }

    
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flexDirection: 'column',
    flex: 1
  },

  containerTop: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',

  },

  pairContainer: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#131317',
    borderRadius: 15,
    justifyContent: 'center',
    flex: 2,
    flexGrow: 2,
    borderColor: '#131317',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',


  },

  activeContainer:{
    borderColor: '#ffb64f',
    borderWidth: 1
  },

  pickerContainer: {
    flex: 2,
    flexGrow: 2,
    justifyContent: 'center',
    marginLeft: 15


  },
  valueNum: {
    color: "white",
    marginRight: 15,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 3,
    flexGrow: 3,

  },
  currencyInput:{
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  tdc: {
    margin: 10,
    padding: 10,
    flexDirection: "row",
    flex: 1,
    flexGrow: 1,
    justifyContent:'center',

  },


})