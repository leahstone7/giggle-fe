import { createContext, useState, useContext, ReactNode } from "react";



export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  location: { town: string; postcode: string };
  preferences: {
    drinkPreference: string | null ;
    seatPreference: string;
    giggingStyle: {
      mosher: boolean;
      singalong: boolean;
      photographer: boolean;
    };
  };
  biography: string;
  dateOfBirth: string;
  gender: string;
  trustRating: number;
  isVerified: boolean;
  memberSince: string;
  interestedEvents: string[];
  profilePictureURL: string;
}

const hardCodedUser: IUser = {
  _id: "6841b8a92dc3ed702a69d6b1",
  firstName: "Tester",
  lastName: "McTester",
  username: "tester99",
  location: { town: "London", postcode: "W7 6AN" },
  preferences: {
    drinkPreference: "none",
    seatPreference: "Seating",
    giggingStyle: { mosher: false, singalong: true, photographer: false },
  },
  biography: "This is where users can input details about themselves",
  dateOfBirth: "1992-03-15",
  gender: "Prefer not to say",
  trustRating: 1,
  isVerified: true,
  memberSince: "2025-05-25",
  interestedEvents: ["6841b08fdd14c4583ebed053"],
  profilePictureURL: "https://robohash.org/mail@ashallendesign.co.uk",
};

type UserContextType = {
  loggedInUser: IUser;
  setLoggedInUser: (user: IUser) => void;
};

//Initialize with undefined but assert the type
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<IUser>(hardCodedUser);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

