import "react-native-url-polyfill/auto";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supa_base_url = "https://vrviheeckmvtanutohnq.supabase.co";
const supa_base_anon_Key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZydmloZWVja212dGFudXRvaG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4NDg3MzYsImV4cCI6MjAyMTQyNDczNn0.v7KNyL25sTGo6SfwCsxna3884tr5klqN1IvrcKjbtr4";

export const supabase = createClient(supa_base_url, supa_base_anon_Key, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
