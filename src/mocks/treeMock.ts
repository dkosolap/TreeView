import { FolderResponse, FileResponse } from "src/types";

export const treeMockResponse: Array<FolderResponse | FileResponse> = ([
  {
    "name": "Root",
    "id": 1,
    "parentId": null,
    "nodeType": 'Folder',
    "isEmpty": false,
    "children": [
      {
        "name": "With depth 5",
        "id": 2,
        "parentId": 1,
        "permission": 3,
        "createdAt": "2023-04-01T00:00:00Z",
        "modifiedAt": "2023-04-01T00:00:00Z",
        "nodeType": 'Folder',
        "isEmpty": false,
        "children": [
          {
            "name": "Folder 3",
            "id": 3,
            "parentId": 2,
            "permission": 3,
            "createdAt": "2023-04-01T00:00:00Z",
            "modifiedAt": "2023-04-01T00:00:00Z",
            "nodeType": 'Folder',
            "isEmpty": false,
            "children": [
              {
                "name": "File 7",
                "id": 7,
                "parentId": 6,
                "type": "File",
                "permission": 3,
                "createdAt": "2023-04-01T00:00:00Z",
                "modifiedAt": "2023-04-01T00:00:00Z",
                "url": 'asdasd',
                "nodeType": 'File'
              }
            ]
          }
        ]
      },
      {
        "name": "Empty folder",
        "id": 11,
        "parentId": 1,
        "permission": 3,
        "createdAt": "2023-04-01T00:00:00Z",
        "modifiedAt": "2023-04-01T00:00:00Z",
        "nodeType": 'Folder',
        "isEmpty": true,
        children: []
      },
      {
        "name": "No premission",
        "id": 12,
        "parentId": 1,
        "permission": 0,
        "createdAt": "2023-04-01T00:00:00Z",
        "modifiedAt": "2023-04-01T00:00:00Z",
        "nodeType": 'Folder',
        "isEmpty": false,
        children: [{
          "name": "File 8",
          "id": 8,
          "parentId": 6,
          "type": "File",
          "permission": 3,
          "createdAt": "2023-04-01T00:00:00Z",
          "modifiedAt": "2023-04-01T00:00:00Z",
          "url": 'asdasd',
          "nodeType": 'File'
        }]
      },
    ],
    "permission": 3,
    "createdAt": "2023-04-01T00:00:00Z",
    "modifiedAt": "2023-04-01T00:00:00Z"
  },
  {
    "name": "Video",
    "id": 22,
    "parentId": null,
    "type": "Video",
    "permission": 3,
    "createdAt": "2023-04-01T00:00:00Z",
    "modifiedAt": "2023-04-01T00:00:00Z",
    "url": 'asdasd',
    "nodeType": 'File'
  },
  {
    "name": "Audio",
    "id": 23,
    "parentId": null,
    "type": "Sound",
    "permission": 3,
    "createdAt": "2023-04-01T00:00:00Z",
    "modifiedAt": "2023-04-01T00:00:00Z",
    "url": 'asdasd',
    "nodeType": 'File'
  },
  {
    "name": "Image",
    "id": 24,
    "parentId": null,
    "type": "Image",
    "permission": 0,
    "createdAt": "2023-04-01T00:00:00Z",
    "modifiedAt": "2023-04-01T00:00:00Z",
    "url": 'asdasd',
    "nodeType": 'File'
  }
]);
