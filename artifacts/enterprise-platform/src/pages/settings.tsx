import React from "react";
import {
  User,
  Building2,
  Bot,
  Bell,
  Globe,
  Shield,
  PlugZap,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import type { Language } from "@/lib/i18n";

export default function Settings() {
  const [tab, setTab] = React.useState("profile");
  const [profilePhoto, setProfilePhoto] =
  React.useState<string | null>(null);

const initialProfile = {

  fullName: "John Doe",

  email: "john.doe@nexus-ai.com",

  department: "Operations",

  jobTitle: "Operations Manager",

  phone: "+966 50 123 4567",

  timeZone: "Asia/Riyadh",

};

const [profile, setProfile] =
  React.useState(initialProfile);

const [savingProfile, setSavingProfile] =
  React.useState(false);

const [profileSaved, setProfileSaved] =
  React.useState(false);

const [companyLogo, setCompanyLogo] =
  React.useState<string | null>(null);

const initialCompany = {

  companyName: "Nexus AI",

  website: "https://nexus-ai.com",

  country: "Saudi Arabia",

  timeZone: "Asia/Riyadh",

  currency: "SAR",

  supportEmail: "support@nexus-ai.com",

};

const [company, setCompany] =
  React.useState(initialCompany);

const [savingCompany, setSavingCompany] =
  React.useState(false);

const [companySaved, setCompanySaved] =
  React.useState(false);

/* ---------------- AI Configuration ---------------- */

const initialAIConfiguration = {

  provider: "OpenAI",

  model: "gpt-5.5",

  temperature: "0.7",

  maxTokens: "4096",

  endpoint: "https://api.openai.com/v1",

  apiKey: "sk-********************************",

};

const [aiConfiguration, setAiConfiguration] =
  React.useState(initialAIConfiguration);

const [savingAI, setSavingAI] =
  React.useState(false);

const [testingAI, setTestingAI] =
  React.useState(false);

const [aiSaved, setAiSaved] =
  React.useState(false);

const [aiConnected, setAiConnected] =
  React.useState(true);

const [showApiKey, setShowApiKey] =
  React.useState(false);

/* ---------------- Notifications ---------------- */

const initialNotifications = {

  email: true,

  push: true,

  sms: false,

  approvals: true,

  workflow: true,

  security: true,

};

const [notifications, setNotifications] =
  React.useState(initialNotifications);

const [savingNotifications, setSavingNotifications] =
  React.useState(false);

const [notificationsSaved, setNotificationsSaved] =
  React.useState(false);

/* ---------------- Appearance ---------------- */

const { t, lang, setLang } = useLanguage();

const initialAppearance = {

  theme: "dark",

  language: lang,

};

const [appearance, setAppearance] =
  React.useState(initialAppearance);

const [savingAppearance, setSavingAppearance] =
  React.useState(false);

const [appearanceSaved, setAppearanceSaved] =
  React.useState(false);

/* ---------------- Security ---------------- */

const initialSecurity = {

  currentPassword: "",

  newPassword: "",

  confirmPassword: "",

};

const [security, setSecurity] =
  React.useState(initialSecurity);

const [savingSecurity, setSavingSecurity] =
  React.useState(false);

const [securitySaved, setSecuritySaved] =
  React.useState(false);

const [securityError, setSecurityError] =
  React.useState("");

/* ---------------- Integrations ---------------- */

const initialIntegrations = [

  { name: "OpenAI", connected: true },

  { name: "Microsoft 365", connected: true },

  { name: "Google Workspace", connected: true },

  { name: "Slack", connected: false },

  { name: "GitHub", connected: true },

  { name: "Jira", connected: false },

  { name: "SAP", connected: false },

  { name: "Oracle", connected: false },

];

const [integrations, setIntegrations] =
  React.useState(initialIntegrations);

const [loadingIntegration, setLoadingIntegration] =
  React.useState<string | null>(null);

const [integrationUpdated, setIntegrationUpdated] =
  React.useState<string | null>(null);
  const tabs = [
  { id: "profile", label: t.Profile, icon: User },
  { id: "company", label: t.Company, icon: Building2 },
  { id: "ai", label: t.AIConfiguration, icon: Bot },
  { id: "notifications", label: t.NotificationsSettings, icon: Bell },
  { id: "appearance", label: t.AppearanceLanguage, icon: Globe },
  { id: "security", label: t.SecuritySettings, icon: Shield },
  { id: "integrations", label: t.Integrations, icon: PlugZap },
];
const handleSaveProfile = () => {

  setSavingProfile(true);

  setProfileSaved(false);

  setTimeout(() => {

    setSavingProfile(false);

    setProfileSaved(true);

    setTimeout(() => {

      setProfileSaved(false);

    }, 3000);

  }, 1500);

};

const handleResetProfile = () => {

  setProfile(initialProfile);

};

const handleSaveCompany = () => {

  setSavingCompany(true);

  setCompanySaved(false);

  setTimeout(() => {

    setSavingCompany(false);

    setCompanySaved(true);

    setTimeout(() => {

      setCompanySaved(false);

    }, 3000);

  }, 1500);

};

const handleResetCompany = () => {

  setCompany(initialCompany);

};

const handleSaveAI = () => {

  setSavingAI(true);

  setAiSaved(false);

  setTimeout(() => {

    setSavingAI(false);

    setAiSaved(true);

    setTimeout(() => {

      setAiSaved(false);

    }, 3000);

  }, 1500);

};

const handleTestAIConnection = () => {

  if (

    !aiConfiguration.provider ||

    !aiConfiguration.model ||

    !aiConfiguration.endpoint ||

    !aiConfiguration.apiKey.trim()

  ) {

    setAiConnected(false);

    return;

  }

  setTestingAI(true);

  setAiConnected(false);

  setTimeout(() => {

    setTestingAI(false);

    setAiConnected(true);

  }, 1500);

};
const handleResetAI = () => {

  setAiConfiguration(initialAIConfiguration);

};

const handleSaveNotifications = () => {

  setSavingNotifications(true);

  setNotificationsSaved(false);

  setTimeout(() => {

    setSavingNotifications(false);

    setNotificationsSaved(true);

    setTimeout(() => {

      setNotificationsSaved(false);

    }, 3000);

  }, 1500);

};

const handleResetNotifications = () => {

  setNotifications(initialNotifications);

};

const handleSaveAppearance = () => {

  setSavingAppearance(true);

  setAppearanceSaved(false);

  if (appearance.theme === "dark") {

    document.documentElement.classList.add("dark");

  } else {

    document.documentElement.classList.remove("dark");

  }

  localStorage.setItem(

    "theme",

    appearance.theme

  );

  localStorage.setItem(

    "language",

    appearance.language

  );

  setLang(appearance.language as Language);

  setTimeout(() => {

    setSavingAppearance(false);

    setAppearanceSaved(true);

    setTimeout(() => {

      setAppearanceSaved(false);

    }, 3000);

  }, 1500);

};

const handleResetAppearance = () => {

  setAppearance(initialAppearance);

  setLang(initialAppearance.language as Language);

};

const handleSaveSecurity = () => {

  if (

  security.newPassword !==
  security.confirmPassword

) {

  setSecurityError(
    t.PasswordsDoNotMatch
  );

  return;

}

setSecurityError("");

  setSavingSecurity(true);

  setSecuritySaved(false);

  setTimeout(() => {

    setSavingSecurity(false);

    setSecuritySaved(true);

    setSecurity({

      currentPassword: "",

      newPassword: "",

      confirmPassword: "",

    });

    setTimeout(() => {

      setSecuritySaved(false);

    }, 3000);

  }, 1500);

};

const handleResetSecurity = () => {

  setSecurity(initialSecurity);

};

const handleToggleIntegration = (name: string) => {

  const integration = integrations.find(
    (item) => item.name === name
  );

  if (!integration) return;

  setLoadingIntegration(name);

  setTimeout(() => {

    if (!integration.connected) {

      setIntegrations((current) =>
        current.map((item) =>
          item.name === name
            ? {
                ...item,
                connected: true,
              }
            : item
        )
      );

    }

    setLoadingIntegration(null);

setIntegrationUpdated(name);

setTimeout(() => {

  setIntegrationUpdated(null);

}, 3000);

}, 1500);

};
  return (
    <div className="grid grid-cols-12 gap-6 animate-in fade-in duration-500">

      {/* Sidebar */}

      <Card className="col-span-3 border-border/50 bg-card/50 backdrop-blur">

        <CardContent className="p-4">

          <h2 className="text-xl font-bold mb-6">
            ⚙️ {t.Settings}
          </h2>

          <div className="space-y-2">

            {tabs.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 rounded-lg p-3 transition-colors ${
                  tab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}

          </div>

        </CardContent>

      </Card>

      {/* Right Panel */}

      <Card className="col-span-9 border-border/50 bg-card/50 backdrop-blur">

        <CardContent className="p-8">

          {tab === "profile" && (
  <>
    <h2 className="text-2xl font-bold mb-2">
      {t.Profile}
    </h2>

    <p className="text-muted-foreground mb-8">
      {t.ManageProfileInformation}
    </p>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

      {/* Left Card */}

      <div className="rounded-xl border border-border bg-card p-6 flex flex-col items-center">

        <div className="w-32 h-32 overflow-hidden rounded-full border-2 border-primary/20 bg-primary/10 flex items-center justify-center">

  {profilePhoto ? (

    <img
      src={profilePhoto}
      alt="Profile"
      className="h-full w-full object-cover"
    />

  ) : (

    <span className="text-5xl font-bold text-primary">

      JD

    </span>

  )}

</div>

<h3 className="mt-5 text-xl font-semibold">

  John Doe

</h3>

<p className="text-muted-foreground">

  Operations Manager

</p>

<input
  id="profile-photo-upload"
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(e) => {

    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      setProfilePhoto(reader.result as string);

    };

    reader.readAsDataURL(file);

  }}
/>

<label
  htmlFor="profile-photo-upload"
  className="mt-6 w-full cursor-pointer rounded-lg bg-primary px-5 py-2 text-center text-primary-foreground hover:opacity-90 transition"
>

  {t.UploadPhoto}

</label>

      </div>

      {/* Right Card */}

      <div className="xl:col-span-2 rounded-xl border border-border bg-card p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.FullName}
            </label>

            <input
            className="w-full rounded-lg border border-border bg-background p-3"
            value={profile.fullName}
            onChange={(e) =>
              setProfile({
                ...profile,
                fullName: e.target.value,
              })
            }
          />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.Email}
            </label>

            <input
              className="w-full rounded-lg border border-border bg-background p-3"
              value={profile.email}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.Department}
            </label>

            <input
              className="w-full rounded-lg border border-border bg-background p-3"
              value={profile.department}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  department: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.JobTitle}
            </label>

            <input
              className="w-full rounded-lg border border-border bg-background p-3"
              value={profile.jobTitle}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  jobTitle: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.PhoneNumber}
            </label>

            <input
              className="w-full rounded-lg border border-border bg-background p-3"
              value={profile.phone}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  phone: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.TimeZone}
            </label>

            <input
              className="w-full rounded-lg border border-border bg-background p-3"
              value={profile.timeZone}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  timeZone: e.target.value,
                })
              }
            />
          </div>

        </div>

        <div className="flex items-center justify-between mt-8">

  {profileSaved && (

    <span className="text-sm font-medium text-emerald-500">

      ✓ {t.ProfileUpdated}

    </span>

  )}

  <div className="flex gap-4">

    <button
        onClick={handleResetProfile}
        className="rounded-lg border border-border px-5 py-2 hover:bg-muted transition"
      >

        {t.Cancel}

      </button>
    <button
      onClick={handleSaveProfile}
      disabled={savingProfile}
      className="rounded-lg bg-primary px-6 py-2 text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
    >

      {savingProfile
        ? t.Saving
        : t.SaveChanges}

    </button>

  </div>

