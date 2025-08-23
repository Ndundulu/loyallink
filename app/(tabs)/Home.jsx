import { Image, View } from 'react-native';
import React from 'react';
import Greeting from '../Components/greeting';
import SearchBar from '../Components/searchBar';
import {SignOutButton} from '../Components/SignOutButton'
const HomeScreen = () => {
    return (
        <View style={{justifyContent:'center', alignItems:'center'}}>
	<SignOutButton/>
            <Image source={require('../../assets/images/logo.png')}
                style={{width: 350, height: 350,}}
            />
            <View>
	    <Text>testing changes</Text>
                <Greeting/>
            </View>
            <View>
                <SearchBar/>
            </View>
        </View>
    );
};

export default HomeScreen
