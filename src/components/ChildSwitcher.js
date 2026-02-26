import React from "react";
import { View, Text, Pressable } from "react-native";
import { CHILDREN, ALL_CHILDREN } from "../constants";
import { styles } from "../styles";
import { Icons } from "./Icons";

export function ChildSwitcher({ active, onSelect, onClose }) {
  if (!active) return null;
  return (
    <View style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, zIndex: 100, justifyContent: "flex-end" }}>
      <Pressable style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.3)" }} onPress={onClose} />
      <View style={{ backgroundColor: "#fff", borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 }}>
        <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: "#E2E8F0", alignSelf: "center", marginBottom: 20 }} />
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#1a1a1a", marginBottom: 20 }}>Switch child</Text>
        <Pressable
          onPress={() => onSelect(ALL_CHILDREN)}
          style={({ pressed }) => [
            styles.listItem,
            { borderRadius: 12, borderWidth: 1, borderBottomWidth: 1, borderColor: "#F0F1F3", marginBottom: 8 },
            pressed && { backgroundColor: "#F5F6F8" },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={styles.avatar(ALL_CHILDREN.color, 40)}>
              <Text style={styles.avatarText(40)}>{ALL_CHILDREN.avatar}</Text>
            </View>
            <View>
              <Text style={{ fontWeight: "600", color: "#1a1a1a" }}>All children</Text>
              <View style={{ flexDirection: "row", gap: 4, marginTop: 2 }}>
                {CHILDREN.map((c) => (
                  <View key={c.id} style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: c.color, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 9, fontWeight: "700", color: "#fff" }}>{c.avatar}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <Icons.ChevronRight />
        </Pressable>
        {CHILDREN.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => onSelect(c)}
            style={({ pressed }) => [
              styles.listItem,
              { borderRadius: 12, borderWidth: 1, borderBottomWidth: 1, borderColor: "#F0F1F3", marginBottom: 8 },
              pressed && { backgroundColor: "#F5F6F8" },
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View style={styles.avatar(c.color)}>
                <Text style={styles.avatarText(40)}>{c.avatar}</Text>
              </View>
              <View>
                <Text style={{ fontWeight: "600", color: "#1a1a1a" }}>{c.name} {c.surname}</Text>
                <Text style={{ fontSize: 13, color: "#94A3B8" }}>{c.year} · {c.school}</Text>
              </View>
            </View>
            <Icons.ChevronRight />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
