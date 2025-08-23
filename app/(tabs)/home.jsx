import { Image, View } from 'react-native';
import React from 'react';
import Greeting from '../components/greeting';
import SearchBar from '../components/searchBar';
import {SignOutButton} from '../components/SignOutButton'
const HomeScreen = () => {
    return (
        <View style={{justifyContent:'center', alignItems:'center'}}>
	<SignOutButton/>
            <Image source={require('../../assets/images/logo.png')}
                style={{width: 350, height: 350,}}
            />
            <View>

                <Greeting/>
            </View>
            <View>
                <SearchBar/>
            </View>
        </View>
    );
};

export default HomeScreen
