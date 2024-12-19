// photoData.js

const importAll = (r) => {
    return r.keys().map((fileName) => {
      const id = fileName.replace('./', '').split('.')[0]; // Use the filename as ID
      return { id, src: r(fileName), alt: `Photo ${id}` };
    });
  };
  
  // Adjust the regex to capture various image formats
  const group1Images = importAll(require.context('../../images/supreet-ing', false, /\.(png|jpe?g|jpg|gif|svg|bmp|tiff|webp)$/));
  const group2Images = importAll(require.context('../../images', false, /\.(png|jpe?g|jpg|gif|svg|bmp|tiff|webp)$/));
  
  const photoGroups = [
    {
      title: "INAUGURATION",
      description: "This is the first group of images.",
      images: group1Images,
    },
  ];
  
  export default photoGroups;
  