/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

export const useSidebar = ({
  sideRef,
  setSideOpen,
}: {
  sideRef: React.MutableRefObject<HTMLDivElement | null>;
  setSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    const closeSide = (e: MouseEvent) => {
      if (!sideRef.current?.contains(e.target as Node)) {
        setSideOpen(false);
      }
    };

    document.addEventListener("mousedown", closeSide);

    return () => {
      document.removeEventListener("mousedown", closeSide);
    };
  }, [setSideOpen, sideRef]);

  return {};
};

// const handleLogin = async () => {
//   const codeVerifier = generateCodeVerifier();
//   const codeChallenge = await generateCodeChallenge(codeVerifier);

//   sessionStorage.setItem("codeVerifier", codeVerifier);

//   window.location.assign(
//     `https://${import.meta.env
//       .VITE_AUTH0_DOMAIN!}/authorize?${makeParamsAuth0Login(codeChallenge)}`
//   );
// };

// const {
//   data: dataLogout,
//   isPending: isPendingLogout,
//   mutate: mutateLogout,
// } = useMutation<{ success: true }>({
//   mutationFn: logoutUserAPI,
//   onSuccess: () => {
//     sessionStorage.removeItem("accessToken");

//     window.location.assign(
//       `https://${
//         import.meta.env.VITE_AUTH0_DOMAIN
//       }/v2/logout?${makeParamsAuth0Logout()}`
//     );
//   },
//   onError: (error) => {
//   },
// });

// const handleLogout = () => {
//   mutateLogout();
// };
