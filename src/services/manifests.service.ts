import MarsApi from "./marsApi.service";
import { ManifestsResponse } from "@types";

export default {
  getAllManifests(): Promise<ManifestsResponse> {
    return MarsApi.get("/manifests/curiosity");
  }
};
