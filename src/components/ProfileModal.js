import React from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "../styles";
import { Icons } from "./Icons";

const ITEMS = ["Account Settings", "Parent & Child Details", "Language", "Log Out"];

export function ProfileModal({ onClose }) {
  return (
    <View style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, zIndex: 100, justifyContent: "flex-end" }}>
      <Pressable style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.3)" }} onPress={onClose} />
      <View style={{ backgroundColor: "#fff", borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 }}>
        <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: "#E2E8F0", alignSelf: "center", marginBottom: 20 }} />
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#1a1a1a", marginBottom: 4 }}>Profile & Settings</Text>
        <Text style={{ fontSize: 14, color: "#94A3B8", marginBottom: 20 }}>sarah.chen@email.com</Text>
        {ITEMS.map((i) => (
          <Pressable
            key={i}
            style={({ pressed }) => [styles.listItem, { borderRadius: 0 }, pressed && { backgroundColor: "#F5F6F8" }]}
          >
            <Text style={{ fontWeight: "500", color: i === "Log Out" ? "#E8735A" : "#1a1a1a" }}>{i}</Text>
            <Icons.ChevronRight />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
