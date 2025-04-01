import React, { useContext, useEffect } from "react";
import Tips from "../../../components/Tips/Tips";
import { TipsPageHeaderContext } from "../../../contexts/TipsPageHeaderContext";
import TipsPageHeader from "../../../components/Layout/TipsPageHeader/TipsPageHeader";

const InventoryPage = () => {
  const {
    setCreateBtn,
    setEditBtn,
    setDisplayBtn,
    setCreateUrl,
    setEditUrl,
    setDisplayUrl,
  } = useContext(TipsPageHeaderContext);

  useEffect(() => {
    setCreateBtn("Create Inventory");
    setEditBtn("Edit Inventory");
    setDisplayBtn("Display Inventory");
    setCreateUrl("/createinventory");
    setEditUrl("/editinventory");
    setDisplayUrl("/displayinventory");
  }, []);

  return (
    <>
      <TipsPageHeader />
      <Tips />
    </>
  );
};

export default InventoryPage;
