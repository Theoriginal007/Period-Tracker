import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { en } from './EncyclopediaScreen/en';

const Encyclopedia = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedSubCategory, setExpandedSubCategory] = useState(null);

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
      <ScrollView contentContainerStyle={styles.container}>
  
        {en.categories.allIds.map((categoryId) => {
          const category = en.categories.byId[categoryId];
          // Ensure the category exists
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
              {/* Show subcategories when the category is expanded */}
              {expandedCategory === categoryId && (
                <View style={styles.subCategoryContainer}>
                  {category.subCategories.map((subCategoryId) => {
                    const subCategory = en.subCategories.byId[subCategoryId];
                    // Ensure the subcategory exists
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
                        {/* Show articles when the subcategory is expanded */}
                        {expandedSubCategory === subCategoryId && (
                          <View style={styles.contentContainer}>
                            {subCategory.articles.map((articleId) => {
                              const article = en.articles.byId[articleId];
                              // Ensure the article exists
                              if (!article) {
                                console.warn(`Article with ID ${articleId} not found.`);
                                return null;
                              }
                              return (
                                <View key={articleId} style={styles.article}>
                                  <Text style={styles.articleTitle}>{article.title}</Text>
                                  <Text style={styles.articleContent}>{article.content}</Text>
                                </View>
                              );
                            })}
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>
              )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20, // Adjust margin for spacing
    marginLeft: 10, // Align to the left
    color: '#fff', // Change this to your desired color
  },
  category: {
    marginVertical: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    padding: 10,
    backgroundColor: '#f1f1f1', // Adjust background color as needed
    borderRadius: 5,
  },
  subCategoryContainer: {
    marginLeft: 10,
  },
  subCategory: {
    marginVertical: 5,
  },
  subCategoryTitle: {
    fontSize: 16,
    padding: 8,
    backgroundColor: '#e0e0e0', // Adjust background color as needed
    borderRadius: 5,
  },
  contentContainer: {
    marginLeft: 20,
  },
  article: {
    marginVertical: 5,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  articleContent: {
    fontSize: 12,
    color: '#333',
  },
});
