import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "../styles";
import { Icons } from "../components/Icons";
import { ProgressBar } from "../components/ProgressBar";
import { CHILDREN } from "../constants";

const TABS = [
  { key: "academic", label: "Academic" },
  { key: "behaviour", label: "Behaviour" },
  { key: "attendance", label: "Attendance" },
];

const SUBJECTS = [
  { subj: "Maths", level: "Expected", color: "#1B6B4A" },
  { subj: "English", level: "Above", color: "#5A8FE8" },
  { subj: "Science", level: "Expected", color: "#1B6B4A" },
  { subj: "History", level: "Below", color: "#F5A623" },
  { subj: "Art", level: "Above", color: "#5A8FE8" },
];

const MATH_TOPICS = ["Number & Place Value", "Addition & Subtraction", "Fractions", "Geometry", "Measurement"];
const MATH_LEVELS = ["Expected", "Above", "Below", "Expected", "Above"];
const MATH_COLORS = ["#1B6B4A", "#1B6B4A", "#F5A623", "#1B6B4A", "#5A8FE8"];

const BEHAVIOUR_ITEMS = [
  { text: "Excellent teamwork in Science", points: "+5", color: "#1B6B4A", date: "Today" },
  { text: "Great reading presentation", points: "+3", color: "#1B6B4A", date: "Yesterday" },
  { text: "Reminder about uniform", points: "", color: "#F5A623", date: "Mon 17 Feb" },
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export function MyChildScreen({ child, setChild, subPage, navigate }) {
  const [tab, setTab] = useState("academic");

  if (subPage === "academic-detail") {
    return (
      <View>
        <View style={styles.subHeader}>
          <Pressable onPress={() => navigate("mychild")} style={{ padding: 4 }}>
            <Icons.Back />
          </Pressable>
          <Text style={{ fontWeight: "600" }}>Maths — Detail</Text>
        </View>
        <View style={styles.card}>
          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 4 }}>Maths</Text>
          <View style={styles.badge("#1B6B4A")}>
            <Text style={{ fontSize: 12, fontWeight: "600", color: "#1B6B4A" }}>Expected</Text>
          </View>
          <View style={{ marginTop: 16 }}>
            {MATH_TOPICS.map((t, i) => (
              <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#F5F6F8" }}>
                <Text style={{ fontSize: 14, color: "#1a1a1a" }}>{t}</Text>
                <View style={styles.badge(MATH_COLORS[i])}>
                  <Text style={{ fontSize: 12, fontWeight: "600", color: MATH_COLORS[i] }}>{MATH_LEVELS[i]}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }

  if (child.id === "all") {
    return (
      <View style={{ paddingBottom: 16 }}>
        <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#1a1a1a" }}>My Children</Text>
          <Text style={{ fontSize: 14, color: "#94A3B8", marginTop: 2 }}>Overview for all your children</Text>
        </View>
        {CHILDREN.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => { setChild(c); navigate("mychild"); }}
            style={[styles.card, { marginBottom: 12 }]}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <View style={styles.avatar(c.color, 44)}>
                <Text style={styles.avatarText(44)}>{c.avatar}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 17, fontWeight: "700", color: "#1a1a1a" }}>{c.name} {c.surname}</Text>
                <Text style={{ fontSize: 13, color: "#94A3B8" }}>{c.year} · {c.school}</Text>
              </View>
              <Icons.ChevronRight />
            </View>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <View style={{ flex: 1, alignItems: "center", padding: 10, backgroundColor: "#F7F8FA", borderRadius: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#1B6B4A" }}>96.2%</Text>
                <Text style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>Attendance</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center", padding: 10, backgroundColor: "#F7F8FA", borderRadius: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#5A8FE8" }}>42 pts</Text>
                <Text style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>Behaviour</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center", padding: 10, backgroundColor: "#F7F8FA", borderRadius: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#9B59B6" }}>Exp.</Text>
                <Text style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>Academic</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    );
  }

  return (
    <View>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, marginBottom: 12, flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View style={styles.avatar(child.color, 48)}>
          <Text style={styles.avatarText(48)}>{child.avatar}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>{child.name} {child.surname}</Text>
          <Text style={{ fontSize: 14, color: "#94A3B8" }}>{child.year} · {child.school}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 8, paddingHorizontal: 20, paddingBottom: 16 }}>
        {TABS.map((t) => (
          <Pressable key={t.key} onPress={() => setTab(t.key)} style={[styles.pill(tab === t.key)]}>
            <Text style={{ fontSize: 13, fontWeight: "500", color: tab === t.key ? "#fff" : "#64748B" }}>{t.label}</Text>
          </Pressable>
        ))}
      </View>

      {tab === "academic" && (
        <View>
          <Text style={styles.sectionTitle}>Subjects</Text>
          {SUBJECTS.map((s, i) => (
            <Pressable key={i} onPress={() => navigate("academic-detail")} style={styles.listItem}>
              <View>
                <Text style={{ fontWeight: "600", color: "#1a1a1a" }}>{s.subj}</Text>
                <Text style={{ fontSize: 13, color: "#94A3B8", marginTop: 2 }}>Last updated: Feb 2026</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <View style={styles.badge(s.color)}>
                  <Text style={{ fontSize: 12, fontWeight: "600", color: s.color }}>{s.level}</Text>
                </View>
                <Icons.ChevronRight />
              </View>
            </Pressable>
          ))}
        </View>
      )}

      {tab === "behaviour" && (
        <View>
          <View style={styles.card}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
              <View>
                <Text style={{ fontSize: 28, fontWeight: "700", color: "#1B6B4A" }}>42</Text>
                <Text style={{ fontSize: 13, color: "#94A3B8" }}>House points</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 28, fontWeight: "700", color: "#E8735A" }}>1</Text>
                <Text style={{ fontSize: 13, color: "#94A3B8" }}>Behaviour note</Text>
              </View>
            </View>
          </View>
          <Text style={styles.sectionTitle}>Recent</Text>
          {BEHAVIOUR_ITEMS.map((b, i) => (
            <View key={i} style={styles.listItem}>
              <View>
                <Text style={{ fontWeight: "500", color: "#1a1a1a", fontSize: 14 }}>{b.text}</Text>
                <Text style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>{b.date}</Text>
              </View>
              {b.points ? (
                <View style={styles.badge(b.color)}>
                  <Text style={{ fontSize: 12, fontWeight: "600", color: b.color }}>{b.points}</Text>
                </View>
              ) : null}
            </View>
          ))}
        </View>
      )}

      {tab === "attendance" && (
        <View>
          <View style={styles.card}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
              <View>
                <Text style={{ fontSize: 28, fontWeight: "700", color: "#1B6B4A" }}>96.2%</Text>
                <Text style={{ fontSize: 13, color: "#94A3B8" }}>This year</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 28, fontWeight: "700", color: "#5A8FE8" }}>3</Text>
                <Text style={{ fontSize: 13, color: "#94A3B8" }}>Absences</Text>
              </View>
            </View>
            <ProgressBar pct={96.2} color="#1B6B4A" />
            <Text style={{ fontSize: 12, color: "#94A3B8", marginTop: 8 }}>National target: 95%</Text>
          </View>
          <Text style={styles.sectionTitle}>This week</Text>
          {WEEKDAYS.map((d, i) => (
            <View key={d} style={styles.listItem}>
              <Text style={{ fontWeight: "500", color: "#1a1a1a" }}>{d} 24 Feb</Text>
              <View style={styles.badge(i < 3 ? "#1B6B4A" : "#94A3B8")}>
                <Text style={{ fontSize: 12, fontWeight: "600", color: i < 3 ? "#1B6B4A" : "#94A3B8" }}>{i < 3 ? "Present" : "—"}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
