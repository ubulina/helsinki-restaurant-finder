import React from 'react';
import { StyleSheet, Text, View, Linking, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';



export default function RestaurantInfo({ route, navigation }) {

  
    const { name, address, postalcode, locality, description, url, latitude, longitude, showFavorite } = route.params
  
    const region = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01 
    }
  
    return (
  
      <View style={styles.container}>

  
        <View style={{flex: 1, width: "90%", height: 100, justifyContent: "flex-start", marginTop: 10}}>
          <Text style={{fontSize: 18}}>
            {name}
          </Text>
  
          <Text style={{fontSize: 12}}>    
            {address}, {postalcode} {locality}
          </Text>

          <Text style={{fontSize: 12, color: "blue"}}
                onPress={() => Linking.openURL(`${url}`)}>    
            {url}
          </Text>

          

          { showFavorite ? (
            
            <Button
              type="outline"
              buttonStyle={{ width: 180, marginBottom: 10, marginTop: 10}}
              title="ADD TO FAVORITES"
              titleStyle={{ marginHorizontal: 5, fontSize: 12 }}
              icon={<Icon name="favorite" type="material-icons" size={25} color="red" />}               
              onPress={() => {
                navigation.navigate('Favorites', { 
                  name: name, 
                  address: address, 
                  postalcode: postalcode,
                  locality: locality, 
                  description: description,
                  url: url,
                  latitude: latitude,
                  longitude: longitude
                })
              }}    
                        
            />) : (<Text></Text>)}
             

          <ScrollView style={{marginTop:5}}>     
  
          <Text style={{fontSize: 12 }}>
            {description}
          </Text> 

          </ScrollView> 
                               
        </View>
  
        <MapView
          style={styles.map}      
          region={region}
        >
        <Marker 
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude}} 
          title={name}       
        />
        </MapView>
  
      </View>
    )
  
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      flex: 1,
      width: "90%",
      height: "90%",
      marginTop: 10
    },
    space: {
      width: 10, 
      height: 10,
    }
    
});