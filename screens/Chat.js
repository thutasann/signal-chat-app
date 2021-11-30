import React, {useLayoutEffect, useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard, StyleSheet, TextInput, Text, View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { db, auth } from '../firebase';
// import firebase from 'firebase/compat/app';
// import "firebase/compat/firestore";
import { serverTimestamp } from "firebase/firestore";


const ChatScreen = ({ navigation, route }) =>{

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() =>{
        navigation.setOptions({
            title:route.params.chatName,
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () =>(
                <View
                    style={{ 
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <Avatar 
                        rounded
                        source={{ 
                            uri: messages[0]?.data.photoURL,
                        }}
                    />
                    <Text
                        style={{ color:"white", marginLeft: 10, fontWeight: "700"}}
                    >
                        {route.params.chatName}
                    </Text>
                </View>
            ),
            headerRight: () =>(
                <View
                    style={{ 
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 20
                    }}
                >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation, messages]);

    
    
    const sendMessage = () =>{
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        });

        setInput("");
    };

    useLayoutEffect(() =>{
        const unsubscribe = db
        .collection("chats")
        .doc(route.params.id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
        ));
        return unsubscribe;
    }, [route]);

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
            <StatusBar style="light"/>
            <SafeAreaView
                behavior={Platform.OS === "ios" ? "padding": "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>  
                        <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                            {messages.map(({id, data}) =>(
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.receiver}>
                                        <Avatar
                                            position="absolute"
                                            bottom={-15}
                                            right={-5}
                                            rounded
                                            // WEB
                                            containerStyle={{ 
                                                position: "absolute",
                                                bottom: -15,
                                                right: -5
                                            }}
                                            size={30}
                                            source={{ 
                                                uri: data.photoURL
                                            }}
                                        />
                                        <Text style={styles.receiverText}>
                                            {data.message}
                                        </Text>
                                    </View>
                                ): 
                                (
                                    <View key={id} style={styles.sender}>
                                        <Avatar
                                            position="absolute"
                                            bottom={-15}
                                            left={-5}
                                            rounded
                                            size={30}
                                            // WEB
                                            containerStyle={{ 
                                                position: "absolute",
                                                bottom: -15,
                                                left: 5
                                            }}
                                            source={{ 
                                                uri: data.photoURL
                                            }}
                                            
                                        />
                                        <Text style={styles.senderText}>
                                            {data.message}
                                        </Text>
                                        <Text style={styles.senderName}>
                                            {data.displayName}
                                        </Text>
                                    </View>
                                )
                            ))}
                        </ScrollView>

                        <View style={styles.footer}>
                            <TextInput 
                                style={styles.textInput}
                                placeholder="Enter Message" 
                                value={input}
                                onChangeText = {(text) => setInput(text)}
                                onSubmitEditing={sendMessage}
                            />
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <Ionicons name="send" size={24} color="#2B68E6" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>

            </SafeAreaView>
        </SafeAreaView>
    )
};

export default ChatScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    receiver:{
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position:"relative"
    },
    sender:{
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        marginLeft: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    senderText:{
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15
    },
    receiverText:{
        color: "black",
        fontWeight: "500",
        marginLeft:10
    },
    senderName:{
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white"
    },
    footer:{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30
    }
});