import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#fff",
    padding: 8,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 3,
    resizeMode: "cover",
  },

  contentContainer: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: "space-between",
  },

  artistName: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
    fontSize: 15
  },
  venueText:{
    color: "#555",
    marginBottom: 1,
    fontWeight: "500"
  },
  locationText: {
    color: "#555",
    marginBottom: 1,
    fontWeight: "500"
  },
  dateText: {
    color: "#555",
    fontWeight: "500"
  },
  ticketBtn:{
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,

  },

  ticketText: {
    fontSize: 15,
    color: "#283618",
    fontWeight: '500'
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius:8,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginHorizontal: 7,
  },

  searchIcon: {
    marginRight: 10,
    color: "#888"
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    paddingVertical: 10
  },
    clearBtn: {
    position: "absolute",
    justifyContent: 'center',
    right: 10,
    top: 10,
    zIndex: 1,
  },
  clearBtnText: {
    color: "#979897",
  },

 


});

//   style={{
//           flexDirection: "row",
//           borderWidth: 1,
//           borderRadius: 6,
//           borderColor: "#ccc",
//           padding: 6,
//         }