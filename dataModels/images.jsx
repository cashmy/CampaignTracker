import PropTypes from "prop-types";

export const imageRecord = {
  id: 0,
  fileName: "", // File name of image ex: image.jp🇬
  fileUrl: "", // Url of image
  altText: "", // Description of image for screen readers
  fileSize: 0, // size of image in bytes
  mimeType: "", // Opt: (jpg, png, gif, etc.)
  lastModified: "", // Date of last modification
  imageType: "i", // i = image, a = avatar, t = token, s = sidebar, b = thumbnail
  userId: 1, // User id of image owner
};

export const imageColumnsDataX = [
  { id: "id", label: "Id", numeric: true },
  { id: "fileName", label: "Name" },
  { id: "fileUrl", label: "Url" },
  { id: "altText", label: "Alt Text" },
  { id: "fileSize", label: "File Size" },
  { id: "mimeType", label: "Image Type" },
  { id: "lastModified", label: "Updated" },
  { id: "imageType", label: "Library" },
];

export const imageColumns = [
  { id: "fileName", label: "Name" },
  { id: "fileUrl", label: "Url" },
  { id: "imageType", label: "Library" },
  { id: "actions", label: "Actions", disableSorting: true },
];

imageRecord.PropTypes = {
  id: PropTypes.number,
  fileName: PropTypes.string,
  fileUrl: PropTypes.string,
  altText: PropTypes.string,
  fileSize: PropTypes.number,
  mimeType: PropTypes.string,
  lastModified: PropTypes.date,
  imageType: PropTypes.string,
  userId: PropTypes.number,
};
