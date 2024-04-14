import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ConnectingToWifiStackParamsList } from './paramsList'
import { CompositeScreenProps } from '@react-navigation/native'

type ConnectToBleScreenProps = NativeStackScreenProps<
  ConnectingToWifiStackParamsList,
  'ConnectToBle'
>

type InsertWifiCredentialsScreenProps = NativeStackScreenProps<
  ConnectingToWifiStackParamsList,
  'InsertWifiCredentials'
>

export type {
  ConnectToBleScreenProps,
  InsertWifiCredentialsScreenProps
}