</div>

      </div>

    </div>
  </>
)}

          {tab === "company" && (
  <>
    <h2 className="text-2xl font-bold mb-2">
      {t.Company}
    </h2>

    <p className="text-muted-foreground mb-8">
      {t.ConfigureCompanyInformation}
    </p>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

      {/* Company Logo */}

      <div className="w-32 h-32 overflow-hidden rounded-2xl border-2 border-primary/20 bg-primary/10 flex items-center justify-center">

  {companyLogo ? (

    <img
      src={companyLogo}
      alt="Company Logo"
      className="h-full w-full object-cover"
    />

  ) : (

    <Building2 className="w-16 h-16 text-primary" />

  )}

</div>

<h3 className="mt-5 text-xl font-semibold">

  Nexus AI

</h3>

<p className="text-muted-foreground">

  Enterprise Platform

</p>

<input
  id="company-logo-upload"
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(e) => {

    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      setCompanyLogo(reader.result as string);

    };

    reader.readAsDataURL(file);

  }}
/>

<label
  htmlFor="company-logo-upload"
  className="mt-6 w-full cursor-pointer rounded-lg bg-primary px-5 py-2 text-center text-primary-foreground hover:opacity-90 transition"
>

  {t.UploadLogo}

</label>

      </div>

      {/* Company Information */}

      <div className="xl:col-span-2 rounded-xl border border-border bg-card p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.CompanyName}
            </label>

            <input
              className="w-full rounded-lg border border-border bg-background p-3"
              value={company.companyName}
              onChange={(e) =>
                setCompany({
                  ...company,
                  companyName: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.Website}
            </label>

            <input
                className="w-full rounded-lg border border-border bg-background p-3"
                value={company.website}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    website: e.target.value,
                  })
                }
              />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.Country}
            </label>

            <input
                className="w-full rounded-lg border border-border bg-background p-3"
                value={company.country}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    country: e.target.value,
                  })
                }
              />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.TimeZone}
            </label>

            <input
                className="w-full rounded-lg border border-border bg-background p-3"
                value={company.timeZone}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    timeZone: e.target.value,
                  })
                }
              />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.Currency}
            </label>

            <input
                className="w-full rounded-lg border border-border bg-background p-3"
                value={company.currency}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    currency: e.target.value,
                  })
                }
              />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.SupportEmail}
            </label>

            <input
              className="w-full rounded-lg border border-border bg-background p-3"
              value={company.supportEmail}
              onChange={(e) =>
                setCompany({
                  ...company,
                  supportEmail: e.target.value,
                })
              }
            />
          </div>

        </div>

        <div className="flex items-center justify-between mt-8">

  {companySaved && (

    <span className="text-sm font-medium text-emerald-500">

      ✓ {t.CompanyUpdated}

    </span>

  )}

  <div className="flex gap-4">

    <button
  onClick={handleResetCompany}
  className="rounded-lg border border-border px-5 py-2 hover:bg-muted transition"
