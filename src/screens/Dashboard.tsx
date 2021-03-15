import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Colors, ProgressBar } from "react-native-paper";
import Background from "../components/Background";
import Button from "../components/Button";
import Header from "../components/Header";
import Modal from '../components/Modal';
import Paragraph from "../components/Paragraph";
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

const Dashboard = () => {

  const [modal, setModal] = useState(false)
  const [totalVariable, setTotalVariable] = useState({ percent: 0, progress: 0 })
  const [totalFixed, setTotalFixed] = useState({ percent: 0, progress: 0 })
  const [entities, setEntities] = useState([])

  useEffect(() => {
    const user = firebase.auth().currentUser;
    firebase.firestore().collection('entities')
      .where("authorID", "==", user.uid)
      .onSnapshot(
        querySnapshot => {
          const newEntities: any = []
          let total: number = 0
          let totalFixed: number = 0
          let totalVariable: number = 0
          querySnapshot.forEach(doc => {
            const entity = doc.data();
            if (entity.date) {
              entity.value = entity.value.replace('.', '')
              total = total + parseFloat(entity.value)
              if (entity.type === 'RENDA_FIXA') {
                totalFixed = totalFixed + parseFloat(entity.value);
              } else if (entity.type === 'RENDA_VARIAVEL') {
                totalVariable = totalVariable + parseFloat(entity.value);
              }
              entity.date = entity.date.toDate().toDateString();
              newEntities.push(entity);
            }
          });
          setEntities(newEntities);
          let fixedPercent = (totalFixed * 100) / total;
          let variablePercent = (totalVariable * 100) / total;
          setTotalFixed({ percent: parseFloat(fixedPercent.toFixed(2)), progress: parseFloat(fixedPercent.toFixed(2)) / 100 });
          setTotalVariable({ percent: parseFloat(variablePercent.toFixed(2)), progress: parseFloat(variablePercent.toFixed(2)) / 100 });
        },
        error => console.log(error))
  }, [])

  return (
    <Background>
      <Header logoutButton={true}>Carteira</Header>
      <View style={styles.containerProgress}>
        <ProgressBar progress={totalFixed.progress} color={Colors.green400} style={styles.progress} />
        <Paragraph>Renda fixa <b>{totalFixed.percent | 0}%</b></Paragraph>
        <ProgressBar progress={totalVariable.progress} color={Colors.blue300} style={styles.progress} />
        <Paragraph>Renda variável <b>{totalVariable.percent | 0}%</b></Paragraph>
      </View>
      <View style={styles.containerHistoric}>
        {
          entities && entities.map(
            (item, index) => {
              return (
                <View style={styles.historic} key={index}>
                  <View style={(item.type === 'RENDA_FIXA' ? styles.fixed : styles.variable)} />
                  <View>
                    <Paragraph>R$ {item.value}</Paragraph>
                  </View>
                  <View>
                    <Paragraph>{item.date}</Paragraph>
                  </View>
                </View>
              )
            }
          )
        }
      </View>
      <View style={styles.buttonPosition}>
        <Button mode="contained" onPress={() => setModal(true)}>Novo</Button>
      </View>
      <Modal show={modal} close={() => setModal(false)} />
    </Background>
  );
};

const styles = StyleSheet.create({
  containerHistoric: {
    overflowX: 'scroll',
    paddingBottom: 15,
    height: 410,
    width: '100%'
  },
  variable: {
    width: 5,
    height: '100%',
    backgroundColor: Colors.blue300
  },
  fixed: {
    width: 5,
    height: '100%',
    backgroundColor: Colors.green400
  },
  image: {
    width: 20,
    height: 20,
  },
  containerProgress: {
    width: '100%'
  },
  historic: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  progress: {
    height: 20,
    borderRadius: 50,
    marginTop: 15,
    width: '100%'
  },
  text: {
    textAlign: 'center'
  },
  buttonPosition: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    marginBottom: 15
  },
  button: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    marginTop: 20
  },
  valueList: {
    lineHeight: 20
  }
})

export default Dashboard;
