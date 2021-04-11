import MarsApi from "./marsApi.service";
import Manifest from "@/types/Manifest";

export default {
  getCuriosityManifests(): Promise<Manifest> {
    return MarsApi.get<Manifest>("/manifests/curiosity").then(
      manifests => manifests.data
    );
  }
};
