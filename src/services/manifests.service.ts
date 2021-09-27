import MarsApi from "./marsApi.service";
import Manifest from "@/types/Manifest";

export default {
  getRoverManifests(): Promise<Manifest> {
    return MarsApi.get<Manifest>(`/manifests/${process.env.ROVER}`).then(
      manifests => manifests.data
    );
  }
};
