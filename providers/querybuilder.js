// components/DatabaseBuilder.js

import React, { useState } from "react";
import Table from "../components/Table"; // Assuming the Table component is in the same directory

export default function DatabaseBuilder() {
  const [tables, setTables] = useState([]);
  const [relationships, setRelationships] = useState([]);

  const addTable = () => {
    const newTable = {
      id: tables.length + 1,
      name: `Table${tables.length + 1}`,
    };
    setTables([...tables, newTable]);
  };

  const addRelationship = (sourceTableId, targetTableId) => {
    const newRelationship = {
      id: relationships.length + 1,
      sourceTableId,
      targetTableId,
    };
    setRelationships([...relationships, newRelationship]);
  };

  const removeTable = (tableId) => {
    setTables(tables.filter((table) => table.id !== tableId));
    setRelationships(
      relationships.filter(
        (rel) => rel.sourceTableId !== tableId && rel.targetTableId !== tableId
      )
    );
  };

  return (
    <div>
      <h1>Database Builder</h1>
      <button onClick={addTable}>Add Table</button>

      <div style={{ display: "flex", gap: "20px" }}>
        {tables.map((table) => (
          <Table
            key={table.id}
            table={table}
            onRemove={() => removeTable(table.id)}
            onAddRelationship={(targetTableId) =>
              addRelationship(table.id, targetTableId)
            }
            tables={tables} // Pass the tables array to the Table component
          />
        ))}
      </div>
    </div>
  );
}
