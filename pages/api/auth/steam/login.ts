import passport from "@lib/passport";
import steamRouter from "@lib/steamRouter";
import { NextApiResponse } from "next";

const path = "/api/auth/steam/login";

export default steamRouter
  .use(path, passport.authenticate("steam", { failureRedirect: "/" }))
  .get(path, (_, res: NextApiResponse) => res.redirect("/"));
