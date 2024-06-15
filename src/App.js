import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import UploadFile from "./UploadFile/UploadFile";

const App = () => {
  return (
      <>
          <Routes>
            <Route path={''} element={<HomePage/>}/>
              <Route path={'/upload'} element={<UploadFile/>}/>
              <Route path={'/check'} element={<UploadFile/>}/>
          </Routes>

      </>
  );
};

export default App;