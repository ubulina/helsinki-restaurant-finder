import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('favoritesdb.db');

export default function Favorites ({ route, navigation }) {

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        db.transaction(tx => {
          tx.executeSql('create table if not exists favorite (id integer primary key not null, name text, address text, postalcode text, locality text, description text, url text, latitude float, longitude float);');
        });
        updateList();    
      }, []);


      useEffect(() => {

        if (route.params) {
              
          saveItem()
          
        }
          
    }, [route.params]);    



    const saveItem = () => {

        const { name, address, postalcode, locality, description, url, latitude, longitude } = route.params

        db.transaction(tx => {
            tx.executeSql('insert into favorite (name, address, postalcode, locality, description, url, latitude, longitude) values (?, ?, ?, ?, ?, ?, ?, ?);', 
            [name, address, postalcode, locality, description, url, latitude, longitude]);    
          }, null, updateList
        )

    }

    const updateList = () => {
        db.transaction(tx => {
          tx.executeSql('select * from favorite;', [], (_, { rows }) =>
            setFavorites(rows._array)
          ); 
        });
            
    }

    const deleteItem = (id) => {
        db.transaction(
          tx => {
            tx.executeSql(`delete from favorite where id = ?;`, [id]);
          }, null, updateList
        )    
    }


    return (
  
        <View style={styles.container}>
    
            <View style={{flex: 1, width: "90%", justifyContent: "center"}}>

            { favorites.length !== 0 ? (
    
                
                <FlatList 
                    style={{marginLeft: "5%"}}
                    data={favorites}  
                    keyExtractor={(item) => item.id.toString()} 
                    renderItem={({ item }) => 
                    <ListItem bottomDivider> 
                        <ListItem.Content>           
                        <ListItem.Title style={{fontSize: 18 }}>{item.name}</ListItem.Title>               
                        <ListItem.Subtitle style={{fontSize: 12}}>{item.address}, {item.postalcode} {item.locality}</ListItem.Subtitle>
                        <ListItem.Subtitle 
                            style= {{fontSize: 12, fontWeight: "bold", color: "blue", backgroundColor: "yellow"}}
                            onPress={() => {
                            navigation.navigate('Info', { 
                                name: item.name, 
                                address: item.address, 
                                postalcode: item.postalcode,
                                locality: item.locality, 
                                description: item.description,
                                url: item.url,
                                latitude: item.latitude,
                                longitude: item.longitude,
                                showFavorite: false
                            })
                            }}    
                            
                        > more info </ListItem.Subtitle>                               
                        </ListItem.Content>
                        <Icon
                            color='red'
                            name='delete'
                            type='material'
                            onPress={() => Alert.alert(
                                "Do you want to remove the restaurant?",
                                "The restaurant will be deleted permanently",
                                [
                                    {
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                    },
                                    { text: "OK", onPress: () => deleteItem(item.id) }
                                ]
                            )}
                        /> 
                                                                            
                    </ListItem>}                
                
                />): (<View style={{flex: 1, justifyContent: "flex-start", alignItems: 'center'}}><Text>Your favorites come here!</Text></View>)} 
            

            </View>  
    
        </View>
    
   )
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    space: {
      width: 10, 
      height: 10,
    }
    
  });