/** biome-ignore-all lint/style/noNestedTernary: <explanation> */
import Constants from "expo-constants"

export const apiUrl =
  Constants.executionEnvironment === "storeClient" &&
  Constants.expoConfig?.hostUri
    ? `http://${Constants.expoConfig?.hostUri?.split(":")[0]}:${process.env.EXPO_PUBLIC_LOCAL_BACKEND_PORT ?? 8000}`
    : (process.env.EXPO_PUBLIC_BACKEND_URL ?? "")
