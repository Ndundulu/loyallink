import { Image, View } from 'react-native';
import React from 'react';
import SearchBar from '../Components/SearchBar'
const HomeScreen = () => {
    return (
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <Image source={require('../../assets/images/logo.png')}
                style={{width: 350, height: 350,}}
            />
            <View>
                <SearchBar/>
            </View>
        </View>
    );
};

export default HomeScreen