>
  {t.Cancel}
</button>

    <button
      onClick={handleSaveCompany}
      disabled={savingCompany}
      className="rounded-lg bg-primary px-6 py-2 text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
    >

      {savingCompany
        ? t.Saving
        : t.Save}

    </button>

  </div>

</div>

</div>
  </>
)}
          {tab === "ai" && (
  <>
    <h2 className="text-2xl font-bold mb-2">
      {t.AIConfiguration}
    </h2>

    <p className="text-muted-foreground mb-8">
      {t.ConfigureAIProvider}
    </p>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

      {/* AI Status */}

      <div className="rounded-xl border border-border bg-card p-6 flex flex-col items-center">

        <div className="w-32 h-32 rounded-2xl bg-primary/10 border-2 border-primary/20 flex flex-col items-center justify-center">

          <Bot className="w-10 h-10 text-primary mb-3" />

          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">

            {aiConfiguration.provider}

          </span>

        </div>

        <h3 className="mt-5 text-xl font-semibold">

          {aiConfiguration.model}

        </h3>

        <p className="text-sm text-muted-foreground mt-1">

          {aiConfiguration.provider}

        </p>

        <p
      className={
        testingAI
          ? "text-amber-500"
          : aiConnected
          ? "text-emerald-500"
          : "text-red-500"
      }
    >

      ● {testingAI
          ? t.TestingConnection
          : aiConnected
          ? t.AIConnectionSuccessful
          : t.NotConnected}

    </p>

    <div className="mt-6 w-full space-y-3 border-t border-border pt-5">

      <div className="flex justify-between text-sm">

        <span className="text-muted-foreground">

          {t.AIProvider}

        </span>

        <span className="font-medium">

          {aiConfiguration.provider}

        </span>

      </div>

      <div className="flex justify-between text-sm">

        <span className="text-muted-foreground">

          {t.Model}

        </span>

        <span className="font-medium">

          {aiConfiguration.model}

        </span>

      </div>

      <div className="flex justify-between text-sm">

        <span className="text-muted-foreground">

          {t.Temperature}

        </span>

        <span className="font-medium">

          {aiConfiguration.temperature}

        </span>

      </div>

      <div className="flex justify-between text-sm">

        <span className="text-muted-foreground">

          {t.MaxTokens}

        </span>

        <span className="font-medium">

          {aiConfiguration.maxTokens}

        </span>

      </div>

    </div>

          </div>

      {/* Configuration */}

      <div className="xl:col-span-2 rounded-xl border border-border bg-card p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
          <label className="block text-sm font-medium mb-2">
            {t.AIProvider}
          </label>

          <select
        className="w-full rounded-lg border border-border bg-background p-3"
        value={aiConfiguration.provider}
        onChange={(e) => {

          const provider = e.target.value;

          const defaultModels: Record<string, string> = {

  "OpenAI": "gpt-5.5",

  "Azure OpenAI": "gpt-5",

  "Anthropic Claude": "Claude Sonnet 4",

  "Google Gemini": "Gemini 2.5 Pro",

  "Mistral AI": "Mistral Large",

  "Ollama": "llama3.3",

};

    const defaultEndpoints: Record<string, string> = {

      "OpenAI": "https://api.openai.com/v1",

      "Azure OpenAI":
        "https://YOUR-RESOURCE.openai.azure.com",

      "Anthropic Claude":
        "https://api.anthropic.com",

      "Google Gemini":
        "https://generativelanguage.googleapis.com",

      "Mistral AI":
        "https://api.mistral.ai",

      "Ollama":
        "http://localhost:11434",

    };

    setAiConfiguration({

      ...aiConfiguration,

      provider,

      model: defaultModels[provider],

      endpoint: defaultEndpoints[provider],

    });

        }}
      >
        <option value="OpenAI">OpenAI</option>
        <option value="Azure OpenAI">Azure OpenAI</option>
        <option value="Anthropic Claude">Anthropic Claude</option>
        <option value="Google Gemini">Google Gemini</option>
        <option value="Mistral AI">Mistral AI</option>
        <option value="Ollama">Ollama (Local)</option>
    </select>
        </div>

          <div>
          <label className="block text-sm font-medium mb-2">
            {t.Model}
          </label>

          <select
            className="w-full rounded-lg border border-border bg-background p-3"
            value={aiConfiguration.model}
            onChange={(e) =>
              setAiConfiguration({
                ...aiConfiguration,
                model: e.target.value,
              })
            }
          >

            {aiConfiguration.provider === "OpenAI" && (
              <>
                <option value="gpt-5.5">GPT-5.5</option>
                <option value="gpt-5">GPT-5</option>
                <option value="gpt-4.1">GPT-4.1</option>
                <option value="gpt-4o">GPT-4o</option>
              </>
            )}

            {aiConfiguration.provider === "Azure OpenAI" && (
              <>
                <option value="gpt-5">GPT-5</option>
                <option value="gpt-4.1">GPT-4.1</option>
                <option value="gpt-4o">GPT-4o</option>
              </>
            )}

            {aiConfiguration.provider === "Anthropic Claude" && (
              <>
                <option value="Claude Sonnet 4">
                  Claude Sonnet 4
                </option>
                <option value="Claude Opus 4">
                  Claude Opus 4
                </option>
              </>
            )}

            {aiConfiguration.provider === "Google Gemini" && (
              <>
                <option value="Gemini 2.5 Pro">
                  Gemini 2.5 Pro
                </option>
                <option value="Gemini 2.5 Flash">
                  Gemini 2.5 Flash
                </option>
              </>
            )}

            {aiConfiguration.provider === "Mistral AI" && (
              <>
                <option value="Mistral Large">
                  Mistral Large
                </option>
                <option value="Mistral Medium">
                  Mistral Medium
                </option>
              </>
            )}

            {aiConfiguration.provider === "Ollama" && (
              <>
                <option value="llama3.3">
                  Llama 3.3
                </option>
                <option value="qwen3">
                  Qwen 3
                </option>
                <option value="deepseek-r1">
                  DeepSeek R1
                </option>
              </>
            )}

          </select>
        </div>

          <div>
          <div className="mb-2 flex items-center justify-between">

            <label className="block text-sm font-medium">
              {t.Temperature}
            </label>

            <span className="text-sm text-muted-foreground">
              {aiConfiguration.temperature}
            </span>

          </div>

          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            className="w-full accent-primary"
            value={aiConfiguration.temperature}
            onChange={(e) =>
              setAiConfiguration({
                ...aiConfiguration,
                temperature: e.target.value,
              })
            }
          />

        </div>

          <div>
          <label className="block text-sm font-medium mb-2">
            {t.MaxTokens}
          </label>

          <input
            type="number"
            min="1"
            max="32768"
            step="1"
            className="w-full rounded-lg border border-border bg-background p-3"
            value={aiConfiguration.maxTokens}
            onChange={(e) =>
              setAiConfiguration({
                ...aiConfiguration,
                maxTokens: e.target.value,
              })
            }
          />
        </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.APIEndpoint}
            </label>

            <input
                className="w-full rounded-lg border border-border bg-background p-3 font-mono text-sm"
                value={aiConfiguration.endpoint}
                onChange={(e) =>
                  setAiConfiguration({
                    ...aiConfiguration,
                    endpoint: e.target.value,
                  })
                }
              />
          </div>

          <div>
      <label className="block text-sm font-medium mb-2">
        {t.APIKey}
      </label>

      <div className="flex gap-2">

        <input
          type={showApiKey ? "text" : "password"}
          className="flex-1 rounded-lg border border-border bg-background p-3"
          value={aiConfiguration.apiKey}
          onChange={(e) =>
            setAiConfiguration({
              ...aiConfiguration,
              apiKey: e.target.value,
            })
          }
        />

        <button
          type="button"
          onClick={() => setShowApiKey(!showApiKey)}
          className="rounded-lg border border-border px-4 hover:bg-muted transition"
        >
          {showApiKey ? t.Hide : t.Show}
        </button>

      </div>
    </div>

        </div>

        <div className="flex items-center justify-between mt-8">

  {aiSaved && (

    <span className="text-sm font-medium text-emerald-500">

      ✓ {t.AIConfigurationUpdated}

    </span>

  )}

  <div className="flex gap-4">

  <button
    onClick={handleResetAI}
    className="rounded-lg border border-border px-5 py-2 hover:bg-muted transition"
  >
    {t.Cancel}
  </button>

  <button
    onClick={handleTestAIConnection}
    disabled={testingAI}
    className="rounded-lg border border-border px-5 py-2 hover:bg-muted transition disabled:opacity-50"
  >

    {testingAI
      ? t.TestingConnection
      : t.TestConnection}

  </button>

  <button
    onClick={handleSaveAI}
    disabled={savingAI}
    className="rounded-lg bg-primary px-6 py-2 text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
  >

    {savingAI
      ? t.Saving
      : t.Save}

  </button>

</div>

</div>

      </div>

    </div>

  </>
)}

          {tab === "notifications" && (
  <>
        <h2 className="text-2xl font-bold mb-2">
          {t.NotificationsSettings}
        </h2>

        <p className="text-muted-foreground mb-8">
          {t.ManageNotifications}
        </p>

        <div className="space-y-5">

          {[
      {
        key: "email",
        label: t.EmailNotifications,
      },
      {
        key: "push",
        label: t.PushNotifications,
      },
      {
        key: "sms",
        label: t.SMSNotifications,
      },
      {
        key: "approvals",
        label: t.ApprovalRequests,
      },
      {
        key: "workflow",
        label: t.WorkflowUpdates,
      },
      {
        key: "security",
        label: t.SecurityAlerts,
      },
    ].map((item) => (
      <div
        key={item.key}
        className="flex items-center justify-between rounded-xl border border-border bg-card p-5"
      >
        <div>

          <h3 className="font-medium">

            {item.label}

          </h3>

          <p className="text-sm text-muted-foreground">

            {t.EnableDisableNotifications}

          </p>

        </div>

        <input
          type="checkbox"
          checked={
            notifications[
              item.key as keyof typeof notifications
            ]
          }
          onChange={(e) =>
            setNotifications({
              ...notifications,
              [item.key]: e.target.checked,
            })
          }
          className="h-5 w-5 accent-primary"
        />

      </div>
    ))}

    </div>

    <div className="flex items-center justify-between mt-8">

  {notificationsSaved && (

    <span className="text-sm font-medium text-emerald-500">

      ✓ {t.NotificationPreferencesUpdated}

    </span>

  )}

  <div className="flex gap-4">

    <button
      onClick={handleResetNotifications}
      className="rounded-lg border border-border px-5 py-2 hover:bg-muted transition"
    >

      {t.Cancel}

    </button>

    <button
      onClick={handleSaveNotifications}
      disabled={savingNotifications}
      className="rounded-lg bg-primary px-6 py-2 text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
    >

      {savingNotifications
        ? t.Saving
        : t.Save}

    </button>

  </div>

</div>

  </>
)}

          {tab === "appearance" && (
  <>
    <h2 className="text-2xl font-bold mb-2">
      {t.AppearanceLanguage}
    </h2>

    <p className="text-muted-foreground mb-8">
      {t.ConfigureAppearance}
    </p>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Theme */}

      <div className="rounded-xl border border-border bg-card p-6">

        <h3 className="font-semibold text-lg mb-5">
          {t.Theme}
        </h3>

        <div className="space-y-4">

          <label className="flex items-center justify-between rounded-lg border border-border p-4 cursor-pointer hover:border-primary transition">

  <span>{t.Dark}</span>

  <input
    type="radio"
    name="theme"
    checked={appearance.theme === "dark"}
    onChange={() =>
      setAppearance({
        ...appearance,
        theme: "dark",
      })
    }
  />

</label>

<label className="flex items-center justify-between rounded-lg border border-border p-4 cursor-pointer hover:border-primary transition">

  <span>{t.Light}</span>

  <input
    type="radio"
    name="theme"
    checked={appearance.theme === "light"}
    onChange={() =>
      setAppearance({
        ...appearance,
        theme: "light",
      })
    }
  />

</label>

        </div>

      </div>

      {/* Language */}

      <div className="rounded-xl border border-border bg-card p-6">

        <h3 className="font-semibold text-lg mb-5">
          {t.Language}
        </h3>

        <select
          className="w-full rounded-lg border border-border bg-background p-3"
          value={lang}
          onChange={(e) => setLang(e.target.value as Language)}
        >
          <option value="EN">English</option>
          <option value="AR">العربية</option>
          <option value="ES">Español</option>
          <option value="NL">Nederlands</option>
          <option value="FR">Français</option>
        </select>

      </div>

    </div>

    <div className="flex items-center justify-between mt-8">

  {appearanceSaved && (

    <span className="text-sm font-medium text-emerald-500">

      ✓ {t.AppearanceUpdated}

    </span>

  )}

  <div className="flex gap-4">

    <button
      onClick={handleResetAppearance}
      className="rounded-lg border border-border px-5 py-2 hover:bg-muted transition"
    >

      {t.Cancel}

    </button>

    <button
      onClick={handleSaveAppearance}
      disabled={savingAppearance}
      className="rounded-lg bg-primary px-6 py-2 text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
    >

      {savingAppearance
        ? t.Saving
        : t.Save}

    </button>

  </div>

</div>

  </>
)}

          {tab === "security" && (
  <>
    <h2 className="text-2xl font-bold mb-2">
      {t.SecuritySettings}
    </h2>

    <p className="text-muted-foreground mb-8">
      {t.ManageSecurity}
    </p>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

      {/* Left Card */}

      <div className="rounded-xl border border-border bg-card p-6">

        <h3 className="font-semibold text-lg mb-5">
          {t.SecurityStatus}
        </h3>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span>{t.TwoFactorAuthentication}</span>
            <span className="text-emerald-500">{t.Enabled}</span>
          </div>

          <div className="flex justify-between">
            <span>{t.LastPasswordChange}</span>
            <span>12 Days</span>
          </div>

          <div className="flex justify-between">
            <span>{t.ActiveSessions}</span>
            <span>2</span>
          </div>

        </div>

      </div>

      {/* Right Card */}

      <div className="xl:col-span-2 rounded-xl border border-border bg-card p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
  <label className="block text-sm font-medium mb-2">
    {t.CurrentPassword}
  </label>

  <input
    type="password"
    className="w-full rounded-lg border border-border bg-background p-3"
    value={security.currentPassword}
    onChange={(e) =>
      setSecurity({
        ...security,
        currentPassword: e.target.value,
      })
    }
  />
</div>

<div>
  <label className="block text-sm font-medium mb-2">
    {t.NewPassword}
  </label>

  <input
    type="password"
    className="w-full rounded-lg border border-border bg-background p-3"
    value={security.newPassword}
    onChange={(e) =>
      setSecurity({
        ...security,
        newPassword: e.target.value,
      })
    }
  />
</div>

<div className="md:col-span-2">

  <label className="block text-sm font-medium mb-2">
    {t.ConfirmPassword}
  </label>

  <input
    type="password"
    className="w-full rounded-lg border border-border bg-background p-3"
    value={security.confirmPassword}
    onChange={(e) =>
      setSecurity({
        ...security,
        confirmPassword: e.target.value,
      })
    }
  />
          </div>

        </div>

        <div className="flex items-center justify-between mt-8">

  {securitySaved && (

    <span className="text-sm font-medium text-emerald-500">

      ✓ {t.PasswordUpdated}

    </span>

  )}

  <div className="flex gap-4">

    <button
      onClick={handleResetSecurity}
      className="rounded-lg border border-border px-5 py-2 hover:bg-muted transition"
    >

      {t.Cancel}

    </button>

    <button
      onClick={handleSaveSecurity}
      disabled={savingSecurity}
      className="rounded-lg bg-primary px-6 py-2 text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
    >

      {savingSecurity
        ? t.Saving
        : t.UpdatePassword}

    </button>

  </div>

</div>

      </div>

    </div>

  </>
)}

          {tab === "integrations" && (
  <>
    <h2 className="text-2xl font-bold mb-2">
      {t.Integrations}
    </h2>

    <p className="text-muted-foreground mb-8">
      {t.ConnectEnterpriseSystems}
    </p>
<div className="space-y-6">

  {integrationUpdated && (

    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-500">

      ✓ {integrationUpdated} {t.ConnectionUpdated}

    </div>

  )}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    {integrations.map((integration) => (

      <div
        key={integration.name}
        className="rounded-xl border border-border bg-card p-6 hover:border-primary transition"
      >

        <div className="flex justify-between items-center">

          <div>

            <h3 className="text-lg font-semibold">
              {integration.name}
            </h3>

            <p
              className={`text-sm mt-2 ${
                integration.connected
                  ? "text-emerald-500"
                  : "text-muted-foreground"
              }`}
            >
              {integration.connected
                ? t.Connected
                : t.NotConnected}
            </p>

          </div>

          <button
            onClick={() =>
              handleToggleIntegration(integration.name)
            }
            disabled={
              loadingIntegration === integration.name
            }
            className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
          >

            {loadingIntegration === integration.name
              ? integration.connected
                ? t.Manage
                : t.Saving
              : integration.connected
              ? t.Manage
              : t.Connect}

          </button>

        </div>

      </div>

    ))}

  </div>

</div>

  </>

)}


        </CardContent>

      </Card>

    </div>
  );
}