import { useDispatch } from "react-redux";
import { updateProgress } from "../redux/features/progress/progressSlice";
import { pingKubernetes } from "../redux/features/config/k8sConfig.thunk";
import { useNotification } from "./useNotification";
import { NOTIFICATION_EVENT_TYPES } from "@/utils/constants/notification";

interface NotifyFunction {
  (options: { message: string; details?: string; event_type: string }): void;
}

interface CallbackFunction<T> {
  (arg: T): void;
}

interface SuccessHandlerGeneratorArgs<T> {
  notify: NotifyFunction;
  msg: string;
  cb?: CallbackFunction<T>;
}

interface ErrorHandlerGeneratorArgs {
  notify: NotifyFunction;
  msg: string;
  cb?: CallbackFunction<any>;
}

export const successHandlerGenerator =
  ({ notify, msg, cb }: SuccessHandlerGeneratorArgs<T>) =>
  (res) => {
    if (res !== undefined) {
      if (cb !== undefined) cb(res);
      if (typeof res == "object") {
        res = JSON.stringify(res);
      }
      notify({
        message: `${msg}`,
        details: `${res}`,
        event_type: NOTIFICATION_EVENT_TYPES.SUCCESS,
      });
    }
  };

export const errorHandlerGenerator =
  ({ notify, msg, cb }: ErrorHandlerGeneratorArgs) =>
  (err) => {
    if (cb !== undefined) cb(err);
    err = typeof err !== "string" ? err.toString() : err;
    notify({
      message: `${msg}`,
      details: err,
      event_type: NOTIFICATION_EVENT_TYPES.ERROR,
    });
  };

export default function useKubernetesHook() {
  const { notify } = useNotification();
  const dispatch = useDispatch();
  const ping = (name, server, connectionID) => {
    dispatch(updateProgress({ showProgress: true }));
    pingKubernetes(
      successHandlerGenerator(
        notify,
        `Kubernetes context ${name} at ${server} pinged`,
        () => dispatch(updateProgress({ showProgress: false })),
      ),
      errorHandlerGenerator(
        notify,
        `Kubernetes context ${name} at ${server} not reachable`,
        () => dispatch(updateProgress({ showProgress: false })),
      ),
      connectionID,
    );
  };

  return ping;
}
