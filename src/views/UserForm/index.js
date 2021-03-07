import React, { useContext, useState } from 'react';
import { Text, TextInput, View, StyleSheet, Alert } from 'react-native';
import { Button, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import UsersContext from '../../context/UsersContext';
import ImageView from "react-native-image-viewing";
const UserForm = ({ route, navigation }) => {

  const [user, setUser] = useState(route.params ? route.params : []);
  const [visible, setIsVisible] = useState(false);
  const { dispatch } = useContext(UsersContext);


  return (
    <View style={styles.form}>
      <View style={styles.img}>

        <Image
          source={{ uri: user.avatarUrl ? user.avatarUrl : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
          containerStyle={styles.imgFrame}
          onPress={() => { setIsVisible(!visible)}}
        />
      </View>

      <ImageView
        images={[{uri: user.avatarUrl ? user.avatarUrl : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />


      <Text style={styles.inputLabel}>Nome</Text>
      <TextInput
        style={styles.input}
        onChangeText={name => setUser({ ...user, name })}
        placeholder="Informe o Nome"
        placeholderTextColor="white"
        value={user.name}
      />
      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={email => setUser({ ...user, email })}
        placeholder="Informe o E-mail"
        placeholderTextColor="white"
        value={user.email}
      />
      <Text style={styles.inputLabel}>URL do avatar</Text>
      <TextInput
        style={styles.input}
        onChangeText={avatarUrl => setUser({ ...user, avatarUrl })}
        placeholder="Informe a URL"
        placeholderTextColor="white"
        value={user.avatarUrl}
      />
      <Button
        icon={
          <Icon
            name="save"
            size={25}
            color="white"
          />
        }
        buttonStyle={{ backgroundColor: '#21222C', borderColor: 'grey' }}
        title="  Salvar"
        type="outline"
        titleStyle={{ fontSize: 20, color: 'white' }}
        onPress={() => {
          dispatch({
            type: user.id ? 'updateUser' : 'createUser', //Se tiver id, atualiza, se não, cria
            payload: user
          })
          navigation.goBack()
        }}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 12,
    backgroundColor: '#282A36',
    flex: 1
  },
  img: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgFrame: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: '#000',
    borderWidth: 2,
  },

  inputLabel: {
    fontSize: 18,
    color: 'grey'
  },

  input: {
    height: 40,
    borderColor: 'gray',
    backgroundColor: '#21222C',
    borderWidth: 1,
    marginBottom: 15,
    fontSize: 20,
    borderRadius: 4,
    color: 'white',

  }
})




export default UserForm;