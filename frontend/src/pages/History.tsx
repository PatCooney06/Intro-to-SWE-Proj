import React, { useEffect, useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { LIGHT_GREY, TEXT_COLOR, SECONDARY_COLOR, BORDER_GREY } from "../styles";
import * as OutfitUtils from "../utils/outfitStorage";

const SavedOutfitCard: React.FC<{
  outfit: OutfitUtils.SavedOutfit;
  onToggleFavorite: (id: string) => void;
}> = ({ outfit, onToggleFavorite }) => {
  const isFavorite = outfit.isFavorite;

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        overflow: "hidden",
        border: `1px solid ${BORDER_GREY}`,
      }}
    >
      <div style={{ 
          padding: "15px", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: LIGHT_GREY,
          borderRight: `1px solid ${BORDER_GREY}`
      }}>
        <p style={{ 
            fontSize: "12px", 
            color: SECONDARY_COLOR, 
            fontWeight: "bold", 
            textAlign: "center" 
        }}>
          {new Date(outfit.timestamp).toLocaleDateString()}
        </p>
        <button
          onClick={() => onToggleFavorite(outfit.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "5px",
          }}
        >
          {isFavorite ? (
            <IoHeartSharp style={{ color: "crimson", fontSize: "24px" }} />
          ) : (
            <IoHeartOutline style={{ color: "#a0a0a0", fontSize: "24px" }} />
          )}
        </button>
      </div>

      <div style={{ display: "flex", flexGrow: 1, padding: "10px", gap: "10px", alignItems: "center", justifyContent: "space-around" }}>
        {[outfit.top, outfit.bottom, outfit.shoe].map((item, index) => (
          <div key={index} style={{ textAlign: "center", maxWidth: "80px" }}>
            <img
              src={item.imgUrl}
              alt={item.name}
              style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
            />
            <p style={{ fontSize: "10px", color: TEXT_COLOR, marginTop: "5px" }}>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function History() {
  const [outfits, setOutfits] = useState<OutfitUtils.SavedOutfit[]>([]);

  const loadOutfits = () => setOutfits(OutfitUtils.getSavedOutfits());

  useEffect(() => {
    loadOutfits();

    const updateHandler = () => loadOutfits();
    window.addEventListener(OutfitUtils.OUTFITS_UPDATED_EVENT, updateHandler);

    return () => {
      window.removeEventListener(OutfitUtils.OUTFITS_UPDATED_EVENT, updateHandler);
    };
  }, []);

  const handleToggleFavorite = (id: string) => {
    OutfitUtils.toggleOutfitFavorite(id);
    loadOutfits(); 
    window.dispatchEvent(new Event(OutfitUtils.OUTFITS_UPDATED_EVENT));
  };

  return (
    <div style={{ padding: "20px", backgroundColor: LIGHT_GREY, minHeight: "calc(100vh - 60px)" }}>
      <h2
        style={{
          color: TEXT_COLOR,
          fontWeight: "600",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        📜 Your Saved Outfit Combinations
      </h2>

      {outfits.length === 0 ? (
        <p style={{ textAlign: "center", color: "#757575", marginTop: "40px" }}>
          You haven't saved any outfits yet. Start creating them on the Home page!
        </p>
      ) : (
        <div style={{ display: "grid", gap: "10px", maxWidth: "400px", margin: "0 auto" }}>
          {outfits.slice().reverse().map((outfit) => ( 
            <SavedOutfitCard key={outfit.id} outfit={outfit} onToggleFavorite={handleToggleFavorite} />
          ))}
        </div>
      )}
    </div>
  );
}