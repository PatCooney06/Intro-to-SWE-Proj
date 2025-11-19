import React, { useState } from "react";
import { globalStyles, PRIMARY_COLOR, BORDER_GREY, LIGHT_GREY, TEXT_COLOR } from "../styles";
import * as OutfitUtils from "../utils/outfitStorage";

const mockItems = {
  tops: [
    { id: 1, name: "Classic White Tee", imgUrl: "/assets/tee_white.jpg" },
    { id: 2, name: "Navy Polo Shirt", imgUrl: "/assets/polo_navy.jpg" },
    { id: 3, name: "Grey Sweater", imgUrl: "/assets/sweater_grey.jpg" },
  ] as OutfitUtils.ClothingItem[],
  bottoms: [
    { id: 4, name: "Dark Wash Denim", imgUrl: "/assets/denim_dark.jpg" },
    { id: 5, name: "Khaki Chinos", imgUrl: "/assets/chinos_khaki.jpg" },
  ] as OutfitUtils.ClothingItem[],
  shoes: [
    { id: 6, name: "Fashion Sneakers", imgUrl: "/assets/sneakers.jpg" },
    { id: 7, name: "Leather Loafers", imgUrl: "/assets/loafers.jpg" },
    { id: 8, name: "Running Shoes", imgUrl: "/assets/running_shoes.jpg" },
  ] as OutfitUtils.ClothingItem[],
};

interface CategoryCardProps {
  title: keyof typeof mockItems;
  items: OutfitUtils.ClothingItem[];
  currentIndex: number;
  setIndex: (newIndex: number) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, items, currentIndex, setIndex }) => {
  const currentItem = items[currentIndex];

  const navigateItem = (direction: 1 | -1) => {
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = items.length - 1;
    else if (newIndex >= items.length) newIndex = 0;
    setIndex(newIndex);
  };

  return (
    <div style={{ flexShrink: 0, width: "320px", margin: "0 10px" }}>
      <h3 style={{ textAlign: "center", textTransform: "uppercase", color: TEXT_COLOR, marginBottom: "15px" }}>
        {title}
      </h3>
      <div
        style={{
          position: "relative",
          height: "200px",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          backgroundColor: LIGHT_GREY,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          color: TEXT_COLOR,
        }}
      >
        {currentItem.name}
        <button
          onClick={() => navigateItem(-1)}
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)",
            color: "white",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            lineHeight: "30px",
            fontSize: "18px",
            zIndex: 10,
          }}
        >
          &lt;
        </button>
        <button
          onClick={() => navigateItem(1)}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)",
            color: "white",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            lineHeight: "30px",
            fontSize: "18px",
            zIndex: 10,
          }}
        >
          &gt;
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        {items.map((_, index) => (
          <span
            key={index}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: index === currentIndex ? PRIMARY_COLOR : BORDER_GREY,
              margin: "0 4px",
              transition: "background-color 0.3s",
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [shoeIndex, setShoeIndex] = useState(0);

  const handleSaveOutfit = () => {
    const newOutfit = {
      top: mockItems.tops[topIndex],
      bottom: mockItems.bottoms[bottomIndex],
      shoe: mockItems.shoes[shoeIndex],
      timestamp: new Date().toISOString(),
    };

    OutfitUtils.saveNewOutfit(newOutfit);

    window.dispatchEvent(new Event("outfitsUpdated"));

    alert("Outfit Saved! Check your History and Points.");
  };

  return (
    <div style={{ paddingTop: "30px", paddingBottom: "30px", backgroundColor: LIGHT_GREY, minHeight: "calc(100vh - 120px)" }}>
      <h2 style={{ color: TEXT_COLOR, marginBottom: "20px", textAlign: "center" }}>👕 Your Outfits</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          overflowX: "auto",
          padding: "0 20px",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          gap: "20px",
        }}
      >
        <CategoryCard title="tops" items={mockItems.tops} currentIndex={topIndex} setIndex={setTopIndex} />
        <CategoryCard title="bottoms" items={mockItems.bottoms} currentIndex={bottomIndex} setIndex={setBottomIndex} />
        <CategoryCard title="shoes" items={mockItems.shoes} currentIndex={shoeIndex} setIndex={setShoeIndex} />
      </div>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button
          onClick={handleSaveOutfit}
          style={{
            ...globalStyles.button,
            maxWidth: "300px",
            margin: 0,
            padding: "18px 30px",
            backgroundColor: PRIMARY_COLOR,
            boxShadow: `0 4px 10px rgba(0, 200, 83, 0.4)`,
          }}
        >
          Save Outfit
        </button>
      </div>
    </div>
  );
}
