import { Nunito } from "next/font/google";

/** UI face: body, nav, and buttons. Weights are the ones the scale actually uses. */
export const uiFont = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-ui",
});
