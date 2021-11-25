import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import React, { useRef, useState } from "react";
import {Dimensions, View, ToastAndroid, StyleSheet, Platform, TouchableOpacity} from "react-native";
import Swiper from 'react-native-swiper';
import { Feather as Icon } from "@expo/vector-icons";
import LogoVaca from '../../assets/icone.svg'
import styles from './styles'

const { width, height } = Dimensions.get("window");

export default function App() {
    const camera = useRef();
    const [isRatioSet, setIsRatioSet] = useState(false);
    const [ratio, setRatio] = useState('4:3');  // default is 4:3

    const screenRatio = width / height;

    const prepareRatio = async () => {
        let desiredRatio = '4:3';  // Start with the system default
        // This issue only affects Android
        if (Platform.OS === 'android') {
            const ratios = await camera.current.getSupportedRatiosAsync();

            let floatRatios = []
            let ratiosKey = {}

            for (const ratio of ratios) {
                const parts = ratio.split(':');
                const realRatio = parseInt(parts[0]) / parseInt(parts[1]);

                floatRatios.push(realRatio)
                ratiosKey[ratio] = realRatio
            }

            let selectedRatio = Math.max.apply(null, floatRatios.filter(function(v){return v <= screenRatio}))

            for(let key in ratiosKey){
                if(selectedRatio === ratiosKey[key]){
                    desiredRatio = key
                }
            }

            setRatio(desiredRatio);
            // Set a flag so we don't do this
            // calculation each time the screen refreshes
            setIsRatioSet(true);
        }
    };

    const takePicture = async () => {
        if (camera.current) {
            const options = { quality: 1 };
            let photo = await camera.current.takePictureAsync(options);
            const source = photo.uri;

            camera.current.pausePreview();

            await salvarImagem(source);

            camera.current.resumePreview();

            ToastAndroid.show('Imagem salva com sucesso!', ToastAndroid.SHORT);
        }
    };

    const setCameraReady = async () => {
        if (!isRatioSet) {
            await prepareRatio();
        }
    }

    const salvarImagem = async (photo) => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        const item = await MediaLibrary.requestPermissionsAsync()
        if (status === "granted" && item.status === 'granted') {
            const asset = await MediaLibrary.createAssetAsync(photo);
            await MediaLibrary.createAlbumAsync("Animais", asset);
        } else {
            alert("Você esqueceu de conceder permissões, por favor, tente novamente!");
        }
    };

    return (
        <View style={ styles.container }>
            <Camera
                zoom={0}
                whiteBalance={'auto'}
                flashMode={'off'}
                autoFocus={'on'}
                onCameraReady={setCameraReady}
                ratio={ratio}
                ref={camera}
                style={styles.container}
                type={'back'}>
            </Camera>
            <View style={styles.viewbotaosalvar}>
                <TouchableOpacity onPress={takePicture} style={styles.circulo1BtnSalvar}>
                    <View style={styles.circulo2BtnSalvar}>
                        <Icon name="camera" color={'white'} size={30}/>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.view_mascaras}>
                <Swiper
                    style={estilo.wrapper}
                    showsButtons={true}
                    showsPagination={false}
                >
                    <View style={estilo.slide1}>
                        <LogoVaca fill={'#fff'} width={width * 0.9} height={height}/>
                    </View>
                    <View style={estilo.slide1}>
                        <LogoVaca fill={'#fff'} width={width * 0.9} height={height}/>
                    </View>
                    <View style={estilo.slide1}>
                        <LogoVaca fill={'#fff'} width={width * 0.9} height={height}/>
                    </View>
                </Swiper>
            </View>
        </View>
    );
}

const estilo = StyleSheet.create({
    slide1: {
        height:'100%',
        width: '100%',
    },
})
