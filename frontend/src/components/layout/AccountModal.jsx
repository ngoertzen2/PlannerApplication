import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserDataContext from "../../../context/UserDataContext";
import { FaUserCircle } from "react-icons/fa";
import API_BASE from "../../constants.js";

const AccountModal = ({ openState, handleClose }) => {

  const { userData, setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  const [currentTheme, setCurrentTheme] = React.useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );

  const themeNames = [
    "light",
    "dark",

    // cool blues and teal
    "sapphire",
    "sand-blue",
    "ivory-teal",
    "teal-charcoal",
    "midnight-lime",

    // deeper dark/cool
    "obsidian-cyan",
    "charcoal-gold",
    "slate-orange",
    "ice-pink",

    // warm neutrals
    "cherry-cream",
    "peach-frost",
    "terracotta",
    "ruby-gold",
    "rose-slate",
    "crimson-charcoal",
    "fire",

    // mixed contrast
    "espresso-cream",
    "cobalt-sunset",
    "ocean-coral",
    "plum-yellow",
    "lavender-dusk",
    "moss-copper",
    "forest-moss",

    // high contrast
    "sage-moon",
    "graphite-violet",
    "neon-duo"
  ];

  const handleSignOut = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      setUserData(null);
      navigate("/login");
      handleClose();

    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };

    if (openState) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => document.removeEventListener("keydown", handleEsc);
  }, [openState, handleClose]);

  const getThemeColors = (theme) => {
    const root = document.documentElement;

    const prev = root.getAttribute("data-theme");
    root.setAttribute("data-theme", theme);

    const styles = getComputedStyle(root);

    const colors = {
      bg: styles.getPropertyValue("--bg").trim(),
      primary: styles.getPropertyValue("--primary").trim(),
    };

    // restore previous theme
    if (prev) root.setAttribute("data-theme", prev);
    else root.removeAttribute("data-theme");

    return colors;
  };

  const themes = themeNames.map((name) => ({
    name,
    ...getThemeColors(name),
  }));

  const handleThemeChange = async (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    setCurrentTheme(theme);

    try {
      await fetch(`${API_BASE}/auth/updateTheme`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ theme }),
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed z-40 inset-0 bg-black/40 transition-opacity duration-300 ${
          openState ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed z-50 top-0 right-0 h-full w-80 bg-[var(--surface-1)] shadow-lg transform transition-transform duration-300 ${
          openState ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full justify-center items-center">
          <h2 className="text-xl text-[var(--text)] font-primary font-bold">Account</h2>
          
          <FaUserCircle className="text-[var(--text-muted)] text-8xl mt-12" />
          <p className="mt-2 text-[var(--text-secondary)]">
            {userData.username}
          </p>

          <button
            className="mt-4 px-4 py-0 text-[var(--danger)] hover:text-[var(--danger-hover)]"
            onClick={handleSignOut}
          >
            Sign Out
          </button>

          <div className="mt-6 w-full">
            <p className="text-[var(--text-muted)] text-sm mb-2">Theme</p>

            <div className="grid grid-cols-4 gap-3">
              {themes.map((t) => (
                <button
                  key={t.name}
                  title={t.name}
                  onClick={() => handleThemeChange(t.name)}
                  className={`w-10 h-10 rounded-lg overflow-hidden border transition ${
                  currentTheme === t.name
                    ? "ring-2 ring-[var(--primary)] border-transparent scale-105"
                    : "border-[var(--border)] hover:scale-105"
                  }`}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      background: `linear-gradient(135deg, ${t.primary} 50%, ${t.bg} 50%)`,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          <button
            className="mt-auto mr-auto px-4 py-0 text-[var(--danger)] hover:text-[var(--danger-hover)]"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountModal