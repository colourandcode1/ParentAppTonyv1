import React from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "../styles";
import { Icons } from "../components/Icons";
import { ProgressBar } from "../components/ProgressBar";
import { CHILDREN } from "../constants";

const REMINDERS = [
  { text: "Pay remaining £35 for Year 5 trip", tag: "Payment", color: "#E8735A", dest: "payments" },
  { text: "Sign up for Art Club before Fri", tag: "Deadline", color: "#F5A623", dest: "bookings" },
  { text: "Meal account low — £2.40 left", tag: "Top up", color: "#E8735A", dest: "accounts" },
];

const METRICS = [
  { label: "Attendance", value: "96.2%", color: "#1B6B4A", pct: 96 },
  { label: "Behaviour", value: "42 pts", color: "#5A8FE8", pct: 84 },
  { label: "Reading", value: "Expected", color: "#9B59B6", pct: 70 },
];

const EVENTS = [
  { title: "Parents' Evening", date: "Thu 6 Mar · 4:30pm", type: "Book slot", color: "#9B59B6", dest: "bookings" },
  { title: "Year 5 Science Trip", date: "Mon 17 Mar", type: "£35 due", color: "#E8735A", dest: "bookings" },
  { title: "School Photos", date: "Wed 19 Mar", type: "Info", color: "#5A8FE8", dest: null },
];

export function HomeScreen({ child, setChild, navigate }) {
  return (
    <View style={{ paddingBottom: 16 }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 4 }}>
        <Text style={{ fontSize: 24, fontWeight: "700", color: "#1a1a1a" }}>Good morning, Sarah</Text>
        <Text style={{ fontSize: 14, color: "#94A3B8", marginTop: 2 }}>
          {child.id === "all" ? "Here's what's happening for all your children today" : `Here's what's happening for ${child.name} today`}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Action needed</Text>
      <View style={styles.card}>
        {REMINDERS.map((r, i) => (
          <Pressable
            key={i}
            onPress={() => navigate(r.dest)}
            style={({ pressed }) => [
              { flexDirection: "row", alignItems: "flex-start", paddingVertical: 10, borderBottomWidth: i < 2 ? 1 : 0, borderBottomColor: "#F5F6F8" },
              pressed && { backgroundColor: "#F7F8FA" },
            ]}
          >
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: r.color, marginTop: 6, marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#1a1a1a" }}>{r.text}</Text>
              <View style={[styles.badge(r.color), { marginTop: 6 }]}>
                <Text style={{ fontSize: 11, fontWeight: "600", color: r.color }}>{r.tag}</Text>
              </View>
            </View>
            <Icons.ChevronRight />
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>{child.id === "all" ? "All children's progress" : `${child.name}'s progress`}</Text>
      {child.id === "all" ? (
        CHILDREN.map((c) => (
          <Pressable key={c.id} style={[styles.card, { marginBottom: 8 }]} onPress={() => { setChild(c); navigate("mychild"); }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <View style={styles.avatar(c.color, 28)}>
                <Text style={styles.avatarText(28)}>{c.avatar}</Text>
              </View>
              <Text style={{ fontWeight: "600", color: "#1a1a1a" }}>{c.name}</Text>
              <Text style={{ fontSize: 13, color: "#94A3B8" }}>{c.year}</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", marginHorizontal: -8 }}>
              {METRICS.map((m, i) => (
                <View key={i} style={{ flex: 1, minWidth: 80, alignItems: "center", marginBottom: 8 }}>
                  <Text style={{ fontSize: 18, fontWeight: "700", color: m.color }}>{m.value}</Text>
                  <Text style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{m.label}</Text>
                  <View style={{ marginTop: 6, width: "100%", paddingHorizontal: 8 }}>
                    <ProgressBar pct={m.pct} color={m.color} />
                  </View>
                </View>
              ))}
            </View>
          </Pressable>
        ))
      ) : (
        <Pressable style={styles.card} onPress={() => navigate("mychild")}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", marginHorizontal: -8 }}>
            {METRICS.map((m, i) => (
              <View key={i} style={{ flex: 1, minWidth: 80, alignItems: "center", marginBottom: 8 }}>
                <Text style={{ fontSize: 20, fontWeight: "700", color: m.color }}>{m.value}</Text>
                <Text style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>{m.label}</Text>
                <View style={{ marginTop: 8, width: "100%", paddingHorizontal: 8 }}>
                  <ProgressBar pct={m.pct} color={m.color} />
                </View>
              </View>
            ))}
          </View>
        </Pressable>
      )}

      <Text style={styles.sectionTitle}>Coming up</Text>
      {EVENTS.map((e, i) => (
        <Pressable
          key={i}
          onPress={() => e.dest && navigate(e.dest)}
          style={[
            styles.listItem,
            { marginHorizontal: 16, borderRadius: i === 0 ? 12 : 0, borderTopLeftRadius: i === 0 ? 12 : 0, borderTopRightRadius: i === 0 ? 12 : 0, borderBottomLeftRadius: i === 2 ? 12 : 0, borderBottomRightRadius: i === 2 ? 12 : 0 },
          ]}
        >
          <View>
            <Text style={{ fontWeight: "600", color: "#1a1a1a", fontSize: 15 }}>{e.title}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
              <Icons.Calendar />
              <Text style={{ fontSize: 13, color: "#94A3B8" }}>{e.date}</Text>
            </View>
          </View>
          <View style={styles.badge(e.color)}>
            <Text style={{ fontSize: 12, fontWeight: "600", color: e.color }}>{e.type}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
