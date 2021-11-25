import {Dimensions, StyleSheet} from "react-native";

const {width, height} = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1
    },
    view_mascaras: {
        position: "absolute",
        left: 0,
        justifyContent: 'center',
        backgroundColor: "black",
        width: width * 0.9,
        opacity: 0.5,
        height: height,
    },
    viewbotaosalvar: {
        position: "absolute",
        right: 0,
        justifyContent: 'center',
        backgroundColor: "black",
        width: width * 0.1,
        opacity: 0.5,
        height: height,
    },
    circulo1BtnSalvar: {
        backgroundColor: 'white',
        height: height * 0.15,
        width: height * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    circulo2BtnSalvar: {
        backgroundColor: 'black',
        height: height * 0.11,
        width: height * 0.11,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    }
})
