/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-11 11:01:55
 * @modify date 2023-03-13 19:13:39
 * @desc [description]
 */

//#region //* Imports
import ImageLibrary from "./ImageLibrary";
import ImagesContextProvider  from "./ImagesContextProvider";
import { useRouter } from 'next/router'
//#endregion

const ImageLibraries = () => {

  const router = useRouter();
  const { imageType } = router.query;

  return (
    <ImagesContextProvider>
      <ImageLibrary imageType={imageType} />
    </ImagesContextProvider>
  );
};

export default ImageLibraries;
