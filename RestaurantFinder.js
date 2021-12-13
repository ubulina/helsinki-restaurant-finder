import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { Button, Icon, ListItem } from 'react-native-elements';


export default function RestaurantFinder({ route, navigation }) {

    const [style, setStyle] = useState('') //käyttäjän valitsema tyyli
    const [allStyles, setAllStyles] = useState([]) //hakusanat Pickeriä varten
    const [restaurants, setRestaurants] = useState([]) //näytettävät ravintolat
  
    //haetaan kaikki ravintoloiden tyylit (hakusanat) Pickeriä varten
    useEffect(() => {
  
      fetch(`https://open-api.myhelsinki.fi/v2/places/?tags_search=restaurants`)
      .then(response => response.json())
      .then(responseJson => setAllStyles(responseJson.tags))
      .catch(error => { 
        Alert.alert('Error', error); 
      })
  
    }, [])
  
  
    const stylesToShow =  Object.values(allStyles)
     
  
   //haetaan halutun tyylin mukaiset ravintolat
    const getRestaurants = () => {
  
      fetch(`https://open-api.myhelsinki.fi/v2/places/?tags_search=restaurants&tags_filter=${style}&language_filter=en`)
  
        .then(response => response.json())
        .then(responseJson => setRestaurants(responseJson.data))         
        .catch(error => { 
            Alert.alert('Error', error); 
        });
  
    }
/*  
    const listSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "80%",
            backgroundColor: "#CED0CE",
            
          }}
        />
      );
    };

*/
    return (
        <View style={styles.container}>

            <Text style={{fontSize: 16, marginTop: 10}}>Don't be hungry in Helsinki!</Text>
      
                        
            <Text style={{fontSize: 16, marginTop: 10}}>Search restaurants by style and facilities:</Text>
    
            <View style={{flex: 1, flexDirection: "row", marginTop: 30}}>
        
                <Picker
                    selectedValue={style}
                    style={{ height: 18, width: 200 }}
                    onValueChange={(itemValue, itemIndex) => {
                        
                        setStyle(itemValue)
                        
                    }}>
        
                    {stylesToShow.map(style => (<Picker.Item label={style} value={style} key={style} />))}
        
                </Picker>
            
                <View>   
                    <Button buttonStyle={{width: 60, backgroundColor: "green"}} onPress={getRestaurants} title="FIND" />      
                </View> 
            </View>
    
            <View style={{justifyContent: "center"}} >   
                <Button
                    type="outline"
                    buttonStyle={{ width: 180, marginBottom: 10, marginTop: 10}}
                    title="SHOW FAVORITES"
                    titleStyle={{ marginHorizontal: 5, fontSize: 12 }}
                    icon={<Icon name="favorite" type="material-icons" size={25} color="red" />} 
                    onPress={() => {navigation.navigate('Favorites')}} 
                />      
            </View> 
    
            <View style={{flex: 2, marginTop: 30, width: "90%"}}>
            <FlatList 
                style={{marginLeft: "5%"}}
                data={restaurants}  
                keyExtractor={(item) => item.id.toString()} 
                renderItem={({ item }) => 
                <ListItem bottomDivider> 
                    <ListItem.Content>           
                    <ListItem.Title style={{fontSize: 18 }}>{item.name.fi}</ListItem.Title>               
                    <ListItem.Subtitle style={{fontSize: 12}}>{item.location.address.street_address}, {item.location.address.postal_code} {item.location.address.locality}
                    </ListItem.Subtitle>                            
                    </ListItem.Content>
                                         
                    <Text 
                        style= {{fontSize: 12, fontWeight: "bold", color:"blue", backgroundColor:"yellow"}}
                        onPress={() => {
                        navigation.navigate('Info', { 
                            name: item.name.fi, 
                            address: item.location.address.street_address, 
                            postalcode: item.location.address.postal_code,
                            locality: item.location.address.locality, 
                            description: item.description.intro,
                            url: item.info_url,
                            latitude: item.location.lat,
                            longitude: item.location.lon,
                            showFavorite: true
                        })
                        }}    
                    >
                    more info  
                    </Text>
                                 
                </ListItem>}                
            
            />
            </View>     
    
    
        </View>  
        
    );
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    space: {
      width: 10, 
      height: 10,
    }
 
});
  