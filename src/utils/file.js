import fs from 'fs';

export const unlink = (path) => {
  if (!path) return;

  fs.unlink(path, function (err) {
    console.error(err);
  });
};
