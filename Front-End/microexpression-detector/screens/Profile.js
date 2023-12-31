// Profile.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';

const Profile = () => {
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
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImageUpload}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileImageText}>Upload Photo</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.displayName}>{displayName}</Text>

      {/* Editable Fields */}
      <TextInput
        style={styles.editableField}
        value={displayName}
        placeholder="Display Name"
        onChangeText={text => setDisplayName(text)}
      />

      {/* Add more editable fields as needed */}

      <Text style={styles.infoText}>Email: {user ? user.email : ''}</Text>
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
