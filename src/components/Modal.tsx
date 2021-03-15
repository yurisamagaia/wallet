import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Animated, Dimensions, Picker } from 'react-native'
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { valueValidator } from "../utils/validators";
import { onAddButtonPress } from "../api";
import { realMask } from "../utils/mask";
import Toast from './Toast';

const { height } = Dimensions.get('window')

type Props = {
  show: any;
  close: any;
};

const Modal = ({ show, close }: Props) => {

  const [value, setValue] = useState({ value: '', error: "" });
  const [type, setType] = useState({ value: "RENDA_FIXA", error: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ value: "", type: "" });
  const [state, setState] = useState({
    container: new Animated.Value(height),
    modal: new Animated.Value(height)
  })

  const addInvest = async () => {
    if (loading) return;

    const valueError = valueValidator(value.value);

    if (valueError) {
      setValue({ ...value, error: valueError });
      return;
    }

    setLoading(true);

    const response = await onAddButtonPress({
      value: value.value,
      type: type.value
    });
    console.log('add');

    if (response.error) {
      setToast({ type: "error", value: response.error });
    } else {
      setValue({ value: '', error: '' });
      setType({ value: 'RENDA_FIXA', error: '' });
      close()
    }
    setLoading(false);
  };

  const openModal = () => {
    Animated.sequence([
      Animated.timing(state.container, { toValue: 0, duration: 100, useNativeDriver: true }),
      Animated.spring(state.modal, { toValue: 0, bounciness: 5, useNativeDriver: true })
    ]).start()
  }

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(state.modal, { toValue: height, duration: 250, useNativeDriver: true }),
      Animated.timing(state.container, { toValue: height, duration: 100, useNativeDriver: true })
    ]).start()
  }

  useEffect(() => {
    (show ? openModal() : closeModal())
  }, [show])

  return (
    <Animated.View
      style={[styles.container, {

        transform: [
          { translateY: state.container }
        ]
      }]}
    >
      <Animated.View
        style={[styles.modal, {
          transform: [
            { translateY: state.modal }
          ]
        }]}
      >
        <View style={styles.indicator} />
        <View>
          <TextInput
            label="Valor"
            returnKeyType="next"
            value={value.value}
            error={!!value.error}
            errorText={value.error}
            onChange={({ nativeEvent }) => {
              setValue({ value: realMask(nativeEvent.text), error: '' });
            }}
          />
          <Picker
            selectedValue={type.value}
            style={styles.select}
            onValueChange={(itemValue) => setType({ value: itemValue, error: '' })}
          >
            <Picker.Item label="Renda Fixa" value="RENDA_FIXA" />
            <Picker.Item label="Renda Variável" value="RENDA_VARIAVEL" />
          </Picker>
          <Button
            loading={loading}
            mode="contained"
            onPress={addInvest}
          >
            Adicionar
          </Button>
        </View>
        <Button mode="outlined" onPress={close}>
          Cancelar
        </Button>
        <Toast
          type={toast.type}
          message={toast.value}
          onDismiss={() => setToast({ value: "", type: "" })}
        />
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  select: {
    height: 56,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 4
  },
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  modal: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: '#D8D8D8',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 25,
    paddingRight: 25,
    borderColor: '#cdcdcd'
  },
  indicator: {
    width: 50,
    height: 5,
    backgroundColor: '#cdcdcd',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 15
  }
})

export default Modal