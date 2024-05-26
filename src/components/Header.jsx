import { Button } from "primereact/button";
import React, { useState } from "react";
import DlgAddCancao from "./DlgAddCancao";
import "./styles/Header.css";
import DlgEasterEgg from "./DlgEasterEgg";

const Header = () => {
  const [dlgVisible, setDlgVisible] = useState(false);
  const [dlgEasterEggVisible, setDlgEasterEggVisible] = useState(false);

  return (
    <div className="header">
      <div
        className="headerText"
        onDoubleClick={() => setDlgEasterEggVisible(true)}
      >
        <span className="textSpan">Canções TFM</span>
      </div>

      <Button onClick={() => setDlgVisible(true)}>+</Button>
      <DlgAddCancao visible={dlgVisible} onHide={() => setDlgVisible(false)} />
      <DlgEasterEgg
        visible={dlgEasterEggVisible}
        onHide={() => setDlgEasterEggVisible(false)}
      />
    </div>
  );
};

export default Header;
