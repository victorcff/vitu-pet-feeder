import React from 'react';
import { Modal, Text, View } from 'react-native';
import { CustomModalProps } from '../../types/componentsProps';
import styles from './styles';
import { modalTitle } from '../../consts';
import Button from '../Button';
import Icon from 'react-native-vector-icons/Ionicons';

const AlertModal = ({
  visible,
  message,
  type,
  onClose,
  buttonGroup,
}: CustomModalProps) => {
  const getIconName = () => {
    if (type === 'success') return 'checkmark-circle';
    else return 'warning';
  };
  return (
    <Modal
      animationType="slide"
      hardwareAccelerated
      transparent
      visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={styles.iconsContainer}>
            <Icon name={getIconName()} size={60} color="#0ff31a" />
            <View style={styles.closeIconContainer}>
              <Icon
                name="close-circle"
                size={26}
                color={'#ff0404'}
                onPress={() => onClose()}
              />
            </View>
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>{modalTitle[type]}</Text>
          </View>
          <Text style={styles.message}>{message}</Text>
          {buttonGroup && (
            <View style={styles.buttonGroupContainer}>
              {buttonGroup.map(button => (
                <Button
                  type={button.title}
                  size={buttonGroup.length <= 2 ? 'medium' : 'small'}
                  onPress={button.onPress}
                />
              ))}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;
