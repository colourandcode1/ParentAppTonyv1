import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "../styles";
import { Icons } from "../components/Icons";
import { SCHOOLS } from "../constants";

const INBOX_MESSAGES = [
  { from: "Mrs. Johnson", subject: "World Book Day reminder", preview: "Dear Parents, Just a friendly reminder...", time: "9:15am", unread: true },
  { from: "School Office", subject: "Yr 5 trip payment reminder", preview: "Please ensure outstanding balance is paid...", time: "Yesterday", unread: true },
  { from: "Mr. Davies", subject: "PE kit reminder", preview: "Please ensure your child has their PE kit...", time: "Mon", unread: false },
  { from: "School Office", subject: "Newsletter — February", preview: "Welcome to our February newsletter...", time: "14 Feb", unread: false },
];

export function MessagesScreen({ subPage, navigate }) {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [sentTab, setSentTab] = useState(false);

  if (!selectedSchool && !subPage) {
    return (
      <View>
        <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>Messages</Text>
          <Text style={{ fontSize: 14, color: "#94A3B8", marginTop: 2 }}>Select a school to view messages</Text>
        </View>
        {SCHOOLS.map((s) => (
          <Pressable key={s} onPress={() => setSelectedSchool(s)} style={styles.listItem}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View style={styles.avatar("#1B6B4A", 36)}>
                <Text style={styles.avatarText(36)}>{s[0]}</Text>
              </View>
              <View>
                <Text style={{ fontWeight: "600" }}>{s}</Text>
                <Text style={{ fontSize: 13, color: "#94A3B8" }}>2 unread messages</Text>
              </View>
            </View>
            <Icons.ChevronRight />
          </Pressable>
        ))}
      </View>
    );
  }

  if (subPage === "message-detail") {
    return (
      <View>
        <View style={styles.subHeader}>
          <Pressable onPress={() => { navigate("messages"); setSelectedSchool("Oakwood Primary"); }} style={{ padding: 4 }}>
            <Icons.Back />
          </Pressable>
          <Text style={{ fontWeight: "600" }}>Message</Text>
        </View>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <View style={styles.avatar("#5A8FE8", 36)}>
              <Text style={styles.avatarText(36)}>MJ</Text>
            </View>
            <View>
              <Text style={{ fontWeight: "600" }}>Mrs. Johnson</Text>
              <Text style={{ fontSize: 12, color: "#94A3B8" }}>Year 5 Teacher · Today, 9:15am</Text>
            </View>
          </View>
          <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>World Book Day reminder</Text>
          <Text style={{ fontSize: 14, color: "#374151", lineHeight: 24 }}>
            Dear Parents,{"\n\n"}
            Just a friendly reminder that World Book Day is on Thursday 6th March. Children are welcome to come to school dressed as their favourite book character. We'll be having a special reading assembly and book swap in the afternoon.{"\n\n"}
            Please also remember to send in your £1 book token order form by Friday if you haven't already.{"\n\n"}
            Best wishes,{"\n"}
            Mrs. Johnson
          </Text>
          <View style={{ marginTop: 20 }}>
            <Pressable style={styles.btn("outline")}>
              <Text style={{ fontSize: 15, fontWeight: "600", color: "#1B6B4A" }}>Reply</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  if (subPage === "compose") {
    return (
      <View>
        <View style={styles.subHeader}>
          <Pressable onPress={() => { navigate("messages"); setSelectedSchool("Oakwood Primary"); }} style={{ padding: 4 }}>
            <Icons.Back />
          </Pressable>
          <Text style={{ fontWeight: "600" }}>New Message</Text>
        </View>
        <View style={{ padding: 20 }}>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, color: "#94A3B8", marginBottom: 4 }}>To</Text>
            <View style={{ paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1, borderColor: "#E2E8F0" }}>
              <Text style={{ fontSize: 14, color: "#94A3B8" }}>Select recipient...</Text>
            </View>
          </View>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, color: "#94A3B8", marginBottom: 4 }}>Subject</Text>
            <View style={{ paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1, borderColor: "#E2E8F0" }}>
              <Text style={{ fontSize: 14, color: "#94A3B8" }}>Enter subject...</Text>
            </View>
          </View>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 13, color: "#94A3B8", marginBottom: 4 }}>Message</Text>
            <View style={{ paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1, borderColor: "#E2E8F0", minHeight: 120 }}>
              <Text style={{ fontSize: 14, color: "#94A3B8" }}>Write your message...</Text>
            </View>
          </View>
          <Pressable style={styles.btn()}>
            <Text style={{ fontSize: 15, fontWeight: "600", color: "#fff" }}>Send</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // Inbox
  return (
    <View>
      <View style={styles.subHeader}>
        <Pressable onPress={() => { setSelectedSchool(null); navigate("messages"); }} style={{ padding: 4 }}>
          <Icons.Back />
        </Pressable>
        <Text style={{ fontWeight: "600" }}>{selectedSchool || "Oakwood Primary"}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8, paddingHorizontal: 16 }}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pressable onPress={() => setSentTab(false)} style={styles.pill(!sentTab)}>
            <Text style={{ fontSize: 13, fontWeight: "500", color: !sentTab ? "#fff" : "#64748B" }}>Inbox</Text>
          </Pressable>
          <Pressable onPress={() => setSentTab(true)} style={styles.pill(sentTab)}>
            <Text style={{ fontSize: 13, fontWeight: "500", color: sentTab ? "#fff" : "#64748B" }}>Sent</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => navigate("compose")} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: "#1B6B4A", alignItems: "center", justifyContent: "center" }}>
          <Icons.Plus />
        </Pressable>
      </View>
      {!sentTab ? (
        <View>
          {INBOX_MESSAGES.map((m, i) => (
            <Pressable key={i} onPress={() => navigate("message-detail")} style={[styles.listItem, m.unread && { backgroundColor: "#F7FBF9" }]}>
              <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-start", flex: 1 }}>
                {m.unread ? <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#1B6B4A", marginTop: 6 }} /> : null}
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontWeight: m.unread ? "700" : "500", fontSize: 14 }}>{m.from}</Text>
                    <Text style={{ fontSize: 12, color: "#94A3B8" }}>{m.time}</Text>
                  </View>
                  <Text style={{ fontWeight: m.unread ? "600" : "400", fontSize: 14, color: "#1a1a1a", marginTop: 2 }}>{m.subject}</Text>
                  <Text style={{ fontSize: 13, color: "#94A3B8", marginTop: 2 }} numberOfLines={1}>{m.preview}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      ) : (
        <View style={{ padding: 40, alignItems: "center" }}>
          <Text style={{ color: "#94A3B8", fontSize: 14 }}>No sent messages</Text>
        </View>
      )}
    </View>
  );
}
