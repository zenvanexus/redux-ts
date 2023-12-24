import { useRouter } from "next/navigation";
import React from "react";

export default function LoginPage() {
  const router = useRouter();

  React.useEffect(() => {
    const isAuthenticated = false;

    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, []);

  return <div></div>;
}

export async function getServerSideProps(context) {
  // Check your authentication status
  const isAuthenticated = /* Your authentication check logic */ false;

  // If authenticated, redirect to another page
  if (isAuthenticated) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  // If not authenticated, continue rendering the page
  return {
    props: {}, // You can also pass initial props here
  };
}
