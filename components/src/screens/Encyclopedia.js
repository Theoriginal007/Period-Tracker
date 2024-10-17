import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { en } from './EncyclopediaScreen/en'; // Ensure this file contains the initial data

const Encyclopedia = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedSubCategory, setExpandedSubCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cachedData, setCachedData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await AsyncStorage.getItem('encyclopediaData');
      if (data) {
        setCachedData(JSON.parse(data));
      } else {
        setCachedData(en); // Use initial data if cache is empty
        await AsyncStorage.setItem('encyclopediaData', JSON.stringify(en));
      }
    };

    loadData();
  }, []);

  const filteredCategories = cachedData?.categories.allIds.filter(categoryId => {
    const category = cachedData.categories.byId[categoryId];
    return category.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleCategoryPress = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setExpandedSubCategory(null); // Collapse subcategories when changing categories
  };

  const handleSubCategoryPress = (subCategoryId) => {
    setExpandedSubCategory(expandedSubCategory === subCategoryId ? null : subCategoryId);
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/backgrounds/desert-default.png')}
      style={styles.background}
    >
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        onChangeText={text => setSearchQuery(text)}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {filteredCategories?.map((categoryId) => {
          const category = cachedData.categories.byId[categoryId];
          if (!category) {
            console.warn(`Category with ID ${categoryId} not found.`);
            return null; // Skip this category if not found
          }
          return (
            <View key={categoryId} style={styles.category}>
              <TouchableOpacity onPress={() => handleCategoryPress(categoryId)}>
                <Text style={styles.categoryTitle}>
                  {category.name} {category.tags.primary.emoji}
                </Text>
              </TouchableOpacity>
              <Collapsible collapsed={expandedCategory !== categoryId}>
                <View style={styles.subCategoryContainer}>
                  {category.subCategories.map((subCategoryId) => {
                    const subCategory = cachedData.subCategories.byId[subCategoryId];
                    if (!subCategory) {
                      console.warn(`Subcategory with ID ${subCategoryId} not found.`);
                      return null; // Skip this subcategory if not found
                    }
                    return (
                      <View key={subCategoryId} style={styles.subCategory}>
                        <TouchableOpacity onPress={() => handleSubCategoryPress(subCategoryId)}>
                          <Text style={styles.subCategoryTitle}>
                            {subCategory.name}
                          </Text>
                        </TouchableOpacity>
                        <Collapsible collapsed={expandedSubCategory !== subCategoryId}>
                          <View style={styles.contentContainer}>
                            {subCategory.articles.map((articleId) => {
                              const article = cachedData.articles.byId[articleId];
                              if (!article) {
                                console.warn(`Article with ID ${articleId} not found.`);
                                return null;
                              }
                              return (
                                <View key={articleId} style={styles.article}>
                                  <Image source={{ uri: article.imageUrl }} style={styles.articleImage} />
                                  <Text style={styles.articleTitle}>{article.title}</Text>
                                  <Text style={styles.articleContent}>{article.content}</Text>
                                  <Text style={styles.articleInfo}>Author: {article.author}</Text>
                                  <Text style={styles.articleInfo}>Published: {article.date}</Text>
                                </View>
                              );
                            })}
                          </View>
                        </Collapsible>
                      </View>
                    );
                  })}
                </View>
              </Collapsible>
            </View>
          );
        })}
      </ScrollView>
    </ImageBackground>
  );
};

// Export the component with navigation options
export default Encyclopedia;

export const screenOptions = {
  title: 'Period💅',
  headerStyle: {
    backgroundColor: '#f7287b',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTintColor: 'white',
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 15,
    backgroundColor: '#fff',
  },
  container: {
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  category: {
    width: '45%',
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    textAlign: 'center',
  },
  subCategoryContainer: {
    marginTop: 5,
  },
  subCategory: {
    width: '90%',
    margin: 5,
  },
  subCategoryTitle: {
    fontSize: 16,
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    textAlign: 'center',
  },
  contentContainer: {
    marginTop: 5,
  },
  article: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    elevation: 1,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  articleContent: {
    fontSize: 12,
    color: '#333',
  },
  articleInfo: {
    fontSize: 10,
    color: '#777',
  },
  articleImage: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    marginBottom: 5,
  },
});
