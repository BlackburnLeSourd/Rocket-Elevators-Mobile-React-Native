// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';

// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from '../components/Loader';

const LogIn = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    // const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    const passwordInputRef = createRef();


    const handleSubmitPress = () => {
        setErrortext('');
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }

        // if (!userPassword) {
        //     alert('Please fill Password');
        //     return;
        // }

        // userEmail = "kevun@esti.com";
        // userPassword = "1";

        setLoading(true);
        let dataToSend = { email: userEmail };
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch(`https://localhost:7098/api/employees/login/${userEmail}`, {
            method: 'GET',
            // body: formBody,
            headers: {
                //Header Defination
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //Hide Loader
                setLoading(false);
                console.log(responseJson);
                // If server response message same as Data Matched
                if (responseJson.status === 'success') {
                    AsyncStorage.setItem('user_id', responseJson.data.email);
                    console.log(responseJson.data.email);
                    navigation.replace('DrawerNavigationRoutes');
                } else {
                    setErrortext(responseJson.msg);
                    console.log('Please check your email id');
                }
            })
            .catch((error) => {
                //Hide Loader
                setLoading(false);
                console.error(error);
            });
    };

    return (
        <View style={styles.mainBody}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View>
                    <KeyboardAvoidingView enabled>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={require('../../../assets/R2.png')}
                                style={{
                                    width: '50%',
                                    height: 100,
                                    resizeMode: 'contain',
                                    margin: 30,
                                }}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserEmail) =>
                                    setUserEmail(UserEmail)
                                }
                                placeholder="Enter Email" //dummy@abc.com
                                placeholderTextColor="#8b9cb5"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current &&
                                    passwordInputRef.current.focus()
                                }
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                            />
                        </View>
                        {/* <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserPassword) =>
                                    setUserPassword(UserPassword)
                                }
                                placeholder="Enter Password" //12345
                                placeholderTextColor="#8b9cb5"
                                keyboardType="default"
                                ref={passwordInputRef}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
                            />
                        </View> */}
                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={handleSubmitPress}>
                            <Text style={styles.buttonTextStyle}>LOGIN</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};
export default LogIn;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#307ecc',
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: 'red',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    registerTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});
// import { StatusBar } from "expo-status-bar";
// import React, { useState } from "react";
// import {
//     StyleSheet,
//     Text,
//     View,
//     Image,
//     TextInput,
//     Button,
//     TouchableOpacity,
// } from "react-native";

// export default function LogIn() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     // email = "123@blabla.com";
//     // password = "123456";
//     return (
//         <View style={styles.container}>
//             <Image style={styles.image} source={require("./assets/R2.png")} />

//             <StatusBar style="auto" />
//             <View style={styles.inputView}>
//                 <TextInput
//                     style={styles.TextInput}
//                     placeholder="Email."
//                     placeholderTextColor="#003f5c"
//                     onChangeText={(email) => setEmail(email)}
//                 />
//             </View>

//             <View style={styles.inputView}>
//                 <TextInput
//                     style={styles.TextInput}
//                     placeholder="Password."
//                     placeholderTextColor="#003f5c"
//                     secureTextEntry={true}
//                     onChangeText={(password) => setPassword(password)}
//                 />
//             </View>

//             <TouchableOpacity>
//                 <Text style={styles.forgot_button}>Forgot Password?</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.loginBtn}>
//                 <Text style={styles.loginText}>LOGIN</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "blue",
//         alignItems: "center",
//         justifyContent: "center",
//     },

//     image: {
//         marginBottom: 140,
//         width: 250,
//         height: 90,


//     },

//     inputView: {
//         backgroundColor: "red",
//         borderRadius: 30,
//         width: "70%",
//         height: 45,
//         marginBottom: 20,

//         alignItems: "center",
//     },

//     TextInput: {
//         height: 50,
//         flex: 1,
//         padding: 10,
//         marginLeft: 20,
//         fontWeight: "bold",
//     },

//     forgot_button: {
//         height: 30,
//         marginBottom: 30,
//         fontWeight: "bold",
//     },

//     loginBtn: {
//         width: "80%",
//         borderRadius: 25,
//         height: 50,
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 40,
//         backgroundColor: "red",
//     },

//     loginText: {
//         fontWeight: "bold",
//     },
// });

