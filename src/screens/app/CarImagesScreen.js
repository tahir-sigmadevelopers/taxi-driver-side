import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  StatusBar,
  ScrollView,
  Platform
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const CarImagesScreen = ({ navigation }) => {
  // Car image upload handlers
  const handleFrontSideUpload = () => {
    // Navigate to front side image upload screen
    navigation.navigate('ImageUploadScreen', { 
      title: 'Front Side', 
      description: 'Upload clear image of front side with number plate visible' 
    });
  };

  const handleChassisSideUpload = () => {
    // Navigate to chassis number image upload screen
    navigation.navigate('ImageUploadScreen', { 
      title: 'Chassis Number', 
      description: 'Upload clear image of chassis number' 
    });
  };

  const handleBackSideUpload = () => {
    // Navigate to back side image upload screen
    navigation.navigate('ImageUploadScreen', { 
      title: 'Back Side', 
      description: 'Upload clear image of back side with number plate visible' 
    });
  };

  const handleLeftSideUpload = () => {
    // Navigate to left side image upload screen
    navigation.navigate('ImageUploadScreen', { 
      title: 'Left Side', 
      description: 'Upload clear image of the left side exterior' 
    });
  };

  const handleRightSideUpload = () => {
    // Navigate to right side image upload screen
    navigation.navigate('ImageUploadScreen', { 
      title: 'Right Side', 
      description: 'Upload clear image of the right side exterior' 
    });
  };

  // Car image options
  const imageOptions = [
    {
      id: 'front',
      title: 'Front Side with Number Plate',
      onPress: handleFrontSideUpload
    },
    {
      id: 'chassis',
      title: 'Chassis Number Images',
      onPress: handleChassisSideUpload
    },
    {
      id: 'back',
      title: 'Back Side with Number Plate',
      onPress: handleBackSideUpload
    },
    {
      id: 'left',
      title: 'Left Side Exrerior',
      onPress: handleLeftSideUpload
    },
    {
      id: 'right',
      title: 'Right Side Exrerior',
      onPress: handleRightSideUpload
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Car Images</Text>
      </View>
      
      {/* Image Options */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {imageOptions.map((option) => (
          <TouchableOpacity 
            key={option.id}
            style={styles.optionItem}
            onPress={option.onPress}
          >
            <Text style={styles.optionText}>{option.title}</Text>
            <Ionicons name="chevron-forward" size={24} color="#FFD600" />
          </TouchableOpacity>
        ))}
        
        {/* Bottom padding for scroll */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 15 : StatusBar.currentHeight + 15,
    paddingBottom: 15,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // To offset the backButton width for centering
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  bottomPadding: {
    height: 40,
  }
});

export default CarImagesScreen; 