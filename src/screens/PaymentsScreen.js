import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "../styles";
import { Icons } from "../components/Icons";

const ACCOUNTS = [
  { name: "Meal Account", balance: "£2.40", color: "#E8735A", low: true },
  { name: "Wraparound Care", balance: "£48.00", color: "#1B6B4A", low: false },
];

const BOOKINGS_LIST = [
  { name: "Art Club", type: "Club", when: "Tuesdays 3:30–4:30pm", price: "£5/session", spots: "3 spots left", color: "#9B59B6" },
  { name: "Year 5 Science Trip", type: "Trip", when: "Mon 17 Mar", price: "£35", spots: "", color: "#5A8FE8" },
  { name: "Parents' Evening", type: "Event", when: "Thu 6 Mar", price: "Free", spots: "Book a slot", color: "#1B6B4A" },
  { name: "Coding Club", type: "Club", when: "Thursdays 3:30–4:30pm", price: "£6/session", spots: "5 spots left", color: "#E8735A" },
];

const MY_BOOKINGS_BOOKED = [
  { name: "Art Club", detail: "Tuesdays · Term 4", paid: "£40.00" },
  { name: "Breakfast Club", detail: "Daily · Ongoing", paid: "Pay as you go" },
];

const MEAL_DAYS = ["Mon 24", "Tue 25", "Wed 26", "Thu 27", "Fri 28"];
const MEALS = [
  ["Chicken Pasta", "Veggie Wrap", "Jacket Potato"],
  ["Fish Fingers", "Cheese Toastie", "Baked Potato"],
  ["Roast Dinner", "Quorn Roast", "Pasta Bar"],
  ["Sausage & Mash", "Veggie Sausage", "Sandwich"],
  ["Fish & Chips", "Pizza Slice", "Wrap Bar"],
];

const SHOP_CATS = [
  { cat: "Uniform", items: [{ name: "Polo Shirt (White)", price: "£8.50" }, { name: "School Jumper", price: "£14.00" }] },
  { cat: "PE Kit", items: [{ name: "PE Shorts", price: "£6.00" }, { name: "PE T-Shirt", price: "£7.50" }] },
  { cat: "Accessories", items: [{ name: "Book Bag", price: "£5.00" }, { name: "Water Bottle", price: "£3.50" }] },
];

