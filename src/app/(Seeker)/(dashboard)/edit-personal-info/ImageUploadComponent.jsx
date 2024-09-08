import ModalBox from "@/components/ui/CustomModal";
import PrimaryBtn from "@/components/ui/primaryBtn";
import "react-image-crop/dist/ReactCrop.css";
import { useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import { Modal } from "flowbite-react";
import { UploadedImageApi } from "@/modules/services/uploadcv_service";
import { useSession } from "next-auth/react";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const setCanvasPreview = (image, canvas, crop) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No 2d context");
  }

  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  // Calculate the final width and height based on the crop and scaling factors
  const finalWidth = crop.width * scaleX;
  const finalHeight = crop.height * scaleY;

  // Adjust the output width and height, capping them at 150px
  const outputWidth = Math.min(Math.floor(finalWidth * pixelRatio), 150);
  const outputHeight = Math.min(Math.floor(finalHeight * pixelRatio), 150);

  // Set canvas dimensions to the output size
  canvas.width = outputWidth;
  canvas.height = outputHeight;

  // Scale the canvas to match the pixel density and ensure smooth rendering
  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  // Clear any previous drawing on the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calculate the cropped area's top-left corner position
  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  // Draw the cropped image onto the canvas, ensuring the correct positioning
  ctx.drawImage(
    image,
    cropX,
    cropY,
    finalWidth,
    finalHeight,
    0,
    0,
    outputWidth / pixelRatio,
    outputHeight / pixelRatio
  );
};

const ImageCropper = ({ handleSubmit }) => {
  const { data: session } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
      });
      setOpenModal(true);
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const file = useRef(null);
  const fileExplore = () => {
    if (file.current) {
      file.current.click();
    }
  };

  // Helper function to convert data URL to a Blob
  const dataURLToBlob = (dataURL) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const uploadImage = async (dataUrl) => {
    setLoading(true);
    try {
      const formData = new FormData();
      const fileBlob = dataURLToBlob(dataUrl);

      formData.append("imgfile", fileBlob);

      try {
        const data = await UploadedImageApi(session?.user?.Id, formData);
        await handleSubmit({
          ImageUrl: data?.url,
        });
      } catch (e) {
       
      }

      handleClose();
    } catch (err) {
     
      setError("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={file}
        accept="image/*"
        style={{ display: "none" }}
        onChange={onSelectFile}
      />
      <PrimaryBtn
        size="small"
        handleClick={fileExplore}
        text={"Upload Photo"}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <Modal dismissible show={openModal} onClose={handleClose}>
        <Modal.Body className="rounded-[30px]">
          {imgSrc && (
            <div className="flex flex-col items-center">
              <ReactCrop
                crop={crop}
                onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                circularCrop
                keepSelection
                aspect={ASPECT_RATIO}
                minWidth={MIN_DIMENSION}
              >
                <img
                  ref={imgRef}
                  src={imgSrc}
                  alt="Upload"
                  style={{ maxHeight: "50vh" }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
              <button
                className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
                onClick={() => {
                  setCanvasPreview(
                    imgRef.current, // HTMLImageElement
                    previewCanvasRef.current, // HTMLCanvasElement
                    convertToPixelCrop(
                      crop,
                      imgRef.current.width,
                      imgRef.current.height
                    )
                  );
                  const dataUrl = previewCanvasRef.current.toDataURL();
                  uploadImage(dataUrl); // Upload image to API
                }}
                disabled={loading}
              >
                {loading ? "Uploading..." : "Crop & Upload Image"}
              </button>
            </div>
          )}

          {crop && (
            <canvas
              ref={previewCanvasRef}
              className="mt-4"
              style={{
                display: "none",
                border: "1px solid black",
                objectFit: "contain",
                width: 150,
                height: 150,
              }}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ImageCropper;
