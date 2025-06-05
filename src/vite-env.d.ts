// / <reference types="vite/client" />
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = { 
  HomePage: undefined;
  Chat: undefined;
  ChatPage: { roomId: string };
};

export type HomePageProps = NativeStackScreenProps<RootStackParamList, 'HomePage'>;
export type ChatProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;
export type ChatPageProps = NativeStackScreenProps<RootStackParamList, 'ChatPage'>;

export type BottomTabParamList = { 
  HomePage: undefined;
  Chat: undefined;
};

export type HomePageTabProps = BottomTabScreenProps<BottomTabParamList, 'HomePage'>;
export type ChatTabProps = BottomTabScreenProps<BottomTabParamList, 'Chat'>;



