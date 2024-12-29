// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { TExplorerItem } from "@/model/Explorer";

// export const initialState: TExplorerItem[] = [
//   {
//     name: "root",
//     treeId: 0.0101,
//     type: "folder",
//     deep: 0,
//     items: [
//       {
//         name: "index.html",
//         treeId: 1.102,
//         type: "file",
//         deep: 1
//       },
//       {
//         name: "App.jsx",
//         treeId: 1.103,
//         type: "file",
//         deep: 1
//       },
//       {
//         name: "utils.js",
//         treeId: 1.104,
//         type: "file",
//         deep: 1
//       },
//       {
//         name: "styles",
//         treeId: 1,
//         type: "folder",
//         deep: 1,
//         items: [
//           {
//             name: "style.css",
//             type: "file",
//             treeId: 2,
//             deep: 2
//           },
//           {
//             name: "style2.css",
//             type: "file",
//             treeId: 2,
//             deep: 2
//           },
//           {
//             name: "styles",
//             treeId: 1,
//             type: "folder",
//             deep: 2,
//             items: [
//               {
//                 name: "styl3.css",
//                 type: "file",
//                 treeId: 2,
//                 deep: 3
//               },
//               {
//                 name: "style4.css",
//                 type: "file",
//                 treeId: 2,
//                 deep: 3
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

/*
const explorerSlice = createSlice({
  name: "explorer",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<AddItemActionType>) => {
      const { treeId, name, type } = action.payload;

      const findAndAddItem = (items: TExplorerItem[], parentId: number) => {
        for (const item of items) {
          if (item.treeId === parentId) {
            // check for duplicate
            if (item.items?.some(item => item.name === name)) {
              alert(`Item "${name}" already exists.`);
              return;
            }

            // Add the new item (folder or file) to its items array
            item.items?.unshift({
              name,
              type,
              items: type === "folder" ? [] : undefined,
              treeId: +Math.random().toFixed(4),
            });
            return;
          } else if (item.items) {
            // Recursively search in nested folders
            findAndAddItem(item.items, parentId);
          }
        }
      };

      findAndAddItem(state, treeId);
    },

    // REMOVE FOLDER OR FILE
    removeItem(state, action: PayloadAction<{ treeId: number }>) {
      const findAndRemoveItem = (items: TExplorerItem[], parentId: number) => {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.treeId === parentId) {
            // Found the parent item, remove it
            items.splice(i, 1);
            return;
          } else if (item.type === "folder" && item.items) {
            // Recursively search in nested folders
            findAndRemoveItem(item.items, parentId);
          }
        }
      };

      findAndRemoveItem(state, action.payload.treeId);
    },
  },
});

export const { addItem, removeItem } = explorerSlice.actions;

export default explorerSlice;
*/