import React from 'react'
import { StyleSheet, View, Linking, Alert, Platform } from 'react-native'

import { CardItem, Body, Button, Text, Container } from 'native-base';
import { CardContent } from '../components/CardItems'


const Donor = ({ route }) => {
    const donor = route.params

    const openGps = () => {
        var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:'
        var url = `${scheme}${donor.location.latitude}, ${donor.location.longitude}`
        openExternalApp(url)
    }

    const openExternalApp = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert(
                    'ERROR',
                    'Unable to open: ' + url,
                    [
                        { text: 'OK' },
                    ]
                );
            }
        });
    }

    return (
        <Container>
            <CardItem>
                <Body>
                    <CardContent item="Donor Name" value={donor.name} />
                    <CardContent item="Blood Group" value={donor.blood} />
                    <CardContent item="Phone" value={donor.phone} />
                    <CardContent item="Address" value={donor.address} />
                    <View style={styles.btnContent}>
                        <Button
                            large full
                            style={styles.btn}
                            onPress={() => openGps()}>
                            <Text>Location</Text>
                        </Button>
                        <Button
                            large full success
                            style={styles.btn}
                            onPress={() => Linking.openURL(`tel:${donor.phone}`)}>
                            <Text>Call</Text>
                        </Button>
                        <Button
                            large full danger
                            style={styles.btn}
                            onPress={() => Linking.openURL(`sms:${donor.phone}`)}>
                            <Text>Message</Text>
                        </Button>
                    </View>
                </Body>
            </CardItem>
        </Container>
    )
}



const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
    },
    btnContent: {
        marginTop: 20,
        width: '100%'
    },

    btn: {
        borderRadius: 5,
        marginBottom: 15
    }
})

export default Donor
