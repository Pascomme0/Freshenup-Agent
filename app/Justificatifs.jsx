import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native';
import {router} from "expo-router";
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "./store";

const JustificatifsApp = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);
    const url = 'https://admin.freshen-up.net';
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(user?.pieces)
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item?.typePiece?.code} - {item?.number}</Text>
            <View style={styles.images}>
                <Image source={{ uri: url + item?.imagePieces[0]?.path }} style={styles.image} />
                <Image source={{ uri: url + item?.imagePieces[1]?.path }} style={styles.image} />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {items.length === 0 && <Text style={{alignSelf:"center", verticalAlign:"middle"}}>Aucun justificatif</Text>}
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
            <Button title="Ajouter" onPress={() => router.push('/Nouveau_Justificatif')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    list: {
        paddingBottom: 20,
    },
    item: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    images: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: '48%',
        height: 100,
        borderRadius: 8,
    },
});

export default function Justificatifs() {
    return (
        <Provider store={store}>
            <JustificatifsApp />
        </Provider>
    );
};