/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PROPERTY_SERVICE } from '@/services/property';
import { PropertyFormData } from '@/types/property';
import { BsHouseCheck } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight, FaBookmark, FaMapMarkerAlt } from 'react-icons/fa';

const chunkArray = (arr: string[], size: number): string[][] => {
  const chunks: string[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const chunkInfoArray = (arr: any[], size: number): any[][] => {
  const chunks: any[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

// const PropertyDetailPage = () => {
//   const { propertyId } = useParams();
//   const [property, setProperty] = useState<PropertyFormData | null>(null);

//   useEffect(() => {
//     if (propertyId) {
//       PROPERTY_SERVICE.getPropertyById(propertyId).then((res: any) =>
//         setProperty(res.data)
//       );
//     }
//   }, [propertyId]);

//   if (!property) return <div className="mt-24 text-center">Loading...</div>;

//   return (
//     <div className="mt-24 p-8">
//       <h1 className="text-3xl font-semibold mb-4">{property.title}</h1>
//       <p className="mb-2">₦{property.price.toLocaleString()}</p>
//       <p>{property.description}</p>
//     </div>
//   );
// };

// export default PropertyDetailPage;

const PropertyDetailPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { propertyId } = useParams();
  const [property, setProperty] = useState<PropertyFormData | null>(null);

  const featureChunks = property?.features ? chunkArray(property.features, 5) : [];


  const media = property?.media || [];

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % media.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  useEffect(() => {
    if (propertyId) {
      PROPERTY_SERVICE.getPropertyById(propertyId).then((res: any) =>
        setProperty(res.data)
    );
    }
    // setProperty(dummyProperty)
  }, [propertyId]);


  const infoItems = [
    { label: "Current Price", value: `₦${property?.price.toLocaleString()}` },
    property?.oldPrice && {
      label: "Old Price",
      value: `₦${property.oldPrice.toLocaleString()}`,
      className: "line-through text-red-500"
    },
    {
      label: "Land Area",
      value: `${property?.landArea} ${property?.landAreaMeasurement}`
    },
    { label: "Address", value: property?.address },
    property?.bedroom && { label: "Bedrooms", value: property?.bedroom },
    {
      label: "Parking Spaces",
      value: property?.garagesOrParkingSpaces
    }
  ].filter(Boolean); // Removes falsy items (like if oldPrice is null)

  const infoChunks = chunkInfoArray(infoItems, 5);
  // if (!property) return <div className="mt-24 text-center">Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main Page */}
      <div className="main-page md:col-span-2 flex flex-col gap-4">
        {/* Images */}
        <div className="prop-images flex flex-col mb-4 gap-4 shadow-lg">
          <div className="relative rounded-xl">
            <img
              src={media[currentImageIndex]?.url}
              alt="Main"
              className="w-full h-[36rem] object-cover rounded-xl"
            />
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-2 overflow-x-auto rounded">
            {media.map((item, index) => (
              <img
                key={index}
                src={item.url}
                alt={`Thumbnail ${index}`}
                className={`h-40 w-40 object-cover rounded-lg shadow-lg cursor-pointer border-2 ${index === currentImageIndex ? 'border-primary-green' : 'border-transparent'
                  }`}
                onClick={() => handleImageChange(index)}
              />
            ))}
          </div>

        </div>

        {/* Main Details */}
        {/* Top shadow overlay */}
        {/* <div className="relative top-0 left-0 w-full h-4 bg-gradient-to-b from-black/10 to-transparent pointer-events-none z-10 rounded-t" /> */}
        <div className="prop-main-details shadow-md mb-4 rounded p-4">
          <div className="prop-title flex justify-between">
            <h1 className="text-3xl font-semibold mb-4">{property?.title}</h1>
            <div className="views flex flex-col justify-center items-center">
              <FaBookmark className='text-primary-green' />
              <h3>10 views</h3>

            </div>
          </div>
          <div className="flex items-center text-gray-600 gap-2 mb-2">
            <FaMapMarkerAlt />
            <span>{property?.location}</span>
          </div>
          <p className="text-2xl font-bold text-primary-green mb-2">
            ₦{property?.price.toLocaleString()}
          </p>
          <p className="text-gray-700">{property?.description}</p>
          <div className="prop-main-type mt-4">
            <BsHouseCheck className='text-5xl' />
            <h2 className='font-extrabold'>{property?.propertyType}</h2>
          </div>
        </div>

        {/* Main Details 2 */}
        <div className="prop-info-summary shadow-md mb-4 rounded p-4 bg-white">
          <h2 className="text-xl font-semibold mb-4">Quick Info</h2>
          <div className="flex gap-8 text-gray-700 text-sm flex-wrap">
            {infoChunks.map((chunk, colIndex) => (
              <div key={colIndex} className="space-y-2 min-w-[12rem]">
                {chunk.map((item, i) => (
                  <div key={i}>
                    <span className="font-semibold">{item.label}:</span>{" "}
                    <span className={item.className || ""}>{item.value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>


        {/* Features */}
        <div className="prop-features shadow-md rounded p-4 mb-4 bg-white">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <div className="flex flex-wrap gap-8">
            {featureChunks.map((chunk, colIndex) => (
              <ul key={colIndex} className="list-disc pl-5 space-y-1">
                {chunk.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>


        {/* Agent & Availability */}
        <div className="prop-agent-availabiliy shadow-md rounded p-4 mb-4 bg-white">
          <p className="text-sm text-gray-600">{property?.status}!!!</p>
          <p className="text-sm text-gray-600">{property?.title}</p>
          <p className="text-sm text-gray-600">Location: {property?.location}</p>
          <p className="text-sm text-gray-600">Agency: { }</p>
          <p className="text-sm text-gray-600">Legal: { }</p>
          <p className="text-sm text-gray-600">Caution: { }</p>
          <p className="text-sm font-semibold">Agent Info</p>
          <p className="text-sm text-gray-600">Display Option: {property?.agentDisplayOption}</p>
          <p className="text-sm text-gray-600">Review Notes: {property?.reviewNotes}</p>
        </div>
      </div>

      {/* Side Page (if needed for future use) */}
      <div className="side-page shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Side Content</h2>
        {/* <p>This section can be used for related properties, ads, or booking info.</p> */}
      </div>
    </div>
  );
};

export default PropertyDetailPage;

