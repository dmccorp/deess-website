import Image from "next/image";
import { assetHost } from "lib/constants";

function FirstImage({ images }) {
  if (images) {
    const image = images[0].attributes;
    return (
      <Image
        src={`${assetHost}${image.url}`}
        alt={image.alternativeText}
        layout="fill"
        objectFit="cover"
      />
    );
  }
  return null;
}

export default FirstImage;
