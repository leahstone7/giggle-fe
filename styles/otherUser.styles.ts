import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 2,
  },
  username: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  verified: {
    fontSize: 14,
    color: "green",
  },
  section: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    width: 120,
    color: "#333",
  },
  value: {
    flex: 1,
    color: "#333",
  },
  giggingStyles: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  giggingStyle: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
    fontSize: 12,
  },
  biography: {
    lineHeight: 20,
    color: "#333",
  },
  eventsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  event: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },

  chatBtn:{
     backgroundColor: "#e0e0e0",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
    fontSize: 12,
    width: 50,
    alignItems: 'center',
    height: 30,
    alignContent: 'center'
    
},
});
