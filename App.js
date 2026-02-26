import React, { useState, useRef } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { CHILDREN, ALL_CHILDREN } from "./src/constants";
import { styles } from "./src/styles";
import { Icons } from "./src/components/Icons";
import { ChildSwitcher } from "./src/components/ChildSwitcher";
import { ProfileModal } from "./src/components/ProfileModal";
import { HomeScreen } from "./src/screens/HomeScreen";
import { MyChildScreen } from "./src/screens/MyChildScreen";
import { PaymentsScreen } from "./src/screens/PaymentsScreen";
import { MessagesScreen } from "./src/screens/MessagesScreen";

const NAV_ITEMS = [
  { key: "home", label: "Home", Icon: Icons.Home },
  { key: "mychild", label: "My Child", Icon: Icons.Child },
  { key: "payments", label: "Payments", Icon: Icons.Payments },
  { key: "messages", label: "Messages", Icon: Icons.Messages },
];

const topBarRow = {
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
};

const childSwitcherButton = {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  paddingVertical: 4,
  paddingHorizontal: 12,
  borderRadius: 20,
  backgroundColor: "#F7F8FA",
  borderWidth: 1,
  borderColor: "#F0F1F3",
};

const bottomNavRow = {
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-around",
};

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [child, setChild] = useState(CHILDREN[0]);
  const [showChildSwitcher, setShowChildSwitcher] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [subPage, setSubPage] = useState(null);
  const scrollRef = useRef(null);

  const paymentSubPages = ["accounts", "topup", "topup-success", "bookings", "booking-detail", "basket", "order-success", "my-bookings", "meals", "shop"];
  const myChildSubPages = ["academic-detail"];
  const messageSubPages = ["message-detail", "compose"];

  const navigate = (dest) => {
    if (["home", "mychild", "payments", "messages"].includes(dest)) {
      setActiveTab(dest);
      setSubPage(null);
    } else if (paymentSubPages.includes(dest)) {
      setActiveTab("payments");
      setSubPage(dest);
    } else if (myChildSubPages.includes(dest)) {
      setActiveTab("mychild");
      setSubPage(dest);
    } else if (messageSubPages.includes(dest)) {
      setActiveTab("messages");
      setSubPage(dest);
    } else {
      setSubPage(dest);
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: false });
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSubPage(null);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: false });
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#E8ECF0", padding: 20 }}>
      <StatusBar style="dark" />
      <View style={styles.frame}>
        <View style={styles.statusBar}>
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#1a1a1a" }}>9:41</Text>
        </View>

        <View style={styles.topBar}>
          <View style={topBarRow}>
            {/* School logo placeholder */}
            <View style={{ width: 40, height: 40, borderRadius: 8, borderWidth: 1.5, borderColor: "#E2E8F0", backgroundColor: "#F7F8FA" }} />
            <Pressable onPress={() => setShowChildSwitcher(true)} style={childSwitcherButton}>
              {child.id === "all" ? (
                <View style={[styles.avatar(ALL_CHILDREN.color, 24), { flexDirection: "row", alignItems: "center", justifyContent: "center" }]}>
                  <Text style={styles.avatarText(24)}>{ALL_CHILDREN.avatar}</Text>
                </View>
              ) : (
                <View style={styles.avatar(child.color, 24)}>
                  <Text style={styles.avatarText(24)}>{child.avatar}</Text>
                </View>
              )}
              <Text style={{ fontWeight: "600", fontSize: 14, color: "#1a1a1a" }}>{child.id === "all" ? "All children" : child.name}</Text>
              <Icons.ChevronDown />
            </Pressable>
            {/* Profile icon */}
            <View style={{ position: "relative" }}>
              <Pressable onPress={() => setShowProfile(true)} style={[styles.avatar("#94A3B8", 32)]}>
                <Text style={styles.avatarText(32)}>SC</Text>
              </Pressable>
              <View style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: 4, backgroundColor: "#E8735A" }} />
            </View>
          </View>
        </View>

        <ScrollView ref={scrollRef} style={styles.content} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          {activeTab === "home" && <HomeScreen child={child} setChild={setChild} navigate={navigate} />}
          {activeTab === "mychild" && <MyChildScreen child={child} setChild={setChild} subPage={subPage} navigate={navigate} />}
          {activeTab === "payments" && <PaymentsScreen child={child} subPage={subPage} navigate={navigate} />}
          {activeTab === "messages" && <MessagesScreen subPage={subPage} navigate={navigate} />}
        </ScrollView>

        <View style={styles.bottomNav}>
          <View style={bottomNavRow}>
            {NAV_ITEMS.map(({ key, label, Icon }) => (
              <Pressable key={key} onPress={() => handleTabChange(key)} style={[styles.navItem(activeTab === key)]}>
                <Icon active={activeTab === key} />
                <Text style={styles.navLabel(activeTab === key)}>{label}</Text>
                {key === "messages" ? (
                  <View style={{ position: "absolute", top: 2, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: "#E8735A" }} />
                ) : null}
              </Pressable>
            ))}
          </View>
        </View>

        <ChildSwitcher active={showChildSwitcher} onSelect={(c) => { setChild(c); setShowChildSwitcher(false); }} onClose={() => setShowChildSwitcher(false)} />
        {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
      </View>
    </View>
  );
}
