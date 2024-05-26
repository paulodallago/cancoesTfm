import React from "react";
import { Dialog } from "primereact/dialog";
import { eachDayOfInterval } from "date-fns";
import "./styles/DlgEasterEgg.css";

const DlgEasterEgg = (props) => {
  return (
    <Dialog {...props} className="dlgEasterEgg">
      <span>
        Feito por Paulo Henrique Dal Lago, 2024 <br />
      </span>
      <span>
        (SD Dal Lago)
        <br />
      </span>
      <span>
        {
          eachDayOfInterval({ start: new Date(), end: new Date(2025, 0, 10) })
            .length
        }{" "}
        dias fora!
      </span>
    </Dialog>
  );
};

export default DlgEasterEgg;
