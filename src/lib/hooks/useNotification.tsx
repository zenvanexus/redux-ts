import { NOTIFICATION_CENTER_TOGGLE_CLASS } from "@/components/NotificationCenter/constants/notification";
import { Close } from "@mui/icons-material";
import { ToggleButtonGroup, IconButton } from "@mui/material";
import moment from "moment";
import { useSnackbar } from "notistack";
import { AddClassRecursively } from "../Elements";
import { toggleNotificationCenter } from "../redux/features/events/event.slice";
import { newStore as rtkStore } from "../redux/newStore";
import { v4 } from "uuid";
import React from "react";

/**
 * NotificationOptions
 *
 *
 */
export interface NotificationOptions {
  id?: string | null;
  message: string;
  details?: string | null;
  event_type: string | { type: string };
  timestamp: number | null;
  customEvent?: object | null;
  showInNotificationCenter?: boolean;
  pushToServer?: boolean;
}

/**
 * A React hook to facilitate emitting events from the client.
 * The hook takes care of storing the events on the client through Redux
 * and also notifying the user through snackbars and the notification center.
 *
 * @returns {Object} An object with the `notify` property.
 */
export function useNotification(): {
  notify: (options: NotificationOptions) => void;
} {
  const x = useSnackbar();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  /**
   * Opens an event in the notification center.
   *
   * @param {string} eventId - The ID of the event to be opened.
   */
  const openEvent = (eventId: string) => {
    rtkStore.dispatch(toggleNotificationCenter());
  };
  /**
   * Notifies and stores the event.
   *
   * @param {Object} options - Options for the event notification.
   * @param {string} options.id - A unique ID for the event. If not provided, a random ID will be generated.
   * @param {string} options.message - Summary of the event.
   * @param {string} options.details - Description of the event.
   * @param {Object} options.event_type - The type of the event.
   * @param {number} options.timestamp - UTC timestamp for the event. If not provided, it is generated on the client.
   * @param {Object} options.customEvent - Additional properties related to the event.
   * @param {boolean} options.showInNotificationCenter - Whether to show the event in the notification center. Defaults to `true`.
   * @param {boolean} options.pushToServer - Whether to push the event to the server. Defaults to `false`.
   */
  const notify = (options: NotificationOptions): void => {
    const {
      id = null,
      message,
      details = null,
      event_type,
      timestamp = null,
      customEvent = null,
      showInNotificationCenter = false,
      pushToServer = false,
    } = options;

    options.timestamp = timestamp ?? moment.utc().valueOf();
    options.id = id || v4();

    enqueueSnackbar(message, {
      //NOTE: Need to Consolidate the variant and event_type
      variant:
        typeof event_type === "string"
          ? (event_type as "default" | "error" | "success" | "warning" | "info")
          : "type" in event_type
            ? (
                event_type as {
                  type: "default" | "error" | "success" | "warning" | "info";
                }
              ).type
            : undefined,
      action: function Action(key) {
        return (
          <ToggleButtonGroup>
            {showInNotificationCenter && (
              <AddClassRecursively className={NOTIFICATION_CENTER_TOGGLE_CLASS}>
                <IconButton
                  key={`openevent-${id}`}
                  aria-label="Open"
                  color="inherit"
                  onClick={() => openEvent(id)}
                >
                  {/* <Bell /> */}
                </IconButton>
              </AddClassRecursively>
            )}
            <IconButton
              key={`closeevent-${id}`}
              aria-label="Close"
              color="inherit"
              onClick={() => closeSnackbar(key)}
            >
              <Close />
            </IconButton>
          </ToggleButtonGroup>
        );
      },
    });
  };

  return {
    notify,
  };
}

interface WithNotifyProps {
  notify: (options: NotificationOptions) => void;
}

/**
 * A higher-order component that provides the `notify` function as a prop to a class-based component.
 *
 * @param {React.Component} Component - The class-based component to be wrapped.
 * @returns {React.Component} The wrapped component with the `notify` prop.
 */
export function withNotify<T>(
  Component: React.ComponentType<T & WithNotifyProps>,
): React.ComponentType<T> {
  return function WrappedWithNotify(props) {
    const { notify } = useNotification();
    return <Component {...props} notify={notify} />;
  };
}
