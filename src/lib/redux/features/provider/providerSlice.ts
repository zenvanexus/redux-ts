import {
  createSlice,
  PayloadAction,
  createAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { ProvidersState } from "../../types";
import dataFetch from "@/utils/dataFetch";

/*
export const fetchProviders = createAsyncThunk<
  Record<string, any>,
  void,
  { rejectValue: string }
>("providers/fetchProviders", async (_, thunkAPI) => {
  try {
    const response = await fetch("http://localhost:9081/api/providers", {
      method: "GET",
      credentials: "include",
    });

    // Log the response here
    console.log("Response:", response);

    if (!response.ok) {
      // Handle non-OK responses
      const errorText = await response.text();
      return thunkAPI.rejectWithValue(errorText);
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      // Handle JSON response
      const result = await response.json();
      const providers: Record<string, any> = {};
      Object.keys(result).forEach((key) => {
        if (result[key].ProviderType === "remote") {
          providers[key] = result[key];
        }
      });
      return providers;
    } else {
      // Handle other response types, e.g., text
      const text = await response.text();
      return text;
    }
  } catch (error) {
    // Handle other errors
    console.error("Error in fetchProviders:", error);
    return thunkAPI.rejectWithValue(error?.message);
  }
});
*/

/*
export const fetchProviders = createAsyncThunk<
  Record<string, any>,
  void,
  { rejectValue: string }
>("providers/fetchProviders", async (_, thunkAPI) => {
  try {
    const response = await fetch("http://localhost:9081/api/providers", {
      method: "GET",
      credentials: "include",
    });

    // Log the response here
    console.log("Response:", response);

    if (!response.ok) {
      // Handle non-OK responses
      const errorText = await response.text();
      return thunkAPI.rejectWithValue(errorText);
    }

    const result = await response.json();

    // Log the result here
    console.log("Result:", result);

    // Assuming the structure you want is nested under the "None" key
    const desiredData = result["None"];

    if (!desiredData) {
      // Handle the case where the structure is not found
      return thunkAPI.rejectWithValue("Desired data not found");
    }

    return desiredData;
  } catch (error) {
    // Handle other errors
    console.error("Error in fetchProviders:", error);
    return thunkAPI.rejectWithValue(error?.message);
  }
});
*/

export const fetchProviders = createAsyncThunk<
  Record<string, any>,
  void,
  { rejectValue: string }
>("providers/fetchProviders", async (_, thunkAPI) => {
  try {
    const response = await fetch("http://localhost:9081/api/providers", {
      method: "GET",
      credentials: "include",
    });

    // Log the response here
    console.log("Response:", response);

    if (!response.ok) {
      // Handle non-OK responses
      const errorText = await response.text();
      return thunkAPI.rejectWithValue(errorText);
    }

    const result = await response.json();

    // Log the result here
    console.log("Result:", result);

    // Assuming the structure you want is nested under the "Meshery" key
    const mesheryData = result["Meshery"];

    if (!mesheryData) {
      // Handle the case where the structure is not found
      return thunkAPI.rejectWithValue("Meshery data not found");
    }

    // Assuming you also want information from the "None" key
    const noneData = result["None"];

    if (!noneData) {
      // Handle the case where the structure is not found
      return thunkAPI.rejectWithValue("None data not found");
    }

    // Extract capabilities from Meshery
    const mesheryCapabilities = extractCapabilities(mesheryData);

    // Extract capabilities from None
    const noneCapabilities = extractCapabilities(noneData);

    // You can now use mesheryCapabilities and noneCapabilities as needed
    console.log("Meshery Capabilities:", mesheryCapabilities);
    console.log("None Capabilities:", noneCapabilities);

    return { mesheryData, noneData, mesheryCapabilities, noneCapabilities };
  } catch (error) {
    // Handle other errors
    console.error("Error in fetchProviders:", error);
    return thunkAPI.rejectWithValue(error?.message);
  }
});

// Helper function to extract capabilities from a provider
function extractCapabilities(providerData: Record<string, any>) {
  const capabilities: any[] = [];

  if (providerData && providerData.capabilities) {
    Object.keys(providerData.capabilities).forEach((key) => {
      capabilities.push(providerData.capabilities[key]);
    });
  }

  return capabilities;
}

const initialState: ProvidersState = {
  providers: undefined,
  status: "idle",
  error: null,
  selectedProvider: "",
};

const providerSlice = createSlice({
  name: "providers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProviders.fulfilled,
        (state, action: PayloadAction<Record<string, any>>) => {
          state.status = "succeeded";
          state.providers = action.payload;
        },
      )
      .addCase(fetchProviders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      .addCase(setSelectedProvider, (state, action) => {
        state.selectedProvider = action.payload;
      });
  },
});

export const setSelectedProvider = createAction<string>(
  "providers/setSelectedProvider",
);

export default providerSlice;
