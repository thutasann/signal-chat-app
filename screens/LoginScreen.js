import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Text, View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {Button, Input, Image} from 'react-native-elements';
import { auth } from '../firebase';

const Loginscreen = ({ navigation }) => {

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    useLayoutEffect(() =>{
        navigation.setOptions({
            headerTitleAlign: "center",
        });
    }, [navigation]);


    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if(authUser){
                navigation.replace("Home");
            }
        });

        return unsubscribe;
    }, []);

    const signIn = () =>{
        auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error));
    };


    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            
            <Image
                source={{
                    uri: 'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png',
                }}
                style={{
                    width:200,
                    height:200,
                    marginBottom: 40,
                    marginTop:0
                }}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Email"
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>

            <Button
                containerStyle={styles.button}
                title='Login'
                onPress={signIn}
            />
            <Button
                containerStyle={styles.button}
                type="outline"
                title='Register'
                onPress = {() => navigation.navigate('Register')}

            />
            <View style= {{ height: 30 }} />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white"
    },
    inputContainer:{
        width: 300
    },
    button:{
        width: 200,
        marginTop: 10,
    }
});

export default Loginscreen;
