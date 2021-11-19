import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ToastAndroid,
  Platform,
  FlatList,
} from 'react-native';
import { SearchBar, Button, Input } from 'react-native-elements';
import axios from 'axios';
import moment from 'moment';
import RNModal from 'react-native-modal';
import ListForm from '../../components/ListForm';
import DetailNote from '../../components/DetailNote';

export default function Home({ navigation }) {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [searchTimer, setSearchTimer] = useState(null);
  const [detailNote, setDetailNote] = useState([]);
  const [showNoteModal, setShowNoteModal] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getAllForm = async () => {
        const response = await axios.get(
          'http://192.168.101.9:5000/rentalz/getAllForm'
        );
        console.log(response.data);
        setItems(response.data.reverse());
      };
      getAllForm();
    });
    return unsubscribe;
  }, [navigation]);

  // const getDetailNote = async () => {
  //   try {
  //     const response = await axios.get(
  //       'http://192.168.101.9:5000/rentalz/getDetailNote'
  //     );
  //     console.log(response.data);
  //     setDetailNote(response.data);
  //     setShowDetailNote(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onPressDelete = async (id) => {
    try {
      const response = await axios.post(
        'http://192.168.101.9:5000/rentalz/deleteForm',
        { id }
      );
      console.log('Deleted at id:', id);
      setItems(items.filter((i) => i.id !== id));
      ToastAndroid.showWithGravityAndOffset(
        response.data.message,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        10,
        110
      );
      // setModalVisible(!isModalVisible);
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleSearch = async (address) => {
    try {
      const response = await axios.get(
        `http://192.168.101.9:5000/rentalz/searchForm?address=${address}`
      );
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeText = (text) => {
    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    setSearch(text);
    setSearchTimer(
      setTimeout(() => {
        onHandleSearch(text);
      }, 500)
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <SearchBar
          placeholder="Searching something..."
          containerStyle={styles.searchBar}
          inputContainerStyle={styles.searchBarInput}
          inputStyle={styles.searchBarInputText}
          onChangeText={(text) => {
            onChangeText(text);
          }}
          value={search}
        />
        <View>
          {items.length > 0 ? (
            <FlatList
              data={items}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return <ListForm item={item} onPressDelete={onPressDelete} />;
              }}
            />
          ) : (
            <Text style={styles.textNoItem}>
              You have no items match! 🥺, please add new one!
            </Text>
          )}
        </View>
        {/* <View>
          <FlatList
            data={getDetailNote}
            keyExtractor={(dNote) => dNote.id}
            renderItem={({ dNote }) => {
              return (
                <DetailNote
                  dNote={dNote}
                  onClose={() => setShowDetailNote(false)}
                  onOpen={() => setShowDetailNote(true)}
                  showNoteModal1={() => setShowDetailNote(true)}
                />
              );
            }}
          />
        </View> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    height: '100%',
  },
  searchBar: {
    backgroundColor: '#fff',
    borderBottomColor: '#fff',
    borderTopColor: '#fff',
  },
  searchBarInput: {
    backgroundColor: '#E6E6E6',
    borderRadius: 20,
    color: 'black',
  },
  searchBarInputText: {
    color: 'black',
  },
  textNoItem: {
    textAlign: 'center',
    fontSize: 15,
    paddingVertical: 224,
  },
});
