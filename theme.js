/* ========= GRIFFITH GLOBAL THEME ========= */

let starColor = "#3aa0ff";

function setTheme(bg, accent, card, sidebarBg, hover){
  const root = document.documentElement;
  root.style.setProperty("--bg", bg);
  root.style.setProperty("--accent", accent);
  root.style.setProperty("--card", card);
  root.style.setProperty("--sidebar-bg", sidebarBg);
  root.style.setProperty("--sidebar-hover", hover);
}

function applyTheme(theme){
  switch(theme){
    case "space":
      setTheme("#0b0f1a","#3aa0ff","rgba(15,20,40,0.95)",
               "linear-gradient(135deg,#0b0f1a,#1a1f2a)","#3aa0ff");
      starColor="#3aa0ff";
      break;

    case "cybergreen":
      setTheme("#001f0f","#00ff99","rgba(0,30,15,0.95)",
               "linear-gradient(135deg,#001f0f,#003320)","#00ff99");
      starColor="#00ff99";
      break;

    case "purple":
      setTheme("#1a001f","#bb00ff","rgba(30,0,60,0.95)",
               "linear-gradient(135deg,#1a001f,#400040)","#bb00ff");
      starColor="#bb00ff";
      break;

    case "ocean":
      setTheme("#001f2f","#00ccff","rgba(0,30,60,0.95)",
               "linear-gradient(135deg,#001f2f,#003b5f)","#00ccff");
      starColor="#00ccff";
      break;

    case "emerald":
      setTheme("#001f1a","#00ff88","rgba(0,35,20,0.95)",
               "linear-gradient(135deg,#001f1a,#003322)","#00ff88");
      starColor="#00ff88";
      break;
  }
}

/* 🔒 Persist theme across ALL pages */
document.addEventListener("DOMContentLoaded",()=>{
  const savedTheme = localStorage.getItem("griffith-theme") || "space";
  applyTheme(savedTheme);

  const selector = document.getElementById("theme");
  if(selector){
    selector.value = savedTheme;
    selector.addEventListener("change",()=>{
      localStorage.setItem("griffith-theme", selector.value);
      applyTheme(selector.value);
    });
  }
});
