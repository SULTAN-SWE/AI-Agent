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

const { t, lang, setLang } = useLanguage();
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

        <div className="w-32 h-32 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
          <Bot className="w-16 h-16 text-primary" />
        </div>

        <h3 className="mt-5 text-xl font-semibold">
          OpenAI
        </h3>

        <p className="text-emerald-500">
          ● {t.Connected}
        </p>

      </div>

      {/* Configuration */}

      <div className="xl:col-span-2 rounded-xl border border-border bg-card p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.AIProvider}
            </label>

            <input
              className="w-full rounded-lg border border-border bg-background p-3"
              placeholder={t.AIProvider}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.Model}
            </label>

            <input
              className="w-full rounded-lg border border-border bg-background p-3"
              placeholder={t.Model}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.Temperature}
            </label>

            <input
              className="w-full rounded-lg border border-border bg-background p-3"
              placeholder={t.Temperature}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.MaxTokens}
            </label>

            <input
              className="w-full rounded-lg border border-border bg-background p-3"
              placeholder={t.MaxTokens}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.APIEndpoint}
            </label>

            <input
              className="w-full rounded-lg border border-border bg-background p-3"
              placeholder={t.APIEndpoint}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.APIKey}
            </label>

            <input
              type="password"
              className="w-full rounded-lg border border-border bg-background p-3"
              placeholder={t.APIKey}
            />
          </div>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button className="rounded-lg border border-border px-5 py-2 hover:bg-muted transition">
            {t.TestConnection}
          </button>

          <button className="rounded-lg bg-primary px-6 py-2 text-primary-foreground hover:opacity-90 transition">
            {t.Save}
          </button>

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
        t.EmailNotifications,
        t.PushNotifications,
        t.SMSNotifications,
        t.ApprovalRequests,
        t.WorkflowUpdates,
        t.SecurityAlerts,
      ].map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-xl border border-border bg-card p-5"
        >
          <div>
            <h3 className="font-medium">
              {item}
            </h3>

            <p className="text-sm text-muted-foreground">
              {t.EnableDisableNotifications}
            </p>
          </div>

          <input
            type="checkbox"
            defaultChecked={index !== 2}
            className="h-5 w-5 accent-primary"
          />
        </div>
      ))}

    </div>

    <div className="flex justify-end mt-8">

      <button className="rounded-lg bg-primary px-6 py-2 text-primary-foreground hover:opacity-90">
        {t.Save}
      </button>

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

            <input type="radio" name="theme" defaultChecked />

          </label>

          <label className="flex items-center justify-between rounded-lg border border-border p-4 cursor-pointer hover:border-primary transition">

            <span>{t.Light}</span>

            <input type="radio" name="theme" />

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

    <div className="flex justify-end mt-8">

      <button className="rounded-lg bg-primary px-6 py-2 text-primary-foreground">

        {t.Save}

      </button>

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
              placeholder={t.CurrentPassword}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t.NewPassword}
            </label>

            <input
              type="password"
              className="w-full rounded-lg border border-border bg-background p-3"
              placeholder={t.NewPassword}
            />
          </div>

          <div className="md:col-span-2">

            <label className="block text-sm font-medium mb-2">
              {t.ConfirmPassword}
            </label>

            <input
              type="password"
              className="w-full rounded-lg border border-border bg-background p-3"
              placeholder={t.ConfirmPassword}
            />

          </div>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button className="rounded-lg border border-border px-5 py-2">
            {t.Cancel}
          </button>

          <button className="rounded-lg bg-primary px-6 py-2 text-primary-foreground">
            {t.UpdatePassword}
          </button>

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

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      {[
        { name: "OpenAI", status: t.Connected },
        { name: "Microsoft 365", status: t.Connected },
        { name: "Google Workspace", status: t.Connected },
        { name: "Slack", status: t.NotConnected },
        { name: "GitHub", status: t.Connected },
        { name: "Jira", status: t.NotConnected },
        { name: "SAP", status: t.NotConnected },
        { name: "Oracle", status: t.NotConnected },
      ].map((integration) => (
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
                  integration.status === t.Connected
                    ? "text-emerald-500"
                    : "text-muted-foreground"
                }`}
              >
                {integration.status}
              </p>

            </div>

            <button className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">

              {integration.status === t.Connected
                ? t.Manage
                : t.Connect}

            </button>

          </div>

        </div>
      ))}

    </div>

  </>
)}

        </CardContent>

      </Card>

    </div>
  );
}