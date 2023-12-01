// Profile.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";


const Profile = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    // Mock user data for demonstration purposes
    setUser({ email: 'example@example.com' });
    setDisplayName('John Doe');
  }, []);

  const handleImageUpload = async () => {
    // Implement image upload logic here
    // This is just a placeholder, you'll need to replace it with your own logic
    console.log('Uploading profile picture...');
  };

  return (
    <View style={{ width: '100%', height: '100%', position: 'relative' }}>
      <View style={{ width: 390, height: 844, left: 0, top: 0, position: 'absolute', backgroundColor: '#88C6FF' }} />
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
      <Text style={{ width: 32, height: 54, left: 31, top: 60, position: 'absolute', color: 'white', fontSize: 30, fontFamily: 'Recursive', fontWeight: '500' }}>&lt;-</Text>
      </TouchableOpacity>
      <View style={{ width: 353, height: 630, left: 17, top: 130, position: 'absolute', backgroundColor: '#D9D9D9', shadowColor: 'black', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, borderRadius: 42 }} />
      <View style={{ width: 135, height: 144, left: 120, top: 78, position: 'absolute', backgroundColor: 'white', borderRadius: 9999 }} />
      <Text style={{ width: 112, height: 42, left: 136, top: 129, position: 'absolute', color: '#88C6FF', fontSize: 30, fontFamily: 'Recursive', fontWeight: '1000' }}>Upload</Text>
      <Text style={{ width: 218, height: 44, left: 79, top: 239, position: 'absolute', color: 'black', fontSize: 30, fontFamily: 'Recursive', fontWeight: '1000' }}>Arjun Kulkarni</Text>
      <View style={{ width: 317, height: 59, left: 31, top: 311, position: 'absolute', backgroundColor: 'white', borderRadius: 19 }} />
      <TouchableOpacity onPress={() => handlePress('Password')}>
        <Text style={{ width: 251, height: 47, left: 61, top: 326, position: 'absolute', color: 'rgba(0, 0, 0, 0.80)', fontSize: 25, fontFamily: 'Recursive', fontWeight: '1000' }}>Password</Text>
      </TouchableOpacity>
      <View style={{ width: 317, height: 59, left: 31, top: 395, position: 'absolute', backgroundColor: 'white', borderRadius: 19 }} />
      <TouchableOpacity onPress={() => handlePress('Email')}>
        <Text style={{ width: 251, height: 48, left: 61, top: 409, position: 'absolute', color: 'rgba(0, 0, 0, 0.80)', fontSize: 25, fontFamily: 'Recursive', fontWeight: '1000' }}>Email</Text>
      </TouchableOpacity>
      <View style={{ width: 317, height: 60, left: 31, top: 479, position: 'absolute', backgroundColor: 'white', borderRadius: 19 }} />
      <TouchableOpacity onPress={() => handlePress('Phone #')}>
        <Text style={{ width: 251, height: 48, left: 61, top: 494, position: 'absolute', color: 'rgba(0, 0, 0, 0.80)', fontSize: 25, fontFamily: 'Recursive', fontWeight: '1000' }}>Phone #</Text>
      </TouchableOpacity>
      <View style={{ width: 317, height: 59, left: 31, top: 569, position: 'absolute', backgroundColor: 'white', borderRadius: 19 }} />
      <TouchableOpacity onPress={() => handlePress('Support')}>
        <Text style={{ width: 251, height: 48, left: 61, top: 580, position: 'absolute', color: 'rgba(0, 0, 0, 0.80)', fontSize: 25, fontFamily: 'Recursive', fontWeight: '1000' }}>Support</Text>
      </TouchableOpacity>
      <Image style={{ width: 31, height: 32, left: 299, top: 325, position: 'absolute' }} source={{ uri: '' }} />
      <Image style={{ width: 31, height: 32, left: 299, top: 581, position: 'absolute' }} source={{ uri: '' }} />
      <Image style={{ width: 31, height: 32, left: 299, top: 492, position: 'absolute' }} source={{ uri: '' }} />
      <Image style={{ width: 31, height: 32, left: 299, top: 409, position: 'absolute' }} source={{ uri: '' }} />
      <View style={{ width: 150, height: 56, left: 120, top: 660, position: 'absolute', backgroundColor: 'white', shadowColor: 'black', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.7, borderRadius: 20 }} />
      <TouchableOpacity>
        <Text style={{ width: 251, height: 48, left: 144, top: 670, position: 'absolute', color: 'rgba(0, 0, 0, 0.80)', fontSize: 25, fontFamily: 'Recursive', fontWeight: '1000' }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
  
  

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileImagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageText: {
    color: 'white',
  },
  displayName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  editableField: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Profile;
