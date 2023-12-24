import React from "react";

export function NotificationCenterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

export default NotificationCenterProvider;
