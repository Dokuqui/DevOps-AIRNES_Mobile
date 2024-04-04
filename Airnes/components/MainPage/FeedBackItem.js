import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../../constants/style";

const FeedbackItem = ({ feedback }) => {
  const { userAvatar, userName, text, rating } = feedback;

  const renderStars = (rating) => {
    const fullStar = Math.floor(rating)
    const hasHalfStar = rating - fullStar > 0;
    const emptyStars = 5 - fullStar - (hasHalfStar ? 1 : 0);

    const stars = []
    
    for(let i = 0; i < fullStar; i++) {
      stars.push(<Ionicons key={`full_${i}`} name="star" size={20} color="gold" />);
    }
    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={20} color="gold" />);
    }
    for(let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty_${i}`} name="star-outline" size={20} color="gold" />);
    }

    return stars;
  }

  return (
    <View style={styles.container}>
      <Image source={userAvatar} style={styles.avatar} />
      <View style={styles.feedbackTextContainer}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.feedbackText}>{text}</Text>
        <View style={styles.starFeedback}>{renderStars(rating)}</View>
      </View>
    </View>
  );
};

const Feedback = ({ feedbackData }) => {
  return (
    <View style={styles.feedbackContainer}>
      {feedbackData.map((feedback, index) => (
        <FeedbackItem key={index} feedback={feedback} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  feedbackContainer: {
    flexDirection: "row",
    padding: 10,
    margin: 8,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: GlobalStyles.colors.gray500,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    padding: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  feedbackTextContainer: {
    flexDirection: "column",
  },
  userName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 2,
  },
  feedbackText: {
    fontSize: 16,
  },
  starFeedback: {
    flexDirection: "row",
    marginTop: 4,
  },
});

export default Feedback;