export function PaymentsScreen({ child, subPage, navigate }) {
  const [bookingsTab, setBookingsTab] = useState("all");
  const [myBookingsTab, setMyBookingsTab] = useState("booked");

  if (subPage === "accounts") {
    return (
      <View>
        <View style={styles.subHeader}>
          <Pressable onPress={() => navigate("payments")} style={{ padding: 4 }}>
            <Icons.Back />
          </Pressable>
          <Text style={{ fontWeight: "600" }}>Accounts & Balances</Text>
        </View>
        <View style={{ paddingTop: 8 }}>
        {ACCOUNTS.map((a, i) => (
          <View key={i} style={[styles.card, a.low && { borderWidth: 2, borderColor: "#E8735A" }, i === 0 && { marginTop: 20 }]}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <View>
                <Text style={{ fontWeight: "600", fontSize: 16 }}>{a.name}</Text>
                <Text style={{ fontSize: 13, color: "#94A3B8" }}>
          {child.id === "all" ? "Olivia & Ethan Chen" : `${child.name} ${child.surname}`}
        </Text>
              </View>
              <Text style={{ fontSize: 24, fontWeight: "700", color: a.color }}>{a.balance}</Text>
            </View>
            {a.low && (
              <View style={[styles.badge("#E8735A"), { marginBottom: 12 }]}>
                <Text style={{ fontSize: 12, fontWeight: "600", color: "#E8735A" }}>Low balance</Text>
              </View>
            )}
            <Pressable onPress={() => navigate("topup")} style={[styles.btn(a.low ? undefined : "outline"), { marginTop: 0 }]}>
              <Text style={{ fontSize: 15, fontWeight: "600", color: a.low ? "#fff" : "#1B6B4A" }}>Top up</Text>
            </Pressable>
          </View>
        ))}
        </View>
      </View>
    );
  }

  if (subPage === "topup") {
    return (
      <View>
        <View style={styles.subHeader}>
          <Pressable onPress={() => navigate("accounts")} style={{ padding: 4 }}>
            <Icons.Back />
          </Pressable>
          <Text style={{ fontWeight: "600" }}>Top Up Meal Account</Text>
        </View>
        <View style={styles.card}>
          <Text style={{ fontSize: 14, color: "#94A3B8", marginBottom: 8 }}>Current balance</Text>
          <Text style={{ fontSize: 32, fontWeight: "700", color: "#E8735A", marginBottom: 20 }}>£2.40</Text>
          <Text style={{ fontSize: 14, fontWeight: "600", marginBottom: 12 }}>Select amount</Text>
          <View style={{ flexDirection: "row", gap: 8, marginBottom: 20 }}>
            {["£10", "£20", "£50"].map((a) => (
              <Pressable key={a} style={{ flex: 1, paddingVertical: 14, borderRadius: 12, borderWidth: 2, borderColor: a === "£20" ? "#1B6B4A" : "#F0F1F3", backgroundColor: a === "£20" ? "#E8F5EE" : "#fff", alignItems: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#1a1a1a" }}>{a}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable onPress={() => navigate("topup-success")} style={styles.btn()}>
            <Text style={{ fontSize: 15, fontWeight: "600", color: "#fff" }}>Pay £20.00</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (subPage === "topup-success") {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 60 }}>
        <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: "#E8F5EE", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          <Icons.Check />
        </View>
        <Text style={{ fontSize: 22, fontWeight: "700", color: "#1a1a1a", marginBottom: 8 }}>Top-up successful</Text>
        <Text style={{ fontSize: 15, color: "#94A3B8", marginBottom: 4 }}>£20.00 added to Meal Account</Text>
        <Text style={{ fontSize: 15, color: "#1B6B4A", fontWeight: "600", marginBottom: 32 }}>New balance: £22.40</Text>
        <Pressable onPress={() => navigate("payments")} style={styles.btn()}>
          <Text style={{ fontSize: 15, fontWeight: "600", color: "#fff" }}>Done</Text>
        </Pressable>
      </View>
    );
  }

  if (subPage === "bookings") {
    return (
      <View>
        <View style={styles.subHeader}>
          <Pressable onPress={() => navigate("payments")} style={{ padding: 4 }}>
            <Icons.Back />
          </Pressable>
          <Text style={{ fontWeight: "600" }}>Browse & Book</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 8, padding: 12, paddingHorizontal: 16 }}>
          {["All", "Clubs", "Trips", "Parents' Eves"].map((t) => (
            <Pressable key={t} onPress={() => setBookingsTab(t.toLowerCase())} style={styles.pill(bookingsTab === t.toLowerCase())}>
              <Text style={{ fontSize: 13, fontWeight: "500", color: bookingsTab === t.toLowerCase() ? "#fff" : "#64748B" }}>{t}</Text>
            </Pressable>
          ))}
        </View>
        {BOOKINGS_LIST.map((b, i) => (
          <Pressable key={i} onPress={() => navigate("booking-detail")} style={styles.listItem}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "600", color: "#1a1a1a" }}>{b.name}</Text>
              <Text style={{ fontSize: 13, color: "#94A3B8", marginTop: 2 }}>{b.when}</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
                <View style={styles.tag}><Text style={{ fontSize: 12, color: "#64748B" }}>{b.type}</Text></View>
                <View style={styles.tag}><Text style={{ fontSize: 12, color: "#64748B" }}>{b.price}</Text></View>
                {b.spots ? <View style={[styles.tag, { backgroundColor: "#E8F5EE" }]}><Text style={{ fontSize: 12, color: "#1B6B4A" }}>{b.spots}</Text></View> : null}
              </View>
            </View>
            <Icons.ChevronRight />
          </Pressable>
        ))}
      </View>
    );
  }

  if (subPage === "booking-detail") {
    return (
      <View>
        <View style={styles.subHeader}>
          <Pressable onPress={() => navigate("bookings")} style={{ padding: 4 }}>
            <Icons.Back />
          </Pressable>
          <Text style={{ fontWeight: "600" }}>Art Club</Text>
        </View>
        <View style={{ height: 160, backgroundColor: "#9B59B6", justifyContent: "flex-end", padding: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: "700", color: "#fff" }}>Art Club</Text>
          <Text style={{ fontSize: 14, color: "#fff", opacity: 0.8, marginTop: 2 }}>Tuesdays · 3:30–4:30pm</Text>
        </View>
        <View style={styles.card}>
          <Text style={{ fontSize: 14, color: "#64748B", lineHeight: 22, marginBottom: 16 }}>
            A fun after-school art club run by Ms. Patterson. Children explore painting, drawing, and mixed media. Open to all Year 5 students.
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            <View style={[styles.tag, { flexDirection: "row", alignItems: "center" }]}>
              <Icons.Calendar />
              <Text style={{ fontSize: 12, color: "#64748B" }}> Term 4 (8 weeks)</Text>
            </View>
            <View style={styles.tag}><Text style={{ fontSize: 12, color: "#64748B" }}>£5/session</Text></View>
            <View style={[styles.tag, { backgroundColor: "#E8F5EE" }]}><Text style={{ fontSize: 12, color: "#1B6B4A" }}>3 spots left</Text></View>
          </View>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#1a1a1a", marginBottom: 16 }}>
            £40.00 <Text style={{ fontSize: 14, fontWeight: "400", color: "#94A3B8" }}>full term</Text>
          </Text>
          <Pressable onPress={() => navigate("basket")} style={styles.btn()}>
            <Text style={{ fontSize: 15, fontWeight: "600", color: "#fff" }}>Add to basket</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (subPage === "basket") {
    return (
      <View>
        <View style={styles.subHeader}>
          <Pressable onPress={() => navigate("payments")} style={{ padding: 4 }}>
            <Icons.Back />
          </Pressable>
          <Text style={{ fontWeight: "600" }}>Basket</Text>
        </View>
        <View style={styles.card}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: "#F5F6F8" }}>
            <View>
              <Text style={{ fontWeight: "600" }}>Art Club — Full Term</Text>
              <Text style={{ fontSize: 13, color: "#94A3B8" }}>8 sessions · {child.id === "all" ? "All children" : child.name}</Text>
            </View>
            <Text style={{ fontWeight: "700" }}>£40.00</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>Total</Text>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>£40.00</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 16, gap: 8 }}>
          <Pressable onPress={() => navigate("order-success")} style={styles.btn()}>
            <Text style={{ fontSize: 15, fontWeight: "600", color: "#fff" }}>Pay now</Text>
          </Pressable>
          <Pressable onPress={() => navigate("bookings")} style={styles.btn("outline")}>
            <Text style={{ fontSize: 15, fontWeight: "600", color: "#1B6B4A" }}>Continue shopping</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (subPage === "order-success") {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 60 }}>
        <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: "#E8F5EE", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          <Icons.Check />
        </View>
        <Text style={{ fontSize: 22, fontWeight: "700", color: "#1a1a1a", marginBottom: 8 }}>Booking confirmed!</Text>
        <Text style={{ fontSize: 15, color: "#94A3B8", marginBottom: 4 }}>Art Club — Full Term</Text>
        <Text style={{ fontSize: 15, color: "#64748B", marginBottom: 4 }}>8 sessions · Tuesdays 3:30–4:30pm</Text>
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#1B6B4A", marginBottom: 32 }}>£40.00 paid</Text>
        <Pressable onPress={() => navigate("my-bookings")} style={styles.btn()}>
          <Text style={{ fontSize: 15, fontWeight: "600", color: "#fff" }}>View my bookings</Text>
        </Pressable>
      </View>
    );
  }

  if (subPage === "my-bookings") {
    return (
      <View>
        <View style={styles.subHeader}>
          <Pressable onPress={() => navigate("payments")} style={{ padding: 4 }}>
            <Icons.Back />
          </Pressable>
          <Text style={{ fontWeight: "600" }}>My Bookings</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 8, padding: 12, paddingHorizontal: 16 }}>
          {["Booked", "Pending", "Past"].map((t) => (
            <Pressable key={t} onPress={() => setMyBookingsTab(t.toLowerCase())} style={styles.pill(myBookingsTab === t.toLowerCase())}>
              <Text style={{ fontSize: 13, fontWeight: "500", color: myBookingsTab === t.toLowerCase() ? "#fff" : "#64748B" }}>{t}</Text>
            </Pressable>
          ))}
        </View>
        {myBookingsTab === "booked" && MY_BOOKINGS_BOOKED.map((b, i) => (
          <View key={i} style={styles.listItem}>
            <View>
              <Text style={{ fontWeight: "600" }}>{b.name}</Text>
              <Text style={{ fontSize: 13, color: "#94A3B8" }}>{b.detail}</Text>
            </View>
            <Text style={{ fontSize: 13, fontWeight: "600", color: "#1B6B4A" }}>{b.paid}</Text>
          </View>
        ))}
        {myBookingsTab === "pending" && (
          <View style={styles.listItem}>
            <View>
              <Text style={{ fontWeight: "600" }}>Year 5 Science Trip</Text>
              <Text style={{ fontSize: 13, color: "#94A3B8" }}>Mon 17 Mar</Text>
            </View>
            <View style={styles.badge("#E8735A")}>
              <Text style={{ fontSize: 12, fontWeight: "600", color: "#E8735A" }}>£35 due</Text>
            </View>
          </View>
        )}
        {myBookingsTab === "past" && (
          <View style={{ padding: 40, alignItems: "center" }}>
            <Text style={{ color: "#94A3B8", fontSize: 14 }}>No past bookings yet</Text>
          </View>
        )}
      </View>
    );
  }

  if (subPage === "meals") {
    return (
      <View>
        <View style={styles.subHeader}>
          <Pressable onPress={() => navigate("payments")} style={{ padding: 4 }}>
            <Icons.Back />
          </Pressable>
          <Text style={{ fontWeight: "600" }}>Meals — Week of 24 Feb</Text>
        </View>
        <View style={{ padding: 8, paddingHorizontal: 16 }}>
          <View style={[styles.card, { padding: 12, paddingHorizontal: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>
            <View>
              <Text style={{ fontSize: 13, color: "#94A3B8" }}>Balance</Text>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "#E8735A" }}>£2.40</Text>
            </View>
            <Pressable onPress={() => navigate("topup")} style={styles.btn("sm")}>
              <Text style={{ fontSize: 13, fontWeight: "600", color: "#fff" }}>Top up</Text>
            </Pressable>
          </View>
        </View>
        {MEAL_DAYS.map((d, di) => (
          <View key={d}>
            <Text style={[styles.sectionTitle, { marginTop: 12, marginBottom: 4 }]}>{d} Feb</Text>
            {MEALS[di].map((m, mi) => (
              <View key={mi} style={[styles.listItem, { paddingLeft: 36 }]}>
                <Text style={{ fontSize: 14, color: "#1a1a1a" }}>{m}</Text>
                <View style={{ width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: mi === 0 && di < 3 ? "#1B6B4A" : "#E2E8F0", backgroundColor: mi === 0 && di < 3 ? "#E8F5EE" : "#fff", alignItems: "center", justifyContent: "center" }}>
                  {mi === 0 && di < 3 ? <Icons.Check /> : null}
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  }

  if (subPage === "shop") {
    return (
      <View>
        <View style={styles.subHeader}>
          <Pressable onPress={() => navigate("payments")} style={{ padding: 4 }}>
            <Icons.Back />
          </Pressable>
          <Text style={{ fontWeight: "600" }}>School Shop</Text>
        </View>
        {SHOP_CATS.map((c, ci) => (
          <View key={ci}>
            <Text style={styles.sectionTitle}>{c.cat}</Text>
            {c.items.map((item, ii) => (
              <View key={ii} style={styles.listItem}>
                <View>
                  <Text style={{ fontWeight: "500" }}>{item.name}</Text>
                  <Text style={{ fontSize: 14, fontWeight: "700", color: "#1B6B4A", marginTop: 2 }}>{item.price}</Text>
                </View>
                <Pressable style={styles.btn("sm")}>
                  <Text style={{ fontSize: 13, fontWeight: "600", color: "#fff" }}>Add</Text>
                </Pressable>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  }

  // Payments landing
  const actionCards = [
    { label: "Browse & Book", icon: <Icons.Search />, dest: "bookings" },
    { label: "My Bookings", icon: <Icons.Calendar />, dest: "my-bookings" },
    { label: "Basket", icon: <Icons.Basket />, dest: "basket", count: 1 },
    { label: "Meals", icon: <Text style={{ fontSize: 24 }}>🍽</Text>, dest: "meals" },
    { label: "School Shop", icon: <Text style={{ fontSize: 24 }}>🛍</Text>, dest: "shop" },
  ];

  return (
    <View>
      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>Payments</Text>
        <Text style={{ fontSize: 14, color: "#94A3B8" }}>
          {child.id === "all" ? "Manage bookings, meals & purchases for all children" : `Manage bookings, meals & purchases for ${child.name}`}
        </Text>
      </View>

      {/* OUTSTANDING HERO BANNER */}
      <Pressable onPress={() => navigate("bookings")} style={{
        marginHorizontal: 16, marginBottom: 4, marginTop: 4,
        backgroundColor: "#fff",
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: "#E8735A",
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <View>
          <Text style={{ fontSize: 11, fontWeight: "600", color: "#E8735A", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>Outstanding</Text>
          <Text style={{ fontWeight: "700", fontSize: 15, color: "#1a1a1a" }}>Year 5 Science Trip</Text>
          <Text style={{ fontSize: 13, color: "#94A3B8", marginTop: 2 }}>Due by 10 Mar</Text>
        </View>
        <View style={{ alignItems: "flex-end", gap: 6 }}>
          <View style={styles.badge("#E8735A")}>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#E8735A" }}>£35.00</Text>
          </View>
          <Icons.ChevronRight />
        </View>
      </Pressable>

      {/* ACCOUNTS & BALANCES — TIER 1 */}
      <Pressable onPress={() => navigate("accounts")} style={[styles.card, { marginBottom: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Icons.Wallet />
          <View>
            <Text style={{ fontWeight: "600", fontSize: 15, color: "#1a1a1a" }}>Accounts & Balances</Text>
            <View style={[styles.badge("#E8735A"), { marginTop: 4 }]}>
              <Text style={{ fontSize: 11, fontWeight: "600", color: "#E8735A" }}>Low balance</Text>
            </View>
          </View>
        </View>
        <Icons.ChevronRight />
      </Pressable>

      {/* QUICK ACTIONS — TIER 2 */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, paddingHorizontal: 16, paddingBottom: 16 }}>
        {actionCards.map((a, i) => (
          <Pressable key={i} onPress={() => navigate(a.dest)} style={[styles.card, { margin: 0, padding: 16, flex: 1, minWidth: "45%" }]}>
            <View>{a.icon}</View>
            <Text style={{ fontWeight: "600", fontSize: 14, color: "#1a1a1a", marginTop: 8 }}>{a.label}</Text>
            {a.count ? (
              <View style={{ position: "absolute", top: 10, right: 10, width: 20, height: 20, borderRadius: 10, backgroundColor: "#E8735A", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "#fff", fontSize: 11, fontWeight: "700" }}>{a.count}</Text>
              </View>
            ) : null}
          </Pressable>
        ))}
      </View>
    </View>
  );
}
