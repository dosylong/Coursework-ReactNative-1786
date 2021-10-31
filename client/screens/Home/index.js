import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import { SearchBar, Card, Button } from 'react-native-elements';
import axios from 'axios';
import moment from 'moment';
import RNModal from 'react-native-modal';

export default function Home() {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchTimer, setSearchTimer] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    axios
      .get('http://192.168.101.9:5000/rentalz/getAllForm')
      .then((response) => {
        setItems(response.data.sort((a, b) => b.id - a.id));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onPressDelete = async (id) => {
    try {
      const response = await axios.post(
        'http://192.168.101.9:5000/rentalz/deleteForm',
        { id }
      );
      console.log(response);
      setItems(items.filter((item) => item.id !== response.data.id));
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          response.data.message,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          30,
          55
        );
      } else {
        AlertIOS.alert(response.data.message);
      }
      setModalVisible(!isModalVisible);
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleSearch = async (address) => {
    try {
      const response = await axios.get(
        ` http://192.168.101.9:5000/rentalz/searchForm?address=${address}`
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
        <View style={styles.cardContainer}>
          {items.map((item) => {
            return (
              <Card key={item.id} containerStyle={styles.card}>
                <Card.Title>{item.reporterName}</Card.Title>
                <Card.Divider />
                <Card.Image
                  source={{
                    uri: 'https://images.hdqwalls.com/download/dubai-popular-hotel-4k-1920x1080.jpg',
                  }}
                />
                <Text>{item.address}</Text>
                <Text>{item.property}</Text>
                <Text>{item.bedroom}</Text>
                <Text>{moment(item.pickDate).format('DD.MM.YYYY')}</Text>
                <Text>{item.rentalPrice}</Text>
                <Text>{item.furniture}</Text>
                <Text>{item.note}</Text>
                <Text>{item.reporterName}</Text>
                <View style={styles.viewButton}>
                <Button
                  title="Edit extra note"
                  buttonStyle={styles.buttonNote}
                  onPress={() => {
                    console.log(item.id);
                  }}
                />
                <Button
                  title="Add extra note"
                  buttonStyle={styles.buttonNote}
                  onPress={() => {
                    console.log(item.id);
                  }}
                />
                <Button
                  title="Delete"
                  buttonStyle={styles.buttonDelete}
                  onPress={toggleModal}
                />
                </View>
                <RNModal
                  isVisible={isModalVisible}
                  style={{ margin: 50 }}
                  onBackdropPress={toggleModal}
                  backdropColor="#4D4D4D"
                >
                  <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Confirm?</Text>
                    <Text style={styles.modalContent}>
                      Are you sure you want to delete this form?
                    </Text>
                    <View style={styles.modalButton}>
                      <Button
                        title="Confirm"
                        buttonStyle={styles.buttonConfirm}
                        onPress={() => onPressDelete(item.id)}
                      />
                      <Button
                        title="Cancel"
                        buttonStyle={styles.buttonCancel}
                        onPress={toggleModal}
                      />
                    </View>
                  </View>
                </RNModal>
              </Card>
            );
          })}
        </View>
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
  cardContainer: {
    marginTop: 10,
  },
  card: {
    marginBottom: 10,
    borderRadius: 15,
  },
  viewButton: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  buttonNote: {
    backgroundColor: '#00BFFF',
    borderRadius: 20,
    marginTop: 10,
  },
  buttonDelete: {
    backgroundColor: '#E74B50',
    borderRadius: 20,
    marginTop: 10,
    width: 330,
  },
  modalView: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    maxHeight: '40%',
    borderRadius: 15,
  },
  modalButton: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingHorizontal: 30,
  },
  buttonCancel: {
    backgroundColor: '#E74B50',
    borderRadius: 20,
    marginTop: 10,
    width: 120,
  },
  buttonConfirm: {
    backgroundColor: '#00BFFF',
    borderRadius: 20,
    marginTop: 10,
    width: 120,
  },
  modalTitle: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
  },
  modalContent: {
    fontSize: 20,
    textAlign: 'center',
    margin: 15,
  },
});
