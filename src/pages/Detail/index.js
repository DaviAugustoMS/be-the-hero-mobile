import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet ,View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import Constants from 'expo-constants';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message =   `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}`;

  function navigateBack() {
    navigation.goBack()
  }

  function sendMail(){
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
        body: message,
      });
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?text=${message}&phone=${incident.whatsapp}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name='arrow-left' size={28} color="#e02041" />
        </TouchableOpacity>
      </View>
      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf} </Text>
        <Text style={styles.incidentProperty}>Caso:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>
        <Text style={styles.incidentProperty}>Valor:</Text>
        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.action}>
          <TouchableOpacity style={styles.actions} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actions} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  incident: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    marginTop: 48,
  },

  incidentProperty: {
    fontSize: 14,
    color: '#41414d',
    fontWeight: 'bold',
    marginTop: 24,
  },

  incidentValue: {
    marginTop: 8,
    fontSize: 15,
    color: '#737380',
  },

  contactBox: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
  },

  heroTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#13131a',
    lineHeight: 30,
  },

  heroDescription: {
    fontSize: 15,
    color: '#737380',
    marginTop: 16,
  },

  action: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  actions: {
    backgroundColor: '#e02041',
    borderRadius: 8,
    height: 50,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  }
})
