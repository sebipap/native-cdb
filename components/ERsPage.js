import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import ER from './ER'
import { ScrollView } from 'react-native-gesture-handler';

export default function App (props) {
  
    return(
      <ScrollView style={styles.body}>
            <View style={styles.erContainer}>
              <Text style={styles.title}>{props.title}</Text>

              {props.erList.map( er => (<ER coin={er} key={er.symbol}/>))}        

            </View>
      </ScrollView>
    )

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


