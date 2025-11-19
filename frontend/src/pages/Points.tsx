import { useEffect, useState } from "react";
import {
  IoStarOutline,
  IoFlameOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import {
  PRIMARY_COLOR,
  LIGHT_GREY,
  SECONDARY_COLOR,
  TEXT_COLOR,
} from "../styles";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import * as OutfitUtils from "../utils/outfitStorage";

export default function Points() {
  const { user } = useAuth();
  const nav = useNavigate();

  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);

  const refreshPoints = () => {
    const data = OutfitUtils.getUserPoints();
    setPoints(data.total);
    setStreak(data.streak);
  };

  useEffect(() => {
    if (!user) {
      nav("/login");
      return;
    }

    refreshPoints();

    const handleStorageUpdate = () => refreshPoints();
    window.addEventListener("storage", handleStorageUpdate);
    window.addEventListener("outfitsUpdated", handleStorageUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
      window.removeEventListener("outfitsUpdated", handleStorageUpdate);
    };
  }, [user]);

  if (!user) return null;

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: LIGHT_GREY,
        minHeight: "calc(100vh - 60px)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: LIGHT_GREY,
          padding: "20px",
          borderRadius: "15px",
          margin: "15px 0",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
          background: `linear-gradient(to right, #00BCD410, ${SECONDARY_COLOR})`,
        }}
      >
        <div
          style={{
            backgroundColor: "#00BCD4",
            padding: "10px",
            borderRadius: "50%",
            marginRight: "15px",
          }}
        >
          <IoStarOutline style={{ color: SECONDARY_COLOR, fontSize: "24px" }} />
        </div>
        <div>
          <span
            style={{ fontSize: "14px", color: "#757575", fontWeight: "500" }}
          >
            Total Points
          </span>
          <p
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "bold",
              color: TEXT_COLOR,
            }}
          >
            {points}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: LIGHT_GREY,
          padding: "20px",
          borderRadius: "15px",
          margin: "15px 0",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
          background: `linear-gradient(to right, #FF980010, ${SECONDARY_COLOR})`,
        }}
      >
        <div
          style={{
            backgroundColor: "#FF9800",
            padding: "10px",
            borderRadius: "50%",
            marginRight: "15px",
          }}
        >
          <IoFlameOutline style={{ color: SECONDARY_COLOR, fontSize: "24px" }} />
        </div>
        <div>
          <span
            style={{ fontSize: "14px", color: "#757575", fontWeight: "500" }}
          >
            Current Streak
          </span>
          <p
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "bold",
              color: TEXT_COLOR,
            }}
          >
            {streak} day{streak !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

=      <div
        style={{
          backgroundColor: SECONDARY_COLOR,
          borderRadius: "15px",
          padding: "20px",
          marginTop: "30px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        }}
      >
        <h3
          style={{
            color: PRIMARY_COLOR,
            fontWeight: "600",
            marginBottom: "15px",
          }}
        >
          <IoTrophyOutline
            style={{ marginRight: "8px", verticalAlign: "middle" }}
          />
          How to Earn Points
        </h3>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            color: TEXT_COLOR,
          }}
        >
          <li style={{ marginBottom: "8px" }}>
            • Save a new outfit:{" "}
            <span style={{ fontWeight: "bold", color: PRIMARY_COLOR }}>
              +3 points
            </span>
          </li>
          <li style={{ marginBottom: "8px" }}>
            • Log an outfit each day:{" "}
            <span style={{ fontWeight: "bold", color: PRIMARY_COLOR }}>
              +1 daily bonus
            </span>
          </li>
          <li>
            • Keep your streak going by saving outfits on consecutive days!
          </li>
        </ul>
      </div>
    </div>
  );
}
