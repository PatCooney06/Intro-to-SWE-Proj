import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import * as OutfitUtils from "../utils/outfitStorage";
import { IoLogOutOutline, IoHeart } from "react-icons/io5";
import { SECONDARY_COLOR, PRIMARY_COLOR, LIGHT_GREY, TEXT_COLOR, BORDER_GREY } from "../styles";

interface FavoriteOutfitCardProps {
  outfit: OutfitUtils.SavedOutfit;
}

const FavoriteOutfitCard: React.FC<FavoriteOutfitCardProps> = ({ outfit }) => {
  const date = new Date(outfit.timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      style={{
        flexShrink: 0,
        width: "100px",
        border: `1px solid ${BORDER_GREY}`,
        borderRadius: "10px",
        padding: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        backgroundColor: SECONDARY_COLOR,
      }}
    >
      <div style={{ display: "flex", gap: "2px", justifyContent: "center" }}>
        {[outfit.top, outfit.bottom, outfit.shoe].map((item, index) => (
          <div
            key={index}
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: LIGHT_GREY,
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "8px",
              fontWeight: "600",
              color: TEXT_COLOR,
            }}
          >
            {item.name.charAt(0)}
          </div>
        ))}
      </div>
      <p style={{ margin: "5px 0 0", fontSize: "10px", color: "#757575", textAlign: "center" }}>
        {date}
      </p>
    </div>
  );
};

export default function Profile() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [favoriteOutfits, setFavoriteOutfits] = useState<OutfitUtils.SavedOutfit[]>([]);

  const loadProfileData = () => {
    const latestPoints = OutfitUtils.getUserPoints();
    setPoints(latestPoints.total);
    setStreak(latestPoints.streak);
    setFavoriteOutfits(OutfitUtils.getFavoriteOutfits());
  };


  useEffect(() => {
    if (!user) {
      nav("/login");
      return;
    }

    loadProfileData();

    const handleUpdate = () => {
      loadProfileData();
    };

    window.addEventListener("storage", handleUpdate);
    window.addEventListener("outfitsUpdated", handleUpdate);
    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("outfitsUpdated", handleUpdate);
    };
  }, [user]);

  if (!user) return null;

  return (
    <div
      style={{
        backgroundColor: LIGHT_GREY,
        minHeight: "calc(100vh - 60px)",
        padding: "20px 0 30px 0",
      }}
    >
      <div
        style={{
          backgroundColor: SECONDARY_COLOR,
          borderRadius: "0 0 15px 15px",
          padding: "25px 25px 40px 25px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <div
            style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                backgroundColor: PRIMARY_COLOR,
                color: "white",
                fontSize: "36px",
                fontWeight: "bold",
                margin: "0 auto 15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `3px solid ${PRIMARY_COLOR}` 
            }}
        >
            {user.name ? user.name.charAt(0).toUpperCase() : "?"}
        </div>
        
        <h2 style={{ margin: "0 0 5px", color: TEXT_COLOR, fontWeight: "600" }}>
          {user.name || "Unknown User"} 
        </h2>
        <p style={{ margin: 0, color: "#777", fontSize: "14px" }}>
            {user.email}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
            <div>
                <h4 style={{ margin: 0, color: PRIMARY_COLOR }}>⭐ Points</h4>
                <p style={{ margin: 0, fontSize: "22px", fontWeight: "bold" }}>{points}</p>
            </div>
            <div>
                <h4 style={{ margin: 0, color: PRIMARY_COLOR }}>🔥 Streak</h4>
                <p style={{ margin: 0, fontSize: "22px", fontWeight: "bold" }}>
                  {streak} day{streak !== 1 ? "s" : ""}
                </p>
            </div>
        </div>
        
        <button
          onClick={() => {
            logout();
            nav("/login");
          }}
          style={{
            marginTop: "25px",
            backgroundColor: PRIMARY_COLOR,
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 2px 8px rgba(0, 150, 100, 0.3)"
          }}
        >
          <IoLogOutOutline size={20} />
          Logout
        </button>
      </div>

      <div style={{ padding: "0 20px" }}>
          <h3 style={{ color: TEXT_COLOR, fontWeight: "600", marginBottom: "15px" }}>
              <IoHeart style={{ color: "crimson", marginRight: "8px", verticalAlign: "middle" }} />
              Favorite Outfits
          </h3>

          {favoriteOutfits.length === 0 ? (
              <p style={{ color: "#757575", fontSize: "14px", textAlign: "center", padding: "20px" }}>
                  Tap the heart icon on any outfit in the History tab to add it here!
              </p>
          ) : (
              <div
                  style={{
                      display: "flex",
                      overflowX: "auto",
                      paddingBottom: "10px",
                      gap: "10px",
                      WebkitOverflowScrolling: "touch",
                      msOverflowStyle: 'none', 
                      scrollbarWidth: 'none', 
                  }}
              >
                  {favoriteOutfits.slice().reverse().slice(0, 5).map((outfit) => (
                      <FavoriteOutfitCard key={outfit.id} outfit={outfit} />
                  ))}
              </div>
          )}
      </div>
    </div>
  );
}