import React, { useContext } from 'react';
import { View, StatusBar, FlatList, Alert, StyleSheet } from 'react-native';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements'
import UsersContext from '../../context/UsersContext';
import NavigationBar from 'react-native-navbar-color'

const UserList = (props) => {

  const { state, dispatch } = useContext(UsersContext);
  NavigationBar.setColor('#21222C');

  function getUserItem({ item: user }) {
    return (
      <ListItem 
        key={user.id} 
        onPress={() => {props.navigation.navigate("UserForm", user)}} 
        containerStyle={{ backgroundColor: '#21222C',borderBottomWidth: 0.5, borderBottomColor: 'grey'}}
        >
        <Avatar source={{ uri: user.avatarUrl }} containerStyle={{ borderWidth: 1, borderColor: 'gray', borderRadius: 100, overflow: 'hidden' } }/>
        <ListItem.Content>
          <ListItem.Title style={{color: 'white'}}>{user.name}</ListItem.Title>
          <ListItem.Subtitle style={{color: 'gray'}}>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content right={true} style={{ flexDirection: 'row' }}>
          {getActions(user)}
        </ListItem.Content>
      </ListItem>
    )
  }

  function getActions(user) {
    return (
      <>
        <Button
          
          onPress={() => { props.navigation.navigate("UserForm", user) }}
          type="clear"
          icon={<Icon name="edit" size={25} color="orange" />}
        />

        <Button
          onPress={() => { confirmUserDeletion(user) }}
          type="clear"
          icon={<Icon name="delete" size={25} color="red" />}
        />
      </>
    )
  }

  function confirmUserDeletion(user) {
    Alert.alert(
      'Excluir usuário',
      'Deseja Excluir o usuário?',
      [
        {
          text: 'Sim',
          onPress() {
            dispatch(/*Uma action*/{
              type: 'deleteUser', // tipo da ação
              payload: user,      // dados
            })
          }
        },
        {
          text: 'Não'
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#21222C" barStyle="light-content" />
      <FlatList
        keyExtractor={(user) => user.id.toString()}
        data={state.users}
        renderItem={getUserItem}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#282A36' }
})




export default UserList;