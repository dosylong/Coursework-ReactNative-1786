import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNModal from 'react-native-modal';

export default function DetailNote(props) {
  const { dNote, onClose, onOpen } = props;
  return (
    <View>
      <RNModal
        isVisible={onOpen}
        onBackdropPress={onClose}
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
              onPress={onClose}
            />
          </View>
        </View>
      </RNModal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalNoteView: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingTop: 5,
  },
  buttonCancel: {
    backgroundColor: '#E74B50',
    borderRadius: 20,
    marginTop: 10,
    width: 120,
  },
  modalButton: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingHorizontal: 30,
  },
});
