/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-11 11:01:55
 * @modify date 2023-03-11 15:47:05
 * @desc [description]
 */

//#region //* Imports
import ImageLibrary from "./ImageLibrary";
import ImagesContextProvider  from "./ImagesContextProvider";
//#endregion

const ImageLibraries = () => {

  return (
    <ImagesContextProvider>
      <ImageLibrary imageType={"i"} />
    </ImagesContextProvider>
  );
};

export default ImageLibraries;
