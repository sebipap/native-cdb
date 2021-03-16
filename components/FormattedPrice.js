import React from 'react'
import {Text, View, StyleSheet} from 'react-native';

export default function FormattedPrice(props) {

const price = props.price
let k = 0;
let m = 0;
let n = 0;
let c = 0;
let big = "";
let small = "";
let mini = "";
let micro = "";


// 10^7

if(price>=10000000 ){
    m =  Math.trunc(Math.round(price)/1000000)
    small = m
    n = price - m * 1000000
    micro=Math.round(n)
    
}

// 10^6

if(price>=1000000 && price<10000000){
    m =  Math.trunc(Math.round(price)/1000000)
    small = m
    n = Math.round(price-m*1000000)
    let zeroAmount = 6 - n.toString().length
    mini = "0".repeat(zeroAmount) + n
}

// 10 ^ 5
if(price>=10000 && price<999999){
    k =  Math.trunc(Math.round(price)/1000)
    big = k
    n = Math.round(price-k*1000)
    let zeroAmount = 3 - n.toString().length
    small = "0".repeat(zeroAmount) + n

} 

// 10 ^ 4

if(price<10000 && price>999){
    big=Math.round(price)
}

// 10 ^ 0

if(price<=999 && price>=1){
    n = Math.trunc(price)
    big = n
    c = Math.round((price-n)*100)
    if(c>=10){
        small = "." + c

    }else{
        small = ".0" + c
    }
}

// 10 ^ -1

if(price<1 && price>0){
    big = 0
    c = Math.round(price*100000)
    let zeroAmount = 5 - (c.toString().length)
    small = "." + "0".repeat(zeroAmount) +c
}

if(price==0){
    big = 0
}

if(price==="0."){
    big="0."
}



if(props.size==="big"){
    return(
        <>
            <Text style = {[styles.h3, styles.h]}>{big}</Text>
            <Text style = {[styles.h4, styles.h]}>{small}</Text>
            <Text style = {[styles.h5, styles.h]}>{mini}</Text>
            <Text style = {[styles.h6, styles.h]}>{micro}</Text>

        </>
    )
}else if(props.size==="small"){
    return(
        <>
            <Text style = {[styles.h5, styles.h]}>{big}</Text>
            <Text style = {[styles.h6, styles.h]}>{small}</Text>
            <Text style = {[styles.h7, styles.h]}>{mini}</Text>
            <Text style = {[styles.h8, styles.h]}>{micro}</Text>
        </>
        )
}
}

const styles = StyleSheet.create({
    h3: {fontSize: 26},
    h4: {fontSize: 22},
    h5: {fontSize: 20},
    h6: {fontSize: 18},
    h7: {fontSize: 16},
    h8: {fontSize: 14},
    h: {
        fontWeight: 'bold',
        color: '#efefef'
    }




})

