import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Suspense, lazy } from "react";

const NoteForm = lazy(() => import("Components/NoteForm/index.js"));
const NoteList = lazy(() => import("Components/ListNote/index.js"));
const Routes = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Switch>
          <Route path="/notes" component={NoteList} />
          <Route path="/notesForm/:id" component={NoteForm} />
          <Route path="/notesForm" component={NoteForm} />
          <Route path="/archived" component={NoteList} />
          <Route path="*">
            <Redirect to="/notes" />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
