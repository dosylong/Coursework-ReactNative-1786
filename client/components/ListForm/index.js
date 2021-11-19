import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import { SearchBar, Card, Button, Input } from 'react-native-elements';
import axios from 'axios';
import moment from 'moment';
import RNModal from 'react-native-modal';

export default function ListForm(props) {
  const { onPressDelete, item, showNoteModal1 } = props;

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [detailNote, setDetailNote] = useState([]);
  const [showDetailNote, setShowDetailNote] = useState(false);
  const [property, setProperty] = useState('');
  const [bedroom, setBedroom] = useState('');
  const [furniture, setFurniture] = useState('');
  // const [content, setContent] = useState({ property, bedroom, furniture });

  const getDetailNote = async () => {
    try {
      const response = await axios.get(
        'http://192.168.101.9:5000/rentalz/getDetailNote'
      );
      console.log(response.data);
      setDetailNote(response.data);
      setShowDetailNote(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onCreateDetailNote = async (detailNoteId) => {
    try {
      const formData = { property, bedroom, furniture };
      const response = await axios.post(
        `http://192.168.101.9:5000/rentalz/createDetailNote?detailNoteId=${detailNoteId}`,
        formData
      );
      ToastAndroid.showWithGravityAndOffset(
        response.data.message,
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        10,
        110
      );
      console.log('Edited note at id:', detailNoteId);
      setShowNoteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const onChangeNote = (key, value) => {
  //   setDetailNote((prevState) => {
  //     const showPrevNote = prevState.findIndex((item) => item.type === key);
  //     prevState[showPrevNote].content = value;
  //     return [...prevState];
  //   });
  // };
  return (
    <View style={styles.cardContainer}>
      <Card containerStyle={styles.card}>
        <Card.Title>{item.reporterName}</Card.Title>
        <Card.Divider />
        <Card.Image
          source={{
            uri: 'https://images.hdqwalls.com/download/dubai-popular-hotel-4k-1920x1080.jpg',
          }}
        />
        <Text>Address: {item.address}</Text>
        <Text>Property: {item.property}</Text>
        <Text>Bedroom: {item.bedroom}</Text>
        <Text>Date: {moment(item.pickDate).format('DD.MM.YYYY')}</Text>
        <Text>
          Price: {'$'}
          {item.rentalPrice}
        </Text>
        <Text>Furniture: {item.furniture}</Text>
        <Text>Note: {item.note}</Text>
        <Text>Reporter Name: {item.reporterName}</Text>
        <View style={styles.viewButton}>
          {/* <Button
            title="Detail note"
            buttonStyle={styles.buttonNote}
            onPress={showNoteModal1}
          /> */}
          <Button
            title="Edit detail note"
            buttonStyle={styles.buttonNote}
            onPress={() => setShowNoteModal(true)}
          />
          <Button
            title="Delete"
            buttonStyle={styles.buttonDelete}
            onPress={() => setShowDeleteModal(true)}
          />
        </View>

        <RNModal
          isVisible={showDeleteModal}
          style={{ margin: 50 }}
          onBackdropPress={() => setShowDeleteModal(true)}
          backdropColor="#808080"
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Confirm?</Text>
            <Text style={styles.modalContent}>
              Are you sure you want to delete this form?
            </Text>
            <View style={styles.modalButton}>
              <Button
                title="Cancel"
                buttonStyle={styles.buttonCancel}
                onPress={() => setShowDeleteModal(true)}
              />
              <Button
                title="Confirm"
                buttonStyle={styles.buttonConfirm}
                onPress={() => onPressDelete(item.id)}
              />
            </View>
          </View>
        </RNModal>

        <RNModal
          isVisible={showNoteModal}
          onBackdropPress={() => setShowNoteModal(true)}
          backdropColor="#808080"
        >
          <View style={styles.modalNoteView}>
            <Text style={styles.modalTitle}>Property</Text>
            <Input
              placeholder="Blank"
              onChangeText={(property) => setProperty(property)}
              value={property}
            />
            <Text style={styles.modalTitle}>Bedroom</Text>
            <Input
              placeholder="Blank"
              onChangeText={(bedroom) => setBedroom(bedroom)}
              value={bedroom}
            />
            <Text style={styles.modalTitle}>Furniture</Text>
            <Input
              placeholder="Blank"
              onChangeText={(furniture) => setFurniture(furniture)}
              value={furniture}
            />
            <View style={styles.modalButton}>
              <Button
                title="Cancel"
                buttonStyle={styles.buttonCancel}
                onPress={() => setShowNoteModal(false)}
              />
              <Button
                title="Edit"
                buttonStyle={styles.buttonConfirm}
                onPress={() => onCreateDetailNote(item.id)}
              />
            </View>
          </View>
        </RNModal>

        {/* <RNModal
          isVisible={showDetailNote}
          onBackdropPress={() => setShowDetailNote(false)}
          backdropColor="#808080"
        >
          <View style={styles.modalNoteView}>
            <Text>Property: {dNote.property}</Text>
            <Text>Bedroom: {dNote.bedroom}</Text>
            <Text>Furniture: {dNote.furniture}</Text>
            <View style={styles.modalButton}>
              <Button
                title="Close"
                buttonStyle={styles.buttonCancel}
                onPress={() => setShowDetailNote(false)}
              />
            </View>
          </View>
        </RNModal> */}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
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
  modalNoteView: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingTop: 5,
  },
});
