import React from 'react';
import {Text, View, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
const windowHeight = Dimensions.get('window').height;
import { Ionicons } from '@expo/vector-icons';

export default function Numpad (props){
    return (
      <View style={styles.numPadContainer}>
        {
          [
            ["7", "8", "9"],
            ["4", "5", "6"],
            ["1", "2", "3"],
            ["0", ".", "b"],
          ].map(row => (
            <View style={styles.row} key={row[1]}>
              {row.map(value => (
                <TouchableOpacity
                  style={styles.cell}
                  value={value}
                  key={value}
                  onPress={() => props.handleNumpad(value)}
                >
                <View style={styles.btn}>
                  {
                    value === "b" ?
                      <Ionicons name="backspace-outline" size={30} color="white" />
                      :
                      <Text style={styles.digit}>{value}</Text>
                  }
                </View>
                </TouchableOpacity>
              ))}
            </View>
          ))
        }
      </View>
    )

}
const styles = StyleSheet.create({
  numPadContainer: {
    height: windowHeight/ 2,
    flexDirection: 'column',
    backgroundColor: '#131317',
    padding: 20,
    borderRadius: 15

  },

  row: {
    flexDirection: 'row',
    flex: 1,
    flexGrow: 1,
  },
  cell: {
    flex: 1,
    flexGrow: 1,
  },
  btn: {
    flex:1,
    flexGrow: 1,

    margin: 5,
    backgroundColor: 'black',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: "white",
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,


  },
  digit:{
    color: '#f7f7f7',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 'auto',
    
  }
})
