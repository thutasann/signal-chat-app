import React, {useState, useLayoutEffect} from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {Button, Input, Image, Text} from 'react-native-elements';
import { auth  } from '../firebase';

const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');
    const [imageUrl, setimageUrl ] = useState('');

    useLayoutEffect(() =>{
        navigation.setOptions({
            headerBackTitle: "Back to Login",
            headerTitleAlign: "center"
        })
    }, [navigation]);

    const register = () =>{
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/240px-Missing_avatar.svg.png",
            });
        }).catch(error => alert(error.message));
    };



    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>

            <Text h3 style={{ marginBottom: 30 }}>
                Create a Signal Account
            </Text>

            <View style={styles.inputContainer}>
                <Input
                    placeholder="Full name"
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                />
                <Input
                    placeholder="Profile image URL (Optional)"
                    type="text"
                    value={imageUrl}
                    onChangeText={(text) => setimageUrl(text)}
                    onSubmitEditing= {register}
                />
            </View>
            <Button
                title='Register'
                onPress={register}
                raised
                containerStyle = {styles.button}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: "white"
    },

    inputContainer:{
        width: 300
    },

    button:{
        width: 200,
        marginTop: 10,
    },
});

export default RegisterScreen;
