import React from "react";
import { View } from "react-native";
import { styles } from "../styles";

export function ProgressBar({ pct, color }) {
  return (
    <View style={styles.progressBarTrack}>
      <View style={[styles.progressBarFill(pct, color)]} />
    </View>
  );
}
