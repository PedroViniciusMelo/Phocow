import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {View, Text} from "react-native";
import Home from "./src/screens/Home";
import {Camera} from 'expo-camera';
import * as MediaLibrary from "expo-media-library";

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [hasPermissionToSave, setHasPermissionToSave] = useState(null)

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

        (async () => {
            const {status} = await MediaLibrary.requestPermissionsAsync()
            setHasPermissionToSave(status === 'granted')
        })();
    }, [])

    if (hasPermission === null && hasPermissionToSave === null) {
        return <View/>;
    }

    if (hasPermission === false && hasPermissionToSave === false) {
        alert('É necessário permitir a aplicação')
        return <Text>No access to camera</Text>;
    }

    return (
        <>
            <StatusBar style="light"/>
            <Home/>
        </>
    );
}
