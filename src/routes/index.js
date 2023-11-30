import { BrowserRouter, Route, Routes as Switch} from "react-router-dom";

import { MainPage } from "../pages";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="*" element={<MainPage />} />
      </Switch>
    </BrowserRouter>
  );
}