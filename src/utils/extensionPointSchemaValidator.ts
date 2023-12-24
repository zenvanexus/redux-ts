export type NavigatorSchema = {
  title: string;
  onClickCallback: number;
  href: string;
  component: string;
  icon: string;
  children: NavigatorSchema[];
  type: string;
  isBeta?: boolean;
};

type UserPreferenceSchema = {
  component: string;
  type: string;
};

type AccountSchema = {
  title: string;
  onClickCallback: number;
  href: string;
  component: string;
  children: AccountSchema[];
  type: string;
};

type FullPageExtensionSchema = {
  title: string;
  onClickCallback: number;
  href: string;
  component: string;
  children: AccountSchema[];
  type: string;
};

type ExtensionSchema =
  | NavigatorSchema
  | UserPreferenceSchema
  | AccountSchema
  | FullPageExtensionSchema;

export default function extensionPointSchemaValidator(
  type: "navigator" | "user_prefs" | "account",
): (content: any) => ExtensionSchema[] {
  switch (type) {
    case "navigator":
      return navigatorExtensionSchemaDecoder;
    case "user_prefs":
      return userPreferenceExtensionSchemaDecoder;
    case "account":
      return accountExtensionSchemaDecoder;
    default:
      return () => [];
  }
}

function navigatorExtensionSchemaDecoder(content: any[]): NavigatorSchema[] {
  if (Array.isArray(content)) {
    return content.map((item: any) => {
      return {
        title: item.title || "",
        href: prepareHref(item.href),
        component: item.component || "",
        onClickCallback: item?.on_click_callback || 0,
        icon: (item.icon && "/api/provider/extension/" + item.icon) || "",
        show: !!item.show,
        children: navigatorExtensionSchemaDecoder(item.children),
        full_page: item.full_page,
        isBeta: item.isBeta ?? false,
        type: "navigator", // Add the 'type' property with the value 'navigator'
      };
    });
  }

  return [];
}

function userPreferenceExtensionSchemaDecoder(
  content: any,
): UserPreferenceSchema[] {
  if (Array.isArray(content)) {
    return content.map((item: any) => {
      return {
        component: item.component || "",
        type: "user_prefs", // Add the 'type' property with the value 'user_prefs'
      };
    });
  }

  return [];
}

function accountExtensionSchemaDecoder(content: any): AccountSchema[] {
  if (Array.isArray(content)) {
    return content.map((item: any) => {
      return {
        title: item.title || "",
        href: prepareHref(item.href),
        component: item.component || "",
        onClickCallback: item?.on_click_callback || 0,
        show: !!item.show,
        children: accountExtensionSchemaDecoder(item.children),
        full_page: item.full_page,
        type: "account", // Add the 'type' property with the value 'account'
      };
    });
  }

  return [];
}

function prepareHref(href: any): string {
  if (href.external) return href.uri || "";

  return "/extension" + (href.uri || "");
}
