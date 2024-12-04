import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafc",
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fbc116",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  menuIcon: {
    fontSize: 28,
    color: "#040707",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#555",
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: "#22a84a",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.8)",
    justifyContent: "center",
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 16,
    padding: 16,
  },
  menuHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#22a84a",
  },
  menuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuItemText: {
    fontSize: 16,
    color: "#040707",
  },
  userInitialContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#22a84a",
    justifyContent: "center",
    alignItems: "center",
  },
  userInitialText: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 12,
  },
});

export default styles;
