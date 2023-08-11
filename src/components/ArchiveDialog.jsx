import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "./Table";
import Filter from "./Filter";
import ClearArchive from "./ClearArchive";
import { context } from "./Layout";

export default function ArchiveDOM({ openArchive, setOpenArchive }) {
  const contextApi = React.useContext(context);
  const {
    archiveValue,
    setArchiveValue,
    setRender,
    unArchiveValue,
    setUnArchiveValue,
  } = contextApi;

  const [searchArchive, setSearchArchive] = useState({
    title: "",
    status: "none",
    priority: "none",
  });

  const handleClose = () => {
    //this part of code hide modal of archive table
    setOpenArchive(false);

    //this part of code manage unArchive remaining value after close tab click without unarchive button click

    localStorage.setItem("archiveLists", JSON.stringify(archiveValue));

    //this part of code empty unArchive value after close tab click;
    setUnArchiveValue([]);
  };
  // this delete function not work in this time after some time use this function for need.
  const onDelete = () => {};

  //this function is clear search field in archive filter
  const onClearSearchArchive = () => {
    // this part of code clear search value in searchArchive state
    setSearchArchive({ title: "", status: "none", priority: "none" });
  };

  // this part of code or function work to set search value in searchArchive state
  const filterChangeArchive = (e) => {
    const { name, value } = e.target;
    setSearchArchive((pre) => ({ ...pre, [name]: value }));
  };

  const onSelectAll = (e, data) => {
    let copyData = [...archiveValue]

    if (e.target.checked) {
      setUnArchiveValue(data)
      localStorage.setItem("archiveLists",JSON.stringify([]))
    } else {
      setUnArchiveValue([])
      localStorage.setItem("archiveLists",JSON.stringify(copyData))
    }
  };

  //this function work in check selection one by one in archive table
  const onSelect = (e, id) => {
    let archiveData = JSON.parse(localStorage.getItem("archiveLists")) || [];

    if (e.target.checked) {
      let obj = archiveData.find((item) => item.id === id); //find data in achiveList using id
      let newArchiveData = archiveData.filter((item) => item.id !== id); //filter remaining item after find id archive data

      setUnArchiveValue((pre) => {
        return [...pre, obj];
      });

      localStorage.setItem("archiveLists", JSON.stringify(newArchiveData));
    } else {
      let arr = unArchiveValue.filter((item) => item.id !== id);
      let obj = unArchiveValue.find((item) => item.id === id);

      localStorage.setItem(
        "archiveLists",
        JSON.stringify([...archiveData, obj])
      );

      setUnArchiveValue(arr);
    }
  };

  const onUnArchive = () => {
    let localTodoData = JSON.parse(localStorage.getItem("todoLists")) || [];

    localStorage.setItem(
      "todoLists",
      JSON.stringify([...localTodoData, ...unArchiveValue])
    ); //working expected part

    setUnArchiveValue([]);

    setOpenArchive(false);
    setRender((pre) => !pre);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={openArchive}
        onClose={handleClose}
      >
        <DialogTitle>Archive Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* ARCHIVE DATA START HERE */}
            <div
              style={{
                border: "1px solid gray",
                borderRadius: "4px",
                marginTop: "10px",
              }}
            >
              <Filter
                search={searchArchive}
                filterChange={filterChangeArchive}
                onClearSearch={onClearSearchArchive}
                archiveStatus={true}
              >
                <ClearArchive
                  isArchiveDialog={true}
                  onUnArchive={onUnArchive}
                />
              </Filter>
              <Table
                archiveStatus={true}
                data={archiveValue}
                onDelete={onDelete}
                search={searchArchive}
                onSelectAll={onSelectAll}
                onSelect={onSelect}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
