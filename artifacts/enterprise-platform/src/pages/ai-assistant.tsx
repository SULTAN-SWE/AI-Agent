import React, { useState } from "react";
import {
  Bot,
  Sparkles,
  Send,
  Plus,
  MessageSquare,
  FileText,
  Shield,
  Briefcase,
  Search,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/language-context";


export default function AIAssistant() {
  const [message, setMessage] = useState("");
  const { t } = useLanguage();

  const conversations = [
    "HR Questions",
    "Finance Report",
    "IT Support",
    "Procurement",
    "Executive Summary",
  ];

  const prompts = [
    "Request annual leave",
    "Reset my password",
    "Generate finance report",
    "Create procurement request",
    "Summarize company policy",
    "Create employee onboarding",
  ];

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)] animate-in fade-in duration-500">

      {/* Left Sidebar */}

      <Card className="col-span-3 border-border/50 bg-card/50 backdrop-blur">
        <CardContent className="p-5 flex flex-col h-full">

          <Button className="w-full mb-5 gap-2">
            <Plus className="w-4 h-4" />
            {t.NewChat}
          </Button>

          <h3 className="text-sm font-semibold mb-4">
            {t.ConversationHistory}
          </h3>

          <div className="space-y-2 flex-1">

            {conversations.map((item) => (
              <button
                key={item}
                className="w-full flex items-center gap-3 rounded-lg p-3 text-left hover:bg-muted transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-primary" />
                <span className="text-sm">{item}</span>
              </button>
            ))}

          </div>

        </CardContent>
      </Card>

      {/* Main Chat */}

      <Card className="col-span-9 border-border/50 bg-card/50 backdrop-blur flex flex-col">

        <CardContent className="p-6 flex flex-col h-full">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">

              <Bot className="w-6 h-6 text-primary" />

            </div>

            <div>

              <h2 className="font-bold text-xl">
                {t.AIAssistant}
              </h2>

              <p className="text-muted-foreground text-sm">
                {t.AIAssistantDescription}
              </p>

            </div>

          </div>

          {/* Welcome */}

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 mb-6">

            <div className="flex items-center gap-2 mb-3">

              <Sparkles className="w-5 h-5 text-primary" />

              <h3 className="font-semibold">
                {t.WhatCanIHelp}
              </h3>

            </div>

            <p className="text-muted-foreground">

                {t.AIAssistantWelcome}


            </p>

          </div>

          {/* Suggested Prompts */}

          <div>

            <h3 className="font-semibold mb-4">
              {t.SuggestedActions}
            </h3>

            <div className="grid grid-cols-2 gap-4">

              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setMessage(prompt)}
                  className="rounded-xl border border-border p-4 text-left hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <div className="flex items-center gap-3">

                    <Search className="w-4 h-4 text-primary" />

                    <span>{prompt}</span>

                  </div>

                </button>
              ))}

            </div>

          </div>

          <div className="flex-1" />

          {/* Chat Input */}

          <div className="mt-6 flex gap-3">

            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.AskAssistantPlaceholder}
            />

            <Button className="gap-2">

              <Send className="w-4 h-4" />

              {t.Send}

            </Button>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}