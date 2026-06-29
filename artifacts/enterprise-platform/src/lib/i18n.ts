export const translations = {
  EN: {
    Overview: "Overview",
    Workspace: "AI Workspace",
    Departments: "Departments",
    Approvals: "Approvals",
    Knowledge: "Knowledge",
    Reports: "Reports",
    Security: "Security",
    Logout: "Logout",
  },
  AR: {
    Overview: "نظرة عامة",
    Workspace: "مساحة الذكاء",
    Departments: "الأقسام",
    Approvals: "الموافقات",
    Knowledge: "المعرفة",
    Reports: "التقارير",
    Security: "الأمن",
    Logout: "خروج",
  },
  ES: {
    Overview: "Resumen",
    Workspace: "Espacio IA",
    Departments: "Departamentos",
    Approvals: "Aprobaciones",
    Knowledge: "Conocimiento",
    Reports: "Informes",
    Security: "Seguridad",
    Logout: "Cerrar sesión",
  },
  NL: {
    Overview: "Overzicht",
    Workspace: "AI-werkruimte",
    Departments: "Afdelingen",
    Approvals: "Goedkeuringen",
    Knowledge: "Kennis",
    Reports: "Rapporten",
    Security: "Beveiliging",
    Logout: "Uitloggen",
  },
  FR: {
    Overview: "Vue d'ensemble",
    Workspace: "Espace IA",
    Departments: "Départements",
    Approvals: "Approbations",
    Knowledge: "Connaissance",
    Reports: "Rapports",
    Security: "Sécurité",
    Logout: "Déconnexion",
  }
} as const;

export type Language = keyof typeof translations;
