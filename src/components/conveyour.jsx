import React, { useContext  } from "react";
import { injectorPosition, ovenPosition, stamperPosition, biscuitSlotsNumber } from "../constants";
import { StoreContext } from "../context/Context";
import "./conveyour.css";
import Biscuit from "./biscuit";
import Dumpster from "./dumpster";
import Injector from "./injector";
import Oven from "./oven";
import Stamper from "./stamper";

const biscuitSlots = [...Array(biscuitSlotsNumber).keys()];
const machineSlots = [...Array(biscuitSlotsNumber - 1).keys()];

const InjectorColumn = () => (
  <td className="injector-column">
    <Injector />
  </td>
);
const StamperColumn = () => (
  <td className="stamper-column">
    <Stamper />
  </td>
);
const OvenColumn = () => (
  <td className="oven-column" colSpan="2">
    <Oven />
  </td>
);

const components = {
  [injectorPosition]: InjectorColumn,
  [stamperPosition]: StamperColumn,
  [ovenPosition[0]]: OvenColumn,
};

const MachineBlock = (_, index) => {
  const Component = components[index];
  if (Component) {
    return <Component key={index} />;
  }
  return <td key={index} className="step"></td>;
};

const BiscuitHolder = ({ biscuit }) => {
  return <td className="step">{biscuit && <Biscuit {...biscuit} />}</td>;
};

const Belt = () => {
  const { conveyourItems } = useContext(StoreContext);
  return (
    <tr>
      {biscuitSlots.map((index) => (
        <BiscuitHolder
          lastItem={index + 1 === biscuitSlots.length}
          key={index}
          biscuit={conveyourItems[index]}
        />
      ))}
    </tr>
  );
};

const Conveyour = () => {
  return (
    <div className="conveyour">
      <table>
        <tbody>
          <tr>{machineSlots.map(MachineBlock)}</tr>
          <Belt />
        </tbody>
      </table>
      <Dumpster />
    </div>
  );
};
export default Conveyour